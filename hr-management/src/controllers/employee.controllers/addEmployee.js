const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { StatusCodes: Sc } = require('http-status-codes');

const { Employee, Role } = require('../../models');

const handleDbError = (err, res) => {
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

module.exports = (req, res) => {
  CreateEmployeeSchema.validateAsync(req.body)
    .then((employeeDetails) => {
      employeeDetails.createdAt = new Date();

      Employee.findOne({ employeeId: employeeDetails.employeeId }).exec(
        (err, employee) => {
          if (err) {
            return handleDbError(err, res);
          }

          if (employee) {
            return res
              .status(Sc.BAD_REQUEST)
              .json({ message: `${employeeDetails.employeeId} exists.` });
          }

          Role.findOne({ name: employeeDetails.role }).exec((err, role) => {
            if (err) {
              return handleDbError(err, res);
            }

            if (!role) {
              return res.status(Sc.BAD_REQUEST).json({
                message: `${employeeDetails.role} role does not exist.`,
              });
            }

            employeeDetails.role = role._id;
            employeeDetails.password = bcrypt.hashSync(
              employeeDetails.password
            );
            new Employee(employeeDetails).save((err, employee) => {
              if (err) {
                return handleDbError(err, res);
              }

              console.log(
                'Info:',
                `Employee ${employee.employeeId} was created.`
              );
              Employee.findById(employee._id, { password: 0 })
                .populate(['role'])
                .exec((err, newEmployee) => {
                  if (err) {
                    return handleDbError(err, res);
                  }
                  return res.status(Sc.OK).json(newEmployee);
                });
            });
          });
        }
      );
    })
    .catch((err) => {
      return res.status(Sc.BAD_REQUEST).json(err);
    });
};
