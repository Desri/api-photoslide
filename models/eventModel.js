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
		plan: {
			type: mongoose.Types.ObjectId,
			ref: 'User'
		},
		appearance: {
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
			eventLogo: {
				type: Boolean,
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
