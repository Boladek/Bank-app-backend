"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("./path"));
const transactions_1 = __importDefault(require("../../controllers/transactions"));
const isAuthenticated_1 = __importDefault(require("../../middlewares/isAuthenticated"));
exports.default = (router) => {
    const transaction = new transactions_1.default();
    router.get(path_1.default.FETCH_ALL_TRANSACTIONS, isAuthenticated_1.default, transaction.getAllTransactions);
    router.post(path_1.default.CREATE_TRANSACTION, isAuthenticated_1.default, transaction.createTransaction);
    router.get(path_1.default.FETCH_USER_TRANSACTIONS, isAuthenticated_1.default, transaction.findUserTransactions);
};
