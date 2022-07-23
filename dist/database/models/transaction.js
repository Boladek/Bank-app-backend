"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transactionSchema = new mongoose_1.Schema({
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['withdraw', 'deposit'],
        required: true,
    },
    credit: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    debit: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    balance: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'pending',
        required: true,
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: { createdAt: 'created_at' } });
const Transaction = (0, mongoose_1.model)('Transactions', transactionSchema);
exports.default = Transaction;
