"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (password) => {
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    return re.test(password);
};
