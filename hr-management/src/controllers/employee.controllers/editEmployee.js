const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Employee } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

const EditEmployeeSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  idNo: Joi.number(),
  email: Joi.string(),
  phoneNumber: Joi.string(),
});

module.exports = (req, res) => {
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
