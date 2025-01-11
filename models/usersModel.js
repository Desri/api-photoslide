const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		fullname: {
			type: String,
			required: [true, 'Fullname is required!'],
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			default: ""
		},
		password: {
			type: String,
			required: [true, 'Password must be provided!'],
			trim: true,
			select: false,
		},
		verified: {
			type: Boolean,
			default: false,
		},
		verificationCode: {
			type: String,
			select: false,
		},
		verificationCodeValidation: {
			type: Number,
			select: false,
		},
		forgotPasswordCode: {
			type: String,
			select: false,
		},
		forgotPasswordCodeValidation: {
			type: Number,
			select: false,
		},
		plan: {
			type: String,
			default: ""
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', userSchema);
