const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Employee, Role } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

const ChangeRoleSchema = Joi.object({
  roleName: Joi.string(),
});

module.exports = (req, res) => {
  const { employee_id } = req.query;

  if (!employee_id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ mmesage: 'Please provide employee id.' });
  }

  ChangeRoleSchema.validateAsync(req.body)
    .then(({ roleName }) => {
      Role.findOne({ name: roleName }).exec((err, role) => {
        if (err) {
          return handleDbError(err, res);
        }

        if (!role) {
          return res
            .status(Sc.BAD_REQUEST)
            .json({ message: `Role ${roleName} nof found.` });
        }

        Employee.findById(employee_id).exec((err, employee) => {
          if (err) {
            return handleDbError(err, res);
          }

          if (!employee) {
            return res
              .status(Sc.BAD_REQUEST)
              .json({ message: 'Employee not found.' });
          }

          if (JSON.stringify(employee.role) === JSON.stringify(role._id)) {
            return res.status(Sc.BAD_REQUEST).json({
              message: `Employee ${employee.employeeId} is currently ${role.name}.`,
            });
          }

          console.log(employee.role, role._id);

          employee.updateOne(
            { $set: { role: role._id, updatedAt: new Date() } },
            (err) => {
              if (err) {
                return handleDbError(err, res);
              }

              console.log(
                'Info:',
                `Employee ${employee.employeeId} role changed to ${role.name}.`
              );
              Employee.findById(employee._id, { password: 0 })
                .populate(['role'])
                .exec((err, updatedEmployee) => {
                  if (err) {
                    return handleDbError(err, res);
                  }
                  return res.status(Sc.OK).json(updatedEmployee);
                });
            }
          );
        });
      });
    })
    .catch((err) => {
      return res.status(Sc.BAD_REQUEST).json(err);
    });
};
