import { Schema, model } from 'mongoose';
import TransactionInterface from '../../controllers/transactions/interface';

const transactionSchema = new Schema<TransactionInterface>(
	{
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
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: { createdAt: 'created_at' } },
);

const Transaction = model('Transactions', transactionSchema);


export default Transaction;
