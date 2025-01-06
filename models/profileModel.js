const mongoose = require('mongoose');

const profileSchema = mongoose.Schema(
	{
		fullname: {
			type: String,
		},
		email: {
			type: String,
		},
		password: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Profile', profileSchema);
