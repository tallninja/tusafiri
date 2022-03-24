const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Booking, Seat, Journey } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

const CreateBookingSchema = Joi.object({
  journey: Joi.string(),
  seats: Joi.array(),
});

module.exports = (req, res) => {
  CreateBookingSchema.validateAsync(req.body)
    .then((bookingDetails) => {
      Journey.findById(bookingDetails.journey).exec((err, journey) => {
        if (err) {
          return handleDbError(err, res);
        }

        if (!journey) {
          return res
            .status(Sc.BAD_REQUEST)
            .json({ message: 'Journey not found.' });
        }

        bookingDetails.journey = journey._id;

        Seat.find({ _id: { $in: bookingDetails.seats } }).exec((err, seats) => {
          if (err) {
            return handleDbError(err, res);
          }

          if (seats.length !== bookingDetails.seats.length) {
            return res
              .status(Sc.BAD_REQUEST)
              .json({ message: 'Seats are invalid.' });
          }

          bookingDetails.seats = seats.map((seat) => seat._id);
          bookingDetails.createdAt = new Date();

          new Booking(bookingDetails).save((err, booking) => {
            if (err) {
              return handleDbError(err, res);
            }

            console.log('Info:', `Booking ${booking._id} was created.`);
            Booking.findById(booking._id)
              .populate(['journey', 'seats'])
              .exec((err, newBooking) => {
                if (err) {
                  return handleDbError(err, res);
                }

                return res.status(Sc.OK).json(newBooking);
              });
          });
        });
      });
    })
    .catch((err) => {
      return res.status(Sc.BAD_REQUEST).json(err);
    });
};
