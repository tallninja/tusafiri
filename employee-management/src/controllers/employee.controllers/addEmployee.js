const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { StatusCodes: Sc } = require('http-status-codes');

const { Employee, Role } = require('../../models');

const handleError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

const CreateEmployeeSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  idNo: Joi.number(),
  email: Joi.string(),
  phoneNumber: Joi.string(),
  employeeId: Joi.string(),
  password: Joi.string(),
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
    employeeDetails.password = bcrypt.hashSync(employeeDetails.password);
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
