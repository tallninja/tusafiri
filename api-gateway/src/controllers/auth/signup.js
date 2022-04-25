const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { StatusCodes: Sc } = require('http-status-codes');

const { User, SystemRole, SYSTEM_ROLES } = require('../../models');

const handleError = require('../../utils/handleError');

const SignupSchema = Joi.object({
	firstName: Joi.string(),
	lastName: Joi.string(),
	email: Joi.string().email({ allowFullyQualified: ['.com'] }),
	phoneNo: Joi.string(),
	password: Joi.string(),
});

module.exports = async (req, res) => {
	try {
		const userDetails = await SignupSchema.validateAsync(req.body);
		const existingEmail = await User.findOne({
			email: userDetails.email,
		}).exec();

		if (existingEmail) {
			return res.status(Sc.BAD_REQUEST).json({ message: 'Email exists.' });
		}

		const existingPhoneNo = await User.findOne({
			phoneNo: userDetails.phoneNo,
		}).exec();

		if (existingPhoneNo) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: 'Phone number exists.' });
		}

		userDetails.password = bcrypt.hashSync(userDetails.password);

		const newUser = await new User(userDetails).save();

		console.log(`User ${newUser.email} was created.`);

		return res.status(Sc.OK).json({ message: 'Account created successfully.' });
	} catch (err) {
		handleError(err, res);
	}
};
