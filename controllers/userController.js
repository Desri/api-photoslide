const { jwtDecode } = require('jwt-decode')
const User = require('../models/usersModel');

exports.getProfile = async (req, res) => {
	try {
		const token = req.headers.authorization?.split(' ')[1]
		const decoded = jwtDecode(token)
		const result = await User.findOne({_id: `${decoded.userId}`}).select('email fullname plan');
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

exports.fetchAddPlan = async (req, res) => {
	try {
		const token = req.headers.authorization?.split(' ')[1]
		const decoded = jwtDecode(token)
		const updatePlan = await User.updateOne(
			{_id: decoded.userId},
			{$set: {
			  "plan": req.body.plan
			}}
		);
		if (updatePlan.acknowledged) {
			res.json({
				success: true,
				message: 'successfully update plan',
			});
		}
	} catch (error) {
		res.json({
			success: false
		});
	}
};
