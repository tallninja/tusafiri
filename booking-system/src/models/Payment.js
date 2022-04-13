const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
	invoice: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'invoices',
		required: true,
	},
	amountPaid: { type: Number, required: true },
	mpesaTxnCode: { type: String },
	date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('payments', PaymentSchema);
