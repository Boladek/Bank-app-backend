import {Router} from "express";
import paths from "./path";
import TransactionController from "../../controllers/transactions";
import isAuthenticated from "../../middlewares/isAuthenticated";

export default (router: Router) => {
  const transaction = new TransactionController();

  router.get(paths.FETCH_ALL_TRANSACTIONS, isAuthenticated, transaction.getAllTransactions);
  router.post(paths.CREATE_TRANSACTION, isAuthenticated, transaction.createTransaction);
  router.get(paths.FETCH_USER_TRANSACTIONS, isAuthenticated, transaction.findUserTransactions);
};
