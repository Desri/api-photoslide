const { jwtDecode } = require('jwt-decode')
const Event = require('../models/eventModel');

exports.appearanceEvent = async (req, res) => {
	try {
		const { fileUrl, originalFilename, assetId, publicId, caption, language, colorPlate } = req.body;
		
		const updateAppearanceEvent = await Event.updateOne(
			{_id: req.body.eventId},
			{$set: {
				"appearance.fileUrl": fileUrl,
				"appearance.originalFilename": originalFilename,
				"appearance.assetId": assetId,
				"appearance.publicId": publicId,
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
		res.status(500).send({
			success: false,
			message: "An error occurred",
			error: error.message,
		});
	}
};

exports.createEvent = async (req, res) => {
	try {
		const { title, eventType, value, plan } = req.body;
		const token = req.headers.authorization?.split(' ')[1]
		const decoded = jwtDecode(token)
		const userId = decoded;
		const slug = title.replace(/\s+/g, '-').toLowerCase()
		
		const dataEvent = new Event({
			title: title,
			eventType: eventType,
			date: value,
			userId: userId.userId,
			plan: plan,
			slug: slug
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
		.find({userId: userId});
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
		const { fileUrl, originalFilename, assetId, publicId, durationImage, durationVideo, hideSlideshowQR, hideVideoSound } = req.body;

		const updateSlideshowEvent = await Event.updateOne(
			{_id: req.body.eventId},
			{$set: {
				"slideShow.fileUrl": fileUrl,
				"slideShow.originalFilename": originalFilename,
				"slideShow.assetId": assetId,
				"slideShow.publicId": publicId,
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
		const { fileUrl, originalFilename, assetId, publicId, title, eventDate } = req.body;
		const updateWelcomeScreen = await Event.updateOne(
			{_id: req.body.eventId},
			{$set: {
				"welcomeScreen.fileUrl": fileUrl,
				"welcomeScreen.originalFilename": originalFilename,
				"welcomeScreen.assetId": assetId,
				"welcomeScreen.publicId": publicId,
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
