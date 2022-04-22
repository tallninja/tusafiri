const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Employee } = require('../../models');

const handleError = require('../../utils/handleError');

const EditEmployeeSchema = Joi.object({
	firstName: Joi.string(),
	lastName: Joi.string(),
	idNo: Joi.number(),
	email: Joi.string(),
	phoneNumber: Joi.string(),
});

module.exports = async (req, res) => {
	const { id } = req.params;

	try {
		let updatedFields = await EditEmployeeSchema.validateAsync(req.body);
		let currentEmployee = await Employee.findById(id).exec();

		if (!currentEmployee) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: 'Employee not found.' });
		}

		updatedFields.updatedAt = new Date();

		await currentEmployee.updateOne({ $set: updatedFields });

		console.log('Info:', `Employee ${currentEmployee.employeeId} was updated.`);

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
