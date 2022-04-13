const { StatusCodes: Sc } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const { RefreshToken } = require('../../models');

const handleError = (err, res) => {
	console.log('Error:', err);
	return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

module.exports = async (req, res) => {
	try {
		await RefreshToken.findOneAndDelete({ user: req.user });
		return res
			.status(Sc.OK)
			.clearCookie('refreshToken', { httpOnly: true })
			.json({ message: 'Logged out !' });
	} catch (err) {
		handleError(err, res);
	}
};
