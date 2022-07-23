import { Request, Response, RequestHandler } from "express";
import TransactionModel from "../../database/models/transaction";
import * as transactionValidators from "../../validations/transactionValidation";
import Transaction, { UniqueTransaction } from "./interface";

class TransactionController {
  getAllTransactions = async (_req: Request, res: Response) => {
    const users = await TransactionModel.find().sort("-created_at");
    res.status(200).json({
      message: "All Transactions",
      data: users,
    });
  };

  createTransaction = async (req: Request, res: Response) => {
    try {
      const { error, value } = transactionValidators.createTransactionValidator(
        req.body
      );
      if (error?.details[0].message) {
        return res.status(422).send(error?.details[0].message);
      }
      const userTransaction: Transaction[] = await TransactionModel.find({
        user_id: value.user_id,
      }).sort("-created_at");
      let balance: number = 0;
      if (!userTransaction) {
        if (value.type === "withdraw") {
          return res.status(400).send("Insufficient funds");
        }
        balance = value.amount;
      } else {
        if (value.type === "withdraw") {
          if (userTransaction[0].balance < value.amount) {
            return res.status(400).send("Insufficient funds");
          }
          balance = userTransaction[0].balance - value.amount;
        } else {
          balance = userTransaction[0].balance + value.amount;
        }
      }
      const transaction = await TransactionModel.create({
        description: value.description,
        type: value.type,
        credit: value.type === "deposit" ? value.amount : 0,
        debit: value.type === "withdraw" ? value.amount : 0,
        balance: balance,
        status: "success",
        user_id: value.user_id,
      });
      res.send(transaction);
    } catch (err: any) {
      res.send(err);
    }
  };

  findUserTransactions = async (req: Request, res: Response) => {
    try {
      const user_id = req.query.user_id as string;
      const startDate = req.query.startDate as string;
      const endDate = req.query.endDate as string;
      const limit = req.query.limit as string;
      const { error, value } =
        transactionValidators.findUserTransactionsValiator({
          user_id,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          limit: Number(limit),
        });
      if (error?.details[0].message) {
        return res.status(422).send(error?.details[0].message);
      }
      const userTransaction: Transaction[] = await TransactionModel.find({
        user_id: value.user_id,
        created_at: {
          $gte: value.endDate,
          $lt: value.startDate,
        },
      }).sort("-created_at");
      res.status(200).json({
        message: "Transactions fetched successfully",
        data: userTransaction
      });
    } catch (err: any) {}
  };
}

export default TransactionController;
