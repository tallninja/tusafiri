const { StatusCodes: Sc } = require('http-status-codes');

const { Passenger } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

module.exports = (req, res) => {
  const { id } = req.params;

  Passenger.findById(id, { password: 0 }).exec((err, passenger) => {
    if (err) {
      return handleDbError(err, res);
    }

    passenger.delete((err) => {
      if (err) {
        return handleDbError(err, res);
      }

      console.log('Info:', `${passenger.username} was deleted.`);
      return res.status(Sc.OK).json(passenger);
    });
  });
};
