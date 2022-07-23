import { Schema, model } from 'mongoose';
import UserInterface from "../../controllers/users/interface";

const userSchema = new Schema<UserInterface>(
	{
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
	},
	{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

const User = model<UserInterface>('Users', userSchema);


export default User;
