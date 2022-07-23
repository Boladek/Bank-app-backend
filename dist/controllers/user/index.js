"use strict";
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
class UserController {
    constructor() {
        this.getAllUsers = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            const users = yield user_1.default.find();
            res.status(200).json({
                message: "All users",
                data: users,
            });
        });
        this.createUser = (req, res) => {
            res.send(req.body);
            // const {} = req.body
            // const post: Post = req.body;
            // this.posts.push(post);
            // res.send(post);
        };
        this.login = (_req, _res) => {
            // const post: Post = req.body;
            // this.posts.push(post);
            // res.send(post);
        };
        this.getUser = (_req, _res) => {
            // const post: Post = req.body;
            // this.posts.push(post);
            // res.send(post);
        };
        this.deleteUser = (_req, _res) => {
            // const post: Post = req.body;
            // this.posts.push(post);
            // res.send(post);
        };
        this.updateUseer = (_req, _res) => {
            // const post: Post = req.body;
            // this.posts.push(post);
            // res.send(post);
        };
    }
}
exports.default = UserController;
