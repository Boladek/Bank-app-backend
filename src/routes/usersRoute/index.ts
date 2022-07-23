import paths from "./path";
import {Router} from "express";
import UserController from "../../controllers/users";
import isAuthenticated from "../../middlewares/isAuthenticated";

export default (router: Router) => {
  const user = new UserController();

  router.post(paths.SIGN_UP, user.createUser);
  router.post(paths.LOGIN, user.login);
  router.get(paths.GET_ALL_USERS, isAuthenticated, user.getAllUsers);
  router.get(paths.GET_USER, isAuthenticated, user.getUser);
  router.put(paths.UPDATE, isAuthenticated, user.updateUser);
  router.delete(paths.DELETE, isAuthenticated, user.deleteUser);
};
