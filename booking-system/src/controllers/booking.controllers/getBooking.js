const { StatusCodes: Sc } = require('http-status-codes');

const { Booking } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

module.exports = (req, res) => {
  const { id } = req.params;

  Booking.findById(id)
    .populate(['journey', 'seats'])
    .exec((err, booking) => {
      if (err) {
        return handleDbError(err, res);
      }

      if (!booking) {
        return res
          .status(Sc.BAD_REQUEST)
          .json({ message: 'Booking not found.' });
      }

      return res.status(Sc.OK).json(booking);
    });
};
