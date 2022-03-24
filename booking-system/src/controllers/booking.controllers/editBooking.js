const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Booking } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

const EditBookingSchema = Joi.object({
  seats: Joi.array(),
});

module.exports = (req, res) => {
  const { id } = req.params;

  EditBookingSchema.validateAsync(req.body)
    .then((updatedFields) => {
      Booking.findById(id).exec((err, booking) => {
        if (err) {
          return handleDbError(err, res);
        }

        if (!booking) {
          return res
            .status(Sc.BAD_REQUEST)
            .json({ message: 'Booking not found.' });
        }

        updatedFields.updatedAt = new Date();

        booking.updateOne({ $set: updatedFields }, (err) => {
          if (err) {
            return handleDbError(err, res);
          }

          console.log('Info:', `Booking ${booking._id} was updated.`);

          Booking.findById(booking._id)
            .populate(['journey', 'seats'])
            .exec((err, updatedBooking) => {
              if (err) {
                return handleDbError(err, res);
              }

              return res.status(Sc.OK).json(updatedBooking);
            });
        });
      });
    })
    .catch((err) => {
      return res.status(Sc.BAD_REQUEST).json(err);
    });
};
