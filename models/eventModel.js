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
	}
);

module.exports = mongoose.model('Event', eventSchema);
