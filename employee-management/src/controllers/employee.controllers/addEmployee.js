const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { StatusCodes: Sc } = require('http-status-codes');

const { Employee, Role } = require('../../models');

const handleError = require('../../utils/handleError');

const CreateEmployeeSchema = Joi.object({
	firstName: Joi.string(),
	lastName: Joi.string(),
	idNo: Joi.number(),
	email: Joi.string(),
	phoneNumber: Joi.string(),
	employeeId: Joi.string(),
	role: Joi.string(),
});

module.exports = async (req, res) => {
	try {
		let employeeDetails = await CreateEmployeeSchema.validateAsync(req.body);
		let existingEmployee = await Employee.findOne({
			employeeId: employeeDetails.employeeId,
		}).exec();

		if (existingEmployee) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: `${employeeDetails.employeeId} exists.` });
		}

		let role = await Role.findOne({ name: employeeDetails.role }).exec();

		if (!role) {
			return res.status(Sc.BAD_REQUEST).json({
				message: `${employeeDetails.role} role does not exist.`,
			});
		}

		employeeDetails.role = role._id;

		let generatedPassword = Math.random().toString(36).slice(2);
		employeeDetails.password = bcrypt.hashSync(generatedPassword);
		employeeDetails.createdAt = new Date();

		let createdEmployee = await new Employee(employeeDetails).save();

		console.log('Info:', `Employee ${createdEmployee.employeeId} was created.`);

		let newEmployee = await Employee.findById(createdEmployee._id, {
			password: 0,
		})
			.populate(['role'])
			.exec();

		return res.status(Sc.OK).json(newEmployee);
	} catch (err) {
		return handleError(err, res);
	}
};
