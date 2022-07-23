"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../database/models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userValidators = __importStar(require("../../validations/userValidation"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import isEmpty from "../../utils/isEmpty";
class UserController {
    constructor() {
        this.getAllUsers = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            const users = yield user_1.default.find();
            res.status(200).json({
                message: "All users",
                data: users,
            });
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, value } = userValidators.signUpValidation(req.body);
                if (error === null || error === void 0 ? void 0 : error.details[0].message) {
                    return res.status(422).send(error === null || error === void 0 ? void 0 : error.details[0].message);
                }
                const { password } = value;
                const hash = yield bcrypt_1.default.hash(password, 8);
                const user = yield user_1.default.create(Object.assign(Object.assign({}, value), { password: hash, account_number: value.phone }));
                res.status(200).json({
                    message: `User created successfully`,
                    data: user,
                });
            }
            catch (error) {
                if (error.code === 11000) {
                    res.status(409).send("User already exists");
                }
                else {
                    res.send(error.message);
                }
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, value } = userValidators.LoginValidation(req.body);
                if (error === null || error === void 0 ? void 0 : error.details[0].message) {
                    return res.status(422).send(error === null || error === void 0 ? void 0 : error.details[0].message);
                }
                const user = yield user_1.default.findOne({ email: value.email });
                if (!user) {
                    res.status(401).json({
                        message: "Invalid Credentials",
                    });
                }
                const verifyPassword = yield bcrypt_1.default.compare(value.password, user.password);
                if (!verifyPassword) {
                    res.status(401).json({
                        message: "Invalid Credentials",
                    });
                }
                const token = jsonwebtoken_1.default.sign({ email: value.email }, process.env.JWT_SECRET, {
                    expiresIn: process.env.EXPIRES_IN,
                });
                res.status(201).json({
                    message: "login successful",
                    data: { user, token },
                });
            }
            catch (error) {
                res.send(error);
            }
        });
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findById(req.params.id);
                if (!user)
                    return res.status(404).send("User not found");
                res.status(200).json({
                    message: "success",
                    data: user,
                });
            }
            catch (error) {
                res.send(error.message);
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.default.findByIdAndDelete(req.params.id);
                if (!user)
                    return res.status(404).send("User not found");
                res.status(200).send("Successfully deleted user");
            }
            catch (error) {
                res.send(error.message);
            }
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, value } = userValidators.updateValidation(req.body);
                const user = yield user_1.default.findByIdAndUpdate(req.params.id, value, { new: true });
                res.send(user);
            }
            catch (error) {
            }
        });
    }
}
exports.default = UserController;
