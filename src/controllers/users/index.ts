import { Request, Response } from "express";
import UserModel from "../../database/models/user";
import bcrypt from "bcrypt";
import * as userValidators from "../../validations/userValidation";
import User from "./interface";
import jwt from "jsonwebtoken";
// import isEmpty from "../../utils/isEmpty";

class UserController {
  getAllUsers = async (_req: Request, res: Response) => {
    const users = await UserModel.find();
    res.status(200).json({
      message: "All users",
      data: users,
    });
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const { error, value } = userValidators.signUpValidation(req.body);
      if (error?.details[0].message) {
        return res.status(422).send(error?.details[0].message);
      }
      const { password } = value;
      const hash = await bcrypt.hash(password, 8);
      const user = await UserModel.create({
        ...value,
        password: hash,
        account_number: value.phone,
      });
      res.status(200).json({
        message: `User created successfully`,
        data: user,
      });
    } catch (error: any) {
      if (error.code === 11000) {
        res.status(409).send("User already exists");
      } else {
        res.send(error.message);
      }
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { error, value } = userValidators.LoginValidation(req.body);
      if (error?.details[0].message) {
        return res.status(422).send(error?.details[0].message);
      }
      const user: User = await UserModel.findOne({ email: value.email });
      if (!user) {
        res.status(401).json({
          message: "Invalid Credentials",
        });
      }
      const verifyPassword = await bcrypt.compare(
        value.password,
        user.password
      );
      if (!verifyPassword) {
        res.status(401).json({
          message: "Invalid Credentials",
        });
      }
      const token = jwt.sign({ email: value.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRES_IN,
      });
      res.status(201).json({
        message: "login successful",
        data: { user, token },
      });
    } catch (error) {
      res.send(error);
    }
  };

  getUser = async (req: Request, res: Response) => {
    try {
      const user: User = await UserModel.findById(req.params.id);
      if (!user) return res.status(404).send("User not found");
      res.status(200).json({
        message: "success",
        data: user,
      });
    } catch (error: any) {
      res.send(error.message);
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try{
      const user = await UserModel.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).send("User not found");
      res.status(200).send("Successfully deleted user");
    } catch (error: any) {
      res.send(error.message);
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try{
      const { error, value } = userValidators.updateValidation(req.body);
      const user = await UserModel.findByIdAndUpdate(req.params.id, value, {new: true})
      res.send(user);
    } catch (error) {

    }
  };
}

export default UserController;
