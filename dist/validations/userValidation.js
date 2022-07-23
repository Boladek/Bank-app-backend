"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValidation = exports.LoginValidation = exports.signUpValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const signUpValidation = (body) => {
    const schema = joi_1.default.object().keys({
        first_name: joi_1.default.string().min(2).max(30).required(),
        last_name: joi_1.default.string().min(2).max(30).required(),
        username: joi_1.default.string().min(2).max(30),
        password: joi_1.default.string().min(8).max(30).required(),
        email: joi_1.default.string().email().min(9).max(30).required(),
        address: joi_1.default.string().min(9).max(30).required(),
        phone: joi_1.default.string().min(9).max(30).required(),
        age: joi_1.default.number().required(),
    });
    return schema.validate(body);
};
exports.signUpValidation = signUpValidation;
const LoginValidation = (body) => {
    const schema = joi_1.default.object().keys({
        email: joi_1.default.string().email().min(9).max(30).required(),
        password: joi_1.default.string().required(),
    });
    return schema.validate(body);
};
exports.LoginValidation = LoginValidation;
const updateValidation = (body) => {
    const schema = joi_1.default.object().keys({
        first_name: joi_1.default.string().min(2).max(30),
        last_name: joi_1.default.string().min(2).max(30),
        username: joi_1.default.string().min(2).max(30),
        email: joi_1.default.string().email().min(9).max(30),
        address: joi_1.default.string().min(9).max(30),
        phone: joi_1.default.string().min(9).max(30),
        age: joi_1.default.number(),
    });
    return schema.validate(body);
};
exports.updateValidation = updateValidation;
