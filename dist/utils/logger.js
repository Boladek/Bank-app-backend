"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const ip_1 = __importDefault(require("ip"));
const ipAddress = ip_1.default === null || ip_1.default === void 0 ? void 0 : ip_1.default.address();
const _logger = require('tracer').colorConsole({
    filters: {
        log: colors_1.default.black,
        trace: colors_1.default.magenta,
        debug: colors_1.default.blue,
        info: colors_1.default.blue,
        warn: colors_1.default.yellow,
        error: [colors_1.default.red, colors_1.default.bold],
    },
    format: [
        `{{timestamp}}@${ipAddress} <{{title}}> PID:[${process.pid}] {{message}}`,
        {
            error: `{{timestamp}}@${ipAddress} <{{title}}> PID:[${process.pid}] {{message}} Call Stack:\n{{stack}}`,
        },
    ],
    dateformat: 'HH:MM:ss.L',
    preprocess: function (data) {
        data.title = data.title.toUpperCase();
    },
});
exports.default = {
    error: (...data) => _logger.error(...data),
    info: (...data) => _logger.info(...data),
};
