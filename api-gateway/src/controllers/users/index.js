const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { User, SystemRole } = require('../../models');

const handleError = require('../../utils/handleError');

exports.getUsers = async (req, res) => {
	try {
		const users = await User.find().populate(['systemRole']).exec();
		return res.status(Sc.OK).json(users);
	} catch (err) {
		return handleError(err, res);
	}
};

exports.getUser = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findById(id).populate(['systemRole']).exec();

		if (!user) {
			return res.status(Sc.BAD_REQUEST).json({ message: 'User not found.' });
		}

		return res.status(Sc.OK).json(user);
	} catch (err) {
		return handleError(err, res);
	}
};

const EditUserSchema = Joi.object({
	firstName: Joi.string().optional(),
	lastName: Joi.string().optional(),
	email: Joi.string().optional(),
	phoneNo: Joi.string().optional(),
	confirmed: Joi.boolean().optional(),
	systemRole: Joi.string().optional(),
});

exports.editUser = async (req, res) => {
	const { id } = req.params;

	try {
		const updatedFields = await EditUserSchema.validateAsync(req.body);
		const role = await SystemRole.findOne({
			name: updatedFields.systemRole,
		}).exec();

		if (!role) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: `Role ${updatedFields.systemRole} does not exist.` });
		}

		updatedFields.systemRole = role._id;

		const user = await User.findById(id).exec();

		if (!user) {
			return res.status(Sc.BAD_REQUEST).json({ message: 'User not found.' });
		}

		updatedFields.updatedAt = new Date();

		await user.updateOne({ $set: updatedFields });
		console.log('Info:', `User ${user._id} was updated.`);

		const updatedUser = await User.findById(user._id)
			.populate(['systemRole'])
			.exec();

		return res.status(Sc.OK).json(updatedUser);
	} catch (err) {
		return handleError(err, res);
	}
};

exports.deleteUser = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findById(id).populate(['systemRole']).exec();

		if (!user) {
			return res.status(sc.BAD_REQUEST).json({ message: 'User not found.' });
		}

		await user.deleteOne();
		console.log(`User ${user._id} was deleted.`);

		return res.status(Sc.OK).json(user);
	} catch (err) {
		return handleError(err, res);
	}
};
