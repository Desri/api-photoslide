const { jwtDecode } = require('jwt-decode')
// const { createPostSchema } = require('../middlewares/validator');
const User = require('../models/usersModel');

exports.getProfile = async (req, res) => {
	try {
		const token = req.headers.authorization?.split(' ')[1]
		const decoded = jwtDecode(token)
		const result = await User.findOne({_id: `${decoded.userId}`}).select('email fullname');
		res.json({
			success: true,
			result,
			message: 'successfully get profile',
		});
	} catch (error) {
		res.json({
			success: false
		});
	}
};
