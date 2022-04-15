const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { StatusCodes: Sc } = require('http-status-codes');

const { User, SYSTEM_ROLES, RefreshToken } = require('../../models');
const { auth } = require('../../../config');

const handleError = (err, res) => {
	console.log('Error:', err);
	res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

const SigninSchema = Joi.object({
	email: Joi.string().email({ allowFullyQualified: ['.com'] }),
	password: Joi.string(),
});

module.exports = async (req, res) => {
	try {
		const signinCredentials = await SigninSchema.validateAsync(req.body);
		const user = await User.findOne({
			email: signinCredentials.email,
		})
			.populate(['systemRole'])
			.exec();

		if (!user) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: 'User does not exist.' });
		}

		if (user.systemRole.name !== SYSTEM_ROLES.admin) {
			return res
				.status(Sc.UNAUTHORIZED)
				.json({ message: 'Admin role required.' });
		}

		const passwordIsValid = bcrypt.compareSync(
			signinCredentials.password,
			user.password
		);

		if (!passwordIsValid) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: 'Password is invalid.' });
		}

		const token = jwt.sign({ id: user._id }, auth.jwtSecret, {
			expiresIn: auth.jwtTokenExpire,
		});

		const refreshToken = await RefreshToken.createToken(user._id);

		const responseData = {
			id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			phoneNo: user.phoneNo,
			accessToken: token,
			refreshToken: refreshToken,
			systemRole: user.systemRole.name.toUpperCase(),
		};

		return res
			.status(Sc.OK)
			.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				maxAge: auth.jwtRefreshExpire * 1000,
			})
			.json(responseData);
	} catch (err) {
		handleError(err, res);
	}
};