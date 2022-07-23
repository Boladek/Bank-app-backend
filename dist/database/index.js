"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../utils/logger"));
const { NODE_ENV, TEST__MONGO_CONNECTION_STRING, MONGO_CONNECTION_STRING } = process.env;
const connect = () => mongoose_1.default
    .connect(NODE_ENV === "test"
    ? TEST__MONGO_CONNECTION_STRING
    : MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => logger_1.default.info("Connection established"))
    .catch((error) => logger_1.default.error("Connection" + error.message));
exports.connect = connect;
