const { StatusCodes: Sc } = require('http-status-codes');

const { Booking } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

module.exports = (req, res) => {
  Booking.find({}).exec((err, bookings) => {
    if (err) {
      return handleDbError(err, res);
    }

    return res.status(Sc.OK).json(bookings);
  });
};
