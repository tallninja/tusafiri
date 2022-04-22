const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Employee, Role } = require('../../models');

const handleError = require('../../utils/handleError');

const ChangeRoleSchema = Joi.object({
	roleName: Joi.string(),
});

module.exports = async (req, res) => {
	const { id } = req.query;

	if (!id) {
		return res
			.status(Sc.BAD_REQUEST)
			.json({ mmesage: 'Please provide employee id.' });
	}

	try {
		let { roleName } = await ChangeRoleSchema.validateAsync(req.body);

		let role = await Role.findOne({ name: roleName }).exec();

		if (!role) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: `Role ${roleName} nof found.` });
		}

		let currentEmployee = await Employee.findById(id).exec();

		if (!currentEmployee) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: 'Employee not found.' });
		}

		if (JSON.stringify(currentEmployee.role) === JSON.stringify(role._id)) {
			return res.status(Sc.BAD_REQUEST).json({
				message: `Employee ${currentEmployee.employeeId} is currently ${role.name}.`,
			});
		}

		await currentEmployee.updateOne({
			$set: { role: role._id, updatedAt: new Date() },
		});

		console.log(
			'Info:',
			`Employee ${currentEmployee.employeeId} role changed to ${role.name}.`
		);

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
