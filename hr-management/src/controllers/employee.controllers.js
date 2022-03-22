const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { StatusCodes: Sc } = require('http-status-codes');

const { Employee, Role, ROLES } = require('../models');

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

const EditEmployeeSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  idNo: Joi.number(),
  email: Joi.string(),
  phoneNumber: Joi.string(),
});

exports.addEmployee = (req, res) => {
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

exports.editEmployee = (req, res) => {
  const { id } = req.params;

  EditEmployeeSchema.validateAsync(req.body)
    .then((updatedFields) => {
      Employee.findById(id).exec((err, employee) => {
        if (err) {
          return handleDbError(err, res);
        }

        if (!employee) {
          return res
            .status(Sc.BAD_REQUEST)
            .json({ message: 'Employee not found.' });
        }

        updatedFields.updatedAt = new Date();
        employee.updateOne({ $set: updatedFields }, (err) => {
          if (err) {
            return handleDbError(err, res);
          }

          console.log('Info:', `Employee ${employee.employeeId} was edited.`);
          Employee.findById(employee._id)
            .populate(['role'])
            .exec((err, updatedEmployee) => {
              if (err) {
                return handleDbError(err, res);
              }

              return res.status(Sc.OK).json(updatedEmployee);
            });
        });
      });
    })
    .catch((err) => {
      return res.status(Sc.BAD_REQUEST).json(err);
    });
};

exports.deleteEmployee = (req, res) => {
  const { id } = req.params;

  Employee.findById(id).exec((err, employee) => {
    if (err) {
      return handleDbError(err, res);
    }

    if (!employee) {
      return res
        .status(Sc.BAD_REQUEST)
        .json({ message: 'Employee not found.' });
    }

    employee.delete((err) => {
      if (err) {
        return handleDbError(err, res);
      }

      console.log('Info:', `Employee ${employee.employeeId} was deleted.`);
      return res.status(Sc.OK).json(employee);
    });
  });
};

exports.getEmployee = (req, res) => {
  const { id } = req.params;

  Employee.findById(id)
    .populate(['role'])
    .exec((err, employee) => {
      if (err) {
        return handleDbError(err, res);
      }

      if (!employee) {
        return res
          .status(Sc.BAD_REQUEST)
          .json({ message: 'Employee not found.' });
      }

      return res.status(Sc.OK).json(employee);
    });
};

exports.getEmployees = (req, res) => {
  Employee.find()
    .populate(['role'])
    .exec((err, employees) => {
      if (err) {
        return handleDbError(err, res);
      }

      return res.status(Sc.OK).json(employees);
    });
};

const ChangePaswordSchema = Joi.object({
  oldPassword: Joi.string(),
  newPassword: Joi.string(),
});

exports.changePassword = (req, res) => {
  const { employee_id } = req.query;

  if (!employee_id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ mmesage: 'Please provide employee id.' });
  }

  ChangePaswordSchema.validateAsync(req.body)
    .then(({ oldPassword, newPassword }) => {
      Employee.findById(employee_id).exec((err, employee) => {
        if (err) {
          return handleDbError(err, res);
        }

        if (!employee) {
          return res
            .status(Sc.BAD_REQUEST)
            .json({ message: 'Employee not found.' });
        }

        let oldPasswordIsValid = bcrypt.compareSync(
          oldPassword,
          employee.password
        );

        if (!oldPasswordIsValid) {
          return res
            .status(Sc.BAD_REQUEST)
            .json({ message: 'Old password is invalid.' });
        }

        employee.updateOne(
          { $set: { password: bcrypt.hashSync(newPassword) } },
          (err) => {
            if (err) {
              return handleDbError(err, res);
            }

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
    })
    .catch((err) => {
      return res.status(Sc.BAD_REQUEST).json(err);
    });
};

const ChangeRoleSchema = Joi.object({
  roleName: Joi.string(),
});

exports.changeRole = (req, res) => {
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

          if (employee.role === role._id) {
            return res.status(Sc.BAD_REQUEST).json({
              message: `Employee ${employee.employeeId} already has ${role.name} role.`,
            });
          }

          employee.updateOne({ $set: { role: role._id } }, (err) => {
            if (err) {
              return handleDbError(err, res);
            }

            console.log(
              'Info:',
              `Employee ${employee.employeeId} role changed to ${role.name}.`
            );
            Employee.findById(employee._id)
              .populate(['role'])
              .exec((err, updatedEmployee) => {
                if (err) {
                  return handleDbError(err, res);
                }
                return res.status(Sc.OK).json(updatedEmployee);
              });
          });
        });
      });
    })
    .catch((err) => {
      return res.status(Sc.BAD_REQUEST).json(err);
    });
};
