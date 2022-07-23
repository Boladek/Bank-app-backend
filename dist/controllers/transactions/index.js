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
const transaction_1 = __importDefault(require("../../database/models/transaction"));
const transactionValidators = __importStar(require("../../validations/transactionValidation"));
class TransactionController {
    constructor() {
        this.getAllTransactions = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            const users = yield transaction_1.default.find().sort("-created_at");
            res.status(200).json({
                message: "All Transactions",
                data: users,
            });
        });
        this.createTransaction = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, value } = transactionValidators.createTransactionValidator(req.body);
                if (error === null || error === void 0 ? void 0 : error.details[0].message) {
                    return res.status(422).send(error === null || error === void 0 ? void 0 : error.details[0].message);
                }
                const userTransaction = yield transaction_1.default.find({
                    user_id: value.user_id,
                }).sort("-created_at");
                let balance = 0;
                if (!userTransaction) {
                    if (value.type === "withdraw") {
                        return res.status(400).send("Insufficient funds");
                    }
                    balance = value.amount;
                }
                else {
                    if (value.type === "withdraw") {
                        if (userTransaction[0].balance < value.amount) {
                            return res.status(400).send("Insufficient funds");
                        }
                        balance = userTransaction[0].balance - value.amount;
                    }
                    else {
                        balance = userTransaction[0].balance + value.amount;
                    }
                }
                const transaction = yield transaction_1.default.create({
                    description: value.description,
                    type: value.type,
                    credit: value.type === "deposit" ? value.amount : 0,
                    debit: value.type === "withdraw" ? value.amount : 0,
                    balance: balance,
                    status: "success",
                    user_id: value.user_id,
                });
                res.send(transaction);
            }
            catch (err) {
                res.send(err);
            }
        });
        this.findUserTransactions = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.query.user_id;
                const startDate = req.query.startDate;
                const endDate = req.query.endDate;
                const limit = req.query.limit;
                const { error, value } = transactionValidators.findUserTransactionsValiator({
                    user_id,
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                    limit: Number(limit),
                });
                if (error === null || error === void 0 ? void 0 : error.details[0].message) {
                    return res.status(422).send(error === null || error === void 0 ? void 0 : error.details[0].message);
                }
                const userTransaction = yield transaction_1.default.find({
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
            }
            catch (err) { }
        });
    }
}
exports.default = TransactionController;
