const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Booking, Invoice } = require('../../models');

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

      Invoice.findOneAndDelete({ booking: booking._id }).exec((err) => {
        if (err) {
          return handleDbError(err, res);
        }

        booking.deleteOne((err) => {
          if (err) {
            return handleDbError(err, res);
          }

          console.log('Info:', `Booking ${booking._id} was deleted.`);
          return res.status(Sc.OK).json(booking);
        });
      });
    });
};
