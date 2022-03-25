const { StatusCodes: Sc } = require('http-status-codes');

const { Employee } = require('../../models');

const handleError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

module.exports = async (req, res) => {
  const { id } = req.query;

  try {
    let employee = await Employee.findById(id, { password: 0 })
      .populate(['role'])
      .exec();

    if (!employee) {
      return res
        .status(Sc.BAD_REQUEST)
        .json({ message: 'Employee not found.' });
    }

    await employee.deleteOne();
    console.log('Info:', `Employee ${employee.employeeId} was deleted.`);

    return res.status(Sc.OK).json(employee);
  } catch (err) {
    return handleError(err, res);
  }
};
