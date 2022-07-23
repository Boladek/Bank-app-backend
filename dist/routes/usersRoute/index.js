"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("./path"));
const users_1 = __importDefault(require("../../controllers/users"));
const isAuthenticated_1 = __importDefault(require("../../middlewares/isAuthenticated"));
exports.default = (router) => {
    const user = new users_1.default();
    router.post(path_1.default.SIGN_UP, user.createUser);
    router.post(path_1.default.LOGIN, user.login);
    router.get(path_1.default.GET_ALL_USERS, isAuthenticated_1.default, user.getAllUsers);
    router.get(path_1.default.GET_USER, isAuthenticated_1.default, user.getUser);
    router.put(path_1.default.UPDATE, isAuthenticated_1.default, user.updateUser);
    router.delete(path_1.default.DELETE, isAuthenticated_1.default, user.deleteUser);
};
