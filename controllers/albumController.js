const { jwtDecode } = require('jwt-decode')
const Album = require('../models/albumModel');
const mongoose = require('mongoose');

exports.listAlbums = async (req, res) => {
	try {
		const dataAlbum = await Album.find({ eventId: req.params.slug });
		res.send({
			success: true,
			message: 'get list album',
			data: dataAlbum
		})
	} catch (error) {
		console.log(error);
	}
};

exports.createAlbums = async (req, res) => {
	try {
		const { fileUrl, originalFilename, assetId, publicId, eventId } = req.body;

		const token = req.headers.authorization?.split(' ')[1]
		const decoded = jwtDecode(token)
		const userId = decoded;

		const dataAlbum = new Album({
			eventId: eventId,
			fileUrl: fileUrl,
			userId: userId.userId,
			originalFilename: originalFilename,
			assetId: assetId,
			publicId: publicId
		});
		await dataAlbum.save()
		res.send({
			success: true,
			message: 'album created successfully',
			data: dataAlbum
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

exports.removeAlbums = async (req, res) => {
	try {
		const deleteAlbum = await Album.deleteOne({ _id: req.body._id});
		res.send({
			success: true,
			message: 'remove list album successfully',
			data: deleteAlbum
		})
	} catch (error) {
		console.log(error);
	}
};
