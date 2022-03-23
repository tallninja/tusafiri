const { StatusCodes: Sc } = require('http-status-codes');

const { Employee } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

module.exports = (req, res) => {
  Employee.find({}, { password: 0 })
    .populate(['role'])
    .exec((err, employees) => {
      if (err) {
        return handleDbError(err, res);
      }

      return res.status(Sc.OK).json(employees);
    });
};
