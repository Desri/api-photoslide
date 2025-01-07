const { jwtDecode } = require('jwt-decode')
const Event = require('../models/eventModel');

exports.createEvent = async (req, res) => {
	try {
		const { title, eventType, date } = req.body;
		const token = req.headers.authorization?.split(' ')[1]
		const decoded = jwtDecode(token)
		const userId = decoded;

		const dataEvent = new Event({
			title: title,
			eventType: eventType,
			date: date,
			userId: userId.userId
		});
		await dataEvent.save()
		res.status(201).json({ success: true, message: 'created', data: dataEvent });
	} catch (error) {
		console.log(error);
	}
};

exports.listEvent = async (req, res) => {
	try {
		const token = req.headers.authorization?.split(' ')[1]
		const decoded = jwtDecode(token)
		const userId = decoded.userId;
		const result = await Event.find({userId: `${userId}`});

		res.send({
			success: true,
			message: 'get list event',
			data: result
		})
	} catch (error) {
		console.log(error);
	}
};
