const { StatusCodes: Sc } = require('http-status-codes');

const { Employee, Role, ROLES } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

module.exports = (req, res) => {
  Role.findOne({ name: ROLES.snmManager }).exec((err, role) => {
    if (err) {
      return handleDbError(err, res);
    }

    Employee.find({ role: role._id }, { password: 0 })
      .populate(['role'])
      .exec((err, snmManagers) => {
        if (err) {
          return handleDbError(err, res);
        }

        return res.status(Sc.OK).json(snmManagers);
      });
  });
};
