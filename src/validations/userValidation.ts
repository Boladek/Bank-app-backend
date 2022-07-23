import Joi from "joi";
import User from "../controllers/users/interface";

export const signUpValidation = (body: User) => {
  const schema = Joi.object().keys({
    first_name: Joi.string().min(2).max(30).required(),
    last_name: Joi.string().min(2).max(30).required(),
    username: Joi.string().min(2).max(30),
    password: Joi.string().min(8).max(30).required(),
    email: Joi.string().email().min(9).max(30).required(),
    address: Joi.string().min(9).max(30).required(),
    phone: Joi.string().min(9).max(30).required(),
    age: Joi.number().required(),
  });
  return schema.validate(body);
};

export const LoginValidation = (body: User) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().min(9).max(30).required(),
    password: Joi.string().required(),
  });
  return schema.validate(body);
};

export const updateValidation = (body: User) => {
  const schema = Joi.object().keys({
    first_name: Joi.string().min(2).max(30),
    last_name: Joi.string().min(2).max(30),
    username: Joi.string().min(2).max(30),
    email: Joi.string().email().min(9).max(30),
    address: Joi.string().min(9).max(30),
    phone: Joi.string().min(9).max(30),
    age: Joi.number(),
  });
  return schema.validate(body);
};
