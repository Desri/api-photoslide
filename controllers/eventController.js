const { jwtDecode } = require('jwt-decode')
const multer = require("multer");
const Event = require('../models/eventModel');

// Konfigurasi Multer
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, `${uniqueSuffix}-${file.originalname}`);
	},
});

const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype.startsWith("image/")) {
			cb(null, true);
	  	} else {
			cb(new Error("Only image files are allowed!"));
	  	}
	},
});

exports.appearanceEvent = upload.single("image"), async (req, res) => {
	try {
		const { file, language, caption, colorPlate } = req.body;
		// res.send({
		// 	success: true,
		// 	message: 'update appearance event successfully',
		// 	data: file
		// })
		const updateAppearanceEvent = await Event.updateOne(
			{_id: req.body.eventId},
			{$set: {
				"appearance.filename": file.filename,
				"appearance.path": file.path,
				"appearance.contentType": file.mimetype,
				"appearance.language": language,
				"appearance.caption": caption,
				"appearance.colorPlate": colorPlate
			}}
		);
		res.send({
			success: true,
			message: 'update appearance event successfully',
			data: updateAppearanceEvent
		})
	} catch (error) {
		console.log(error);
	}
};

exports.createEvent = async (req, res) => {
	try {
		const { title, eventType, value, plan, userId } = req.body;
		// const token = req.headers.authorization?.split(' ')[1]
		// const decoded = jwtDecode(token)
		// const userId = decoded;

		const dataEvent = new Event({
			title: title,
			eventType: eventType,
			date: value,
			userId: userId,
			plan: plan
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
		const result = await Event
		.find({userId: userId}).populate('plan', 'plan');
		res.send({
			success: true,
			message: 'get list event',
			data: result
		})
	} catch (error) {
		console.log(error);
	}
};

exports.detailEvent = async (req, res) => {
	try {
		const DetailEvent = await Event.findOne({ _id: req.params.slug });
		res.send({
			success: true,
			message: 'get detail event',
			data: DetailEvent
		})
	} catch (error) {
		console.log(error);
	}
};

exports.slideshowEvent = async (req, res) => {
	try {
		const { durationImage, durationVideo, hideSlideshowQR, hideVideoSound } = req.body;

		const updateSlideshowEvent = await Event.updateOne(
			{_id: req.body.eventId},
			{$set: {
			  "slideShow.durationImage": durationImage,
			  "slideShow.durationVideo": durationVideo,
			  "slideShow.hideSlideshowQR": hideSlideshowQR,
			  "slideShow.hideVideoSound": hideVideoSound
			}}
		);
		res.send({
			success: true,
			message: 'update slideshow event successfully',
			data: updateSlideshowEvent
		})
	} catch (error) {
		console.log(error);
	}
};

exports.moderationEvent = async (req, res) => {
	try {
		const { isManualApprove, isDisableGuestsDownload, isAllowedMedia, digitalAlbumPermissions } = req.body;
		const updateModerationEvent = await Event.updateOne(
			{_id: req.body.eventId},
			{$set: {
			  "moderation.isManualApprove": isManualApprove,
			  "moderation.isDisableGuestsDownload": isDisableGuestsDownload,
			  "moderation.isAllowedMedia": isAllowedMedia,
			  "moderation.digitalAlbumPermissions": digitalAlbumPermissions
			}}
		);
		res.send({
			success: true,
			message: 'update slideshow event successfully',
			data: updateModerationEvent
		})
	} catch (error) {
		console.log(error);
	}
};

exports.welcomeScreen = async (req, res) => {
	try {
		const { title, eventDate } = req.body;

		const updateWelcomeScreen = await Event.updateOne(
			{_id: req.body.eventId},
			{$set: {
			  "welcomeScreen.title": title,
			  "welcomeScreen.eventDate": eventDate
			}}
		);
		res.send({
			success: true,
			message: 'update welcome screen successfully',
			data: updateWelcomeScreen
		})
	} catch (error) {
		console.log(error);
	}
};

exports.generalEvent = async (req, res) => {
	try {
		const { title, eventType, date } = req.body;

		const updateGeneralEvent = await Event.updateOne(
			{_id: req.body.eventId},
			{$set: {
			  date: date,
			  title: title,
			  eventType: eventType
			}}
		);
		res.send({
			success: true,
			message: 'update event successfully',
			data: updateGeneralEvent
		})
	} catch (error) {
		console.log(error);
	}
};
