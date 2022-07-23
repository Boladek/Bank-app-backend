"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersRoute_1 = __importDefault(require("./usersRoute"));
const transactionRoute_1 = __importDefault(require("./transactionRoute"));
const router = (0, express_1.Router)();
(0, transactionRoute_1.default)(router);
(0, usersRoute_1.default)(router);
exports.default = router;
