const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { StatusCodes: Sc } = require('http-status-codes');

const { Employee } = require('../../models');

const handleError = require('../../utils/handleError');

const ChangePaswordSchema = Joi.object({
	oldPassword: Joi.string(),
	newPassword: Joi.string(),
});

module.exports = async (req, res) => {
	const { id } = req.query;

	if (!id) {
		return res
			.status(Sc.BAD_REQUEST)
			.json({ mmesage: 'Please provide employee id.' });
	}

	try {
		let { oldPassword, newPassword } = await ChangePaswordSchema.validateAsync(
			req.body
		);

		let currentEmployee = await Employee.findById(id).exec();

		if (!currentEmployee) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: 'Employee not found.' });
		}

		let oldPasswordIsValid = bcrypt.compareSync(
			oldPassword,
			currentEmployee.password
		);

		if (!oldPasswordIsValid) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: 'Old password is invalid.' });
		}

		await currentEmployee.updateOne({
			$set: {
				password: bcrypt.hashSync(newPassword),
				updatedAt: new Date(),
			},
		});

		let updatedEmployee = await Employee.findById(currentEmployee._id, {
			password: 0,
		})
			.populate(['role'])
			.exec();

		return res.status(Sc.OK).json(updatedEmployee);
	} catch (err) {
		return handleError(err, res);
	}
};
