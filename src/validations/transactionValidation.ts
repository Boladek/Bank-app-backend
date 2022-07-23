import Joi from "joi";
import Transaction, {UniqueTransaction} from "../controllers/transactions/interface";
import { Request } from "express";

export const createTransactionValidator = (body: Transaction) => {
  const schema = Joi.object().keys({
    description: Joi.string().min(1).required(),
    type: Joi.string().required(),
    amount: Joi.number().required(),
    user_id: Joi.string().required(),
  });
  return schema.validate(body);
};

export const findUserTransactionsValiator = (body: UniqueTransaction) => {
  const schema = Joi.object().keys({
    user_id: Joi.string().required(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    limit: Joi.number(),
  });
  return schema.validate(body);
}

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
