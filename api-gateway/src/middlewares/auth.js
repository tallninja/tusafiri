const { StatusCodes: Sc } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const { auth } = require('../../config');
const { User, SYSTEM_ROLES } = require('../models');

const { TokenExpiredError } = jwt;

const catchTokenError = (err, res) => {
	if (err instanceof TokenExpiredError) {
		return res
			.status(Sc.FORBIDDEN)
			.json({ message: 'Access token is expired !' });
	}
	return res.status(Sc.FORBIDDEN).json({ message: err.message });
};

exports.verifyToken = (req, res, next) => {
	const token = req.headers['authorization'];
	if (!token) {
		return res.status(Sc.FORBIDDEN).json({ message: 'No token provided !' });
	}
	jwt.verify(token.split(' ')[1], auth.jwtSecret, (err, decodedToken) => {
		if (err) {
			return catchTokenError(err, res);
		}
		req.user = decodedToken.id;
		next();
		return;
	});
};

exports.isAdmin = async (req, res, next) => {
	try {
		const user = await User.findById(req.user).populate(['systemRole']).exec();

		if (!user) {
			return res.status(Sc.BAD_REQUEST).json({ message: 'User not found.' });
		}

		if (user.systemRole.name === SYSTEM_ROLES.admin) {
			return next();
		}

		return res
			.status(Sc.UNAUTHORIZED)
			.json({ message: 'Admin role required.' });
	} catch (err) {
		console.log('Error:', err);
		return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
	}
};
