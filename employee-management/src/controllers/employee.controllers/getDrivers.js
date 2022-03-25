const { StatusCodes: Sc } = require('http-status-codes');

const { Employee, Role, ROLES } = require('../../models');

const handleError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

module.exports = async (req, res) => {
  try {
    let driverRole = await Role.findOne({ name: ROLES.driver }).exec();

    let drivers = await Employee.find({ role: driverRole._id }, { password: 0 })
      .populate(['role'])
      .exec();

    return res.status(Sc.OK).json(drivers);
  } catch (err) {
    return handleError(err, res);
  }
};
