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
			type: Object,
			default: ""
		},
		eventType: {
			type: String,
		},
		plan: {
			type: mongoose.Types.ObjectId,
			ref: 'User'
		},
		appearance: {
			filename: {
				type: String,
				required: true
			},
			path: {
				type: String,
				required: true
			},
			contentType: {
				type: String,
				required: true
			},
			uploadedAt: {
				type: Date,
				default: Date.now
			},
			eventLogo: {
				type: String,
				default: ""
			},
			language: {
				type: String,
				default: ""
			},
			caption: {
				type: String,
				default: ""
			},
			textPostBackground: {
				type: Boolean,
			},
			colorPlate: {
				type: String,
				default: ""
			}
		},
		slideShow: {
			durationImage: {
				type: String,
				default: ""
			},
			durationVideo: {
				type: String,
				default: ""
			},
			hideSlideshowQR: {
				type: Boolean,
				default: false
			},
			hideVideoSound: {
				type: Boolean,
				default: false
			}
		},
		welcomeScreen: {
			title: {
				type: String,
				default: ""
			},
			eventDate: {
				type: Object,
				default: ""
			}
		},
		moderation: {
			isManualApprove: {
				type: Boolean,
				default: false
			},
			isDisableGuestsDownload: {
				type: Boolean,
				default: false
			},
			isAllowedMedia: {
				type: String,
				default: ""
			},
			digitalAlbumPermissions: {
				type: String,
				default: ""
			}
		},
		collaborator: [{
			email: {
			  	type: String,
			  	trim: true,
				unique: true,
				default: ""
			},
			role: {
				type: String,
				default: ""
			}
		}],
	}
);

module.exports = mongoose.model('Event', eventSchema);
