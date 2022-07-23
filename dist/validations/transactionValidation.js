"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserTransactionsValiator = exports.createTransactionValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const createTransactionValidator = (body) => {
    const schema = joi_1.default.object().keys({
        description: joi_1.default.string().min(1).required(),
        type: joi_1.default.string().required(),
        amount: joi_1.default.number().required(),
        user_id: joi_1.default.string().required(),
    });
    return schema.validate(body);
};
exports.createTransactionValidator = createTransactionValidator;
const findUserTransactionsValiator = (body) => {
    const schema = joi_1.default.object().keys({
        user_id: joi_1.default.string().required(),
        startDate: joi_1.default.date(),
        endDate: joi_1.default.date(),
        limit: joi_1.default.number(),
    });
    return schema.validate(body);
};
exports.findUserTransactionsValiator = findUserTransactionsValiator;
// export const LoginValidation = (body: User) => {
//   const schema = Joi.object().keys({
//     email: Joi.string().email().min(9).max(30).required(),
//     password: Joi.string().required(),
//   });
//   return schema.validate(body);
// };
// export const updateValidation = (body: User) => {
//   const schema = Joi.object().keys({
//     first_name: Joi.string().min(2).max(30),
//     last_name: Joi.string().min(2).max(30),
//     username: Joi.string().min(2).max(30),
//     email: Joi.string().email().min(9).max(30),
//     address: Joi.string().min(9).max(30),
//     phone: Joi.string().min(9).max(30),
//     age: Joi.number(),
//   });
//   return schema.validate(body);
// };
