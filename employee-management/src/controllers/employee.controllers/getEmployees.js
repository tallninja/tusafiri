const { StatusCodes: Sc } = require('http-status-codes');

const { Employee } = require('../../models');

const handleError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

module.exports = async (req, res) => {
  try {
    let employees = await Employee.find({}, { password: 0 })
      .populate(['role'])
      .exec();

    return res.status(Sc.OK).json(employees);
  } catch (err) {
    return handleError(err, res);
  }
};
