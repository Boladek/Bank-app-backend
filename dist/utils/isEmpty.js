"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (obj) => {
    if (obj && Object.entries(obj).length === 0)
        return true;
    return false;
};
