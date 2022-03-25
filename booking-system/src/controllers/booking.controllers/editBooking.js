const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Booking } = require('../../models');

const handleError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

const EditBookingSchema = Joi.object({
  seats: Joi.array(),
});

module.exports = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ message: 'Please enter the booking id.' });
  }

  try {
    let updatedFields = await EditBookingSchema.validateAsync(req.body);
    let currentBooking = await Booking.findById(id).exec();

    if (!currentBooking) {
      return res.status(Sc.BAD_REQUEST).json({ message: 'Booking not found.' });
    }

    updatedFields.updatedAt = new Date();

    await currentBooking.updateOne({ $set: updatedFields });
    console.log('Info:', `Booking ${currentBooking._id} was updated.`);

    let updatedBooking = await Booking.findById(currentBooking._id)
      .populate(['journey', 'seats'])
      .exec();

    return res.status(Sc.OK).json(updatedBooking);
  } catch (err) {
    return handleError(err, res);
  }
};
