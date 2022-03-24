const _ = require('lodash');
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

module.exports = async (req, res) => {
  try {
    let bookingDetails = await CreateBookingSchema.validateAsync(req.body);
    let journey = await Journey.findById(bookingDetails.journey).exec();

    if (!journey) {
      return res.status(Sc.BAD_REQUEST).json({ message: 'Journey not found.' });
    }

    bookingDetails.journey = journey._id;
    let seats = await Seat.find({ _id: { $in: bookingDetails.seats } }).exec();

    if (seats.length !== bookingDetails.seats.length) {
      return res.status(Sc.BAD_REQUEST).json({ message: 'Seats are invalid.' });
    }

    bookingDetails.seats = _.uniqBy(
      seats.map((seat) => seat._id),
      JSON.stringify
    );

    let existingBooking = await Booking.findOne(bookingDetails).exec();

    if (existingBooking) {
      return res.status(Sc.BAD_REQUEST).json({ message: 'Booking exists.' });
    }

    bookingDetails.createdAt = new Date();

    let booking = await new Booking(bookingDetails).save();
    console.log('Info:', `Booking ${booking._id} was created.`);

    let newBooking = await Booking.findById(booking._id)
      .populate(['journey', 'seats'])
      .exec();
    return res.status(Sc.OK).json(newBooking);
  } catch (err) {
    return handleDbError(err, res);
  }
};
