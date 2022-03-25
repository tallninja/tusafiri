const { StatusCodes: Sc } = require('http-status-codes');

const { Employee, Role, ROLES } = require('../../models');

const handleError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

module.exports = async (req, res) => {
  try {
    let fleetManagerRole = await Role.findOne({
      name: ROLES.fleetManager,
    }).exec();

    let fleetManagers = await Employee.find(
      { role: fleetManagerRole._id },
      { password: 0 }
    )
      .populate(['role'])
      .exec();

    return res.status(Sc.OK).json(fleetManagers);
  } catch (err) {
    return handleError(err, res);
  }
};
