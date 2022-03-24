const mongoose = require('mongoose');

const Invoice = require('./Invoice');

const BookingSchema = new mongoose.Schema({
  journey: { type: mongoose.Types.ObjectId, ref: 'journeys', required: true },
  seats: [{ type: mongoose.Types.ObjectId, ref: 'seats' }],
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

BookingSchema.pre('save', function (next) {
  try {
    Invoice.generateInvoice(this);
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

// BookingSchema.pre('delete', async function (next) {
//   try {
//     console.log(this);
//     let booking = await this.model.findOne(this.getQuery()).exec();
//     let invoice = await Invoice.findOne({ booking: booking._id }).exec();

//     if (!invoice) {
//       next();
//     }

//     await invoice.deleteOne();
//     next();
//   } catch (err) {
//     throw err;
//   }
// });

module.exports = mongoose.model('bookings', BookingSchema);
