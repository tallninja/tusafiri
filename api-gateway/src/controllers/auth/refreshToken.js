const jwt = require('jsonwebtoken');
const { StatusCodes: Sc } = require('http-status-codes');

const { RefreshToken, User } = require('../../models');
const { auth } = require('../../../config');

const handleError = require('../../utils/handleError');

module.exports = async (req, res) => {
	try {
		const requestToken = req.body.refreshToken || req.cookies?.refreshToken;

		if (!requestToken) {
			return res
				.status(Sc.UNAUTHORIZED)
				.json({ message: 'Please provide a refresh token.' });
		}

		const existingRefreshToken = await RefreshToken.findOne({
			token: requestToken,
		}).exec();

		if (!existingRefreshToken) {
			return res.status(Sc.BAD_REQUEST).json({ message: 'Invalid token.' });
		}

		const tokenIsExpired =
			!RefreshToken.verifyTokenExpiration(existingRefreshToken);

		if (tokenIsExpired) {
			await RefreshToken.findOneAndDelete({
				token: existingRefreshToken.token,
			});
			return res
				.status(Sc.UNAUTHORIZED)
				.json({ message: 'Refresh token is expired, please sign in again' });
		}

		const newAccessToken = jwt.sign(
			{ id: existingRefreshToken.user },
			auth.jwtSecret,
			{ expiresIn: auth.jwtTokenExpire }
		);

		const user = await User.findById(existingRefreshToken.user)
			.populate(['systemRole'])
			.exec();

		const responseData = {
			id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			phoneNo: user.phoneNo,
			accessToken: newAccessToken,
			refreshToken: requestToken.token,
			systemRole: user.systemRole.name.toUpperCase(),
		};

		return res.status(Sc.OK).json(responseData);
	} catch (err) {
		handleError(err, res);
	}
};
