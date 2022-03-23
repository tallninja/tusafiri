const { StatusCodes: Sc } = require('http-status-codes');

const { Employee } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

module.exports = (req, res) => {
  const { id } = req.params;

  Employee.findById(id, { password: 0 })
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
