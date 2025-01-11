const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Types.ObjectId,
			ref: 'User'
		},
		title: {
			type: String,
		},
		date: {
			type: String,
		},
		eventType: {
			type: String,
		},
		// plan: {
		// 	type: mongoose.Types.ObjectId,
		// 	ref: 'User'
		// },
		// author: { 
		// 	type: mongoose.Types.ObjectId,
		// 	default: "6781d8907e5df2ef25400fed",
		// 	ref: 'User' 
		// }
	}
);

module.exports = mongoose.model('Event', eventSchema);
