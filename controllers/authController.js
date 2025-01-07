// const jwt = require('jsonwebtoken');
// const {
// 	signupSchema,
// 	signinSchema,
// } = require('../middlewares/validator');
// const User = require('../models/usersModel');
// const { doHash, doHashValidation } = require('../utils/hashing');

async function signup(req, res) {
	res.json({ message: 'Hello from the server' });
}

// exports.signup = async (req, res) => {
// 	const { fullname, email, password } = req.body;
// 	try {
// 		const { error, value } = signupSchema.validate({ fullname, email, password });

// 		if (error) {
// 			return res
// 				.status(401)
// 				.json({ success: false, message: error.details[0].message });
// 		}
// 		const existingUser = await User.findOne({ email });

// 		if (existingUser) {
// 			return res
// 				.status(401)
// 				.json({ success: false, message: 'User already exists!' });
// 		}

// 		const hashedPassword = await doHash(password, 12);

// 		const newUser = new User({
// 			fullname,
// 			email,
// 			password: hashedPassword,
// 		});
// 		const result = await newUser.save();
// 		result.password = undefined;
// 		res.status(201).json({
// 			success: true,
// 			message: 'Your account has been created successfully',
// 			result,
// 		});
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// exports.signin = async (req, res) => {
// 	res.setHeader('Access-Control-Allow-Origin', 'https://wedding-eight-pi.vercel.app');
// 	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
// 	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// 	res.setHeader('Access-Control-Allow-Credentials', 'true');
// 	const { email, password } = req.body;
// 	try {
// 		const { error, value } = signinSchema.validate({ email, password });
// 		if (error) {
// 			return res
// 				.status(401)
// 				.json({ success: false, message: error.details[0].message });
// 		}

// 		const existingUser = await User.findOne({ email }).select('+password');
// 		if (!existingUser) {
// 			return res
// 				.status(401)
// 				.json({ success: false, message: 'User does not exists!' });
// 		}
// 		const result = await doHashValidation(password, existingUser.password);
// 		if (!result) {
// 			return res
// 				.status(401)
// 				.json({ success: false, message: 'Invalid credentials!' });
// 		}
// 		const token = jwt.sign(
// 			{
// 				userId: existingUser._id,
// 				email: existingUser.email,
// 				verified: existingUser.verified,
// 			},
// 			process.env.TOKEN_SECRET,
// 			{
// 				expiresIn: '8h',
// 			}
// 		);

// 		res
// 			.cookie('Authorization', 'Bearer ' + token, {
// 				expires: new Date(Date.now() + 8 * 3600000),
// 				httpOnly: process.env.NODE_ENV === 'production',
// 				secure: process.env.NODE_ENV === 'production',
// 			})
// 			.json({
// 				success: true,
// 				token,
// 				message: 'logged in successfully',
// 			});
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

module.exports = {
	signup
}
