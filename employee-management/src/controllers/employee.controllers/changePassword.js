const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { StatusCodes: Sc } = require('http-status-codes');

const { Employee } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

const ChangePaswordSchema = Joi.object({
  oldPassword: Joi.string(),
  newPassword: Joi.string(),
});

module.exports = (req, res) => {
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
          {
            $set: {
              password: bcrypt.hashSync(newPassword),
              updatedAt: new Date(),
            },
          },
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
