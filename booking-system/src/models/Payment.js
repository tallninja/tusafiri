const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  invoice: { type: mongoose.Types.ObjectId, ref: 'invoices', required: true },
  amountPaid: { type: Number, required: true },
  mpesaTxnCode: { type: String },
  date: { type: Date },
});

module.exports = mongoose.model('payments', PaymentSchema);
