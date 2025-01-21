const mongoose = require('mongoose');

const albumSchema = mongoose.Schema(
	{
		userId: {
			type: String,
			default: "",
		},
		eventId: {
			type: String,
			default: "",
		},
		fileUrl: {
			type: String,
			default: ""
		},
		originalFilename: {
			type: String,
			default: ""
		},
		assetId: {
			type: String,
			default: ""
		},
		publicId: {
			type: String,
			default: ""
		}
	}
);

module.exports = mongoose.model('Album', albumSchema);
