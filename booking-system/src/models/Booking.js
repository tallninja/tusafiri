const _ = require('lodash');
const mongoose = require('mongoose');

const Invoice = require('./Invoice');
const Journey = require('./Journey');

const BookingSchema = new mongoose.Schema({
  journey: { type: mongoose.Types.ObjectId, ref: 'journeys', required: true },
  seats: [{ type: mongoose.Types.ObjectId, ref: 'seats' }],
  paid: { type: Boolean, default: false },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

BookingSchema.pre('save', async function (next) {
  try {
    Invoice.generateInvoice(this);
    let journey = await Journey.findById(this.journey).exec();
    journey.bookedSeats = _.unionBy(
      journey.bookedSeats,
      this.seats,
      JSON.stringify
    );
    journey.save();
    next();
  } catch (err) {
    throw err;
  }
});

BookingSchema.pre('updateOne', async function (next) {
  try {
    let booking = await this.model.findOne(this.getQuery()).exec();
    let invoice = await Invoice.findOne({ booking: booking._id }).exec();
    Invoice.updateInvoice(invoice, booking);
    next();
  } catch (err) {
    throw err;
  }
});

BookingSchema.post('updateOne', async function () {
  try {
    let booking = await this.model.findOne(this.getQuery()).exec();
    await booking.save();
  } catch (err) {
    throw err;
  }
});

BookingSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (next) {
    try {
      let journey = await Journey.findById(this.journey).exec();
      let bookedSeats = this.seats.map((seat) => JSON.stringify(seat._id));
      journey.bookedSeats = _.remove(
        journey.bookedSeats,
        (seat) => !bookedSeats.includes(JSON.stringify(seat))
      );
      await journey.save();
      next();
    } catch (err) {
      throw err;
    }
  }
);

module.exports = mongoose.model('bookings', BookingSchema);
