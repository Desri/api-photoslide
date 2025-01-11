const mongoose = require('mongoose');

const eventSchema = mongoose.Schema(
	{
		userId: {
			type: String,
			default: "",
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
		planssss: {
			type: String,
			default: "Dery h",
		},
		plan: {
			type: mongoose.Types.ObjectId,
			ref: 'User'
		},
		
	}
);

module.exports = mongoose.model('Event', eventSchema);
