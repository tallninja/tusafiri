const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Booking, Invoice } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    let booking = await Booking.findById(id)
      .populate(['journey', 'seats'])
      .exec();

    if (!booking) {
      return res.status(Sc.BAD_REQUEST).json({ message: 'Booking not found.' });
    }

    await booking.deleteOne();

    console.log('Info:', `Booking ${booking._id} was deleted.`);

    let deletedInvoice = await Invoice.findOneAndDelete({
      booking: booking._id,
    }).exec();

    console.log('Info:', `Invoice ${deletedInvoice._id} was deleted.`);

    return res.status(Sc.OK).json(booking);
  } catch (err) {
    return handleDbError(err, res);
  }
};
