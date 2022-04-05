const { StatusCodes: Sc } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const { auth } = require('../../config');

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
