"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    account_number: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    age: {
        type: Number,
        required: true,
        min: 0,
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
const User = (0, mongoose_1.model)('Users', userSchema);
exports.default = User;
