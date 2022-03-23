const { StatusCodes: Sc } = require('http-status-codes');

const { Passenger } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

module.exports = (req, res) => {
  Passenger.find({}, { password: 0 }).exec((err, passengers) => {
    if (err) {
      return handleDbError(err, res);
    }

    return res.status(Sc.OK).json(passengers);
  });
};
