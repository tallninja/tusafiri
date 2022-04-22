const { StatusCodes: Sc } = require('http-status-codes');

const { Employee, Role, ROLES } = require('../../models');

const handleError = require('../../utils/handleError');

module.exports = async (req, res) => {
	try {
		let helpDeskRole = await Role.findOne({ name: ROLES.helpDesk }).exec();

		let helpDeskManagers = await Employee.find(
			{ role: helpDeskRole._id },
			{ password: 0 }
		)
			.populate(['role'])
			.exec();

		return res.status(Sc.OK).json(helpDeskManagers);
	} catch (err) {
		return handleError(err, res);
	}
};
