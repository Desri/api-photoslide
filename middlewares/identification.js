const jwt = require('jsonwebtoken');

exports.identifier = (req, res, next) => {
	let token;
	if (req.headers.authorization) {
		token = req.headers.authorization;
	}

	if (!token) {
		return res.status(403).json({ success: false, message: 'Unauthorized' });
	}

	try {
		const userToken = token.split(' ')[1];
		const jwtVerified = jwt.verify(userToken, process.env.TOKEN_SECRET);
		if (jwtVerified) {
			req.user = jwtVerified;
			next();
		} else {
			throw new Error('error in the token');
		}
	} catch (error) {
		console.log(error);
	}
};
