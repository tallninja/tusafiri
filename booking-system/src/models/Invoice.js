const mongoose = require('mongoose');

const { payments } = require('../../config');
const Journey = require('./Journey');

const InvoiceSchema = new mongoose.Schema({
	booking: {
		type: mongoose.Types.ObjectId,
		ref: 'bookings',
		required: true,
		unique: true,
	},
	amount: { type: Number },
	salesTax: { type: Number },
	totalAmountDue: { type: Number, required: true },
	dueDate: { type: Number, required: true },
	settled: { type: Boolean, default: false },
	createdAt: { type: Date },
	updatedAt: { type: Date },
});

InvoiceSchema.index(
	{ createdAt: 1 },
	{
		expireAfterSeconds: payments.invoiceDue,
		partialFilterExpression: { settled: false },
	}
);

InvoiceSchema.statics.generateInvoice = async function (booking) {
	try {
		const journey = await Journey.findById(booking.journey).exec();

		if (!journey) {
			throw new Error('Journey not found.');
		}

		let amount = journey.fare * booking.seats.length;
		let totalAmountDue = amount + amount * payments.salesTax;
		let dueDate = new Date();
		dueDate.setSeconds(dueDate.getSeconds() + payments.invoiceDue);

		new this({
			booking: booking,
			amount: amount,
			salesTax: payments.salesTax,
			totalAmountDue: totalAmountDue,
			dueDate: dueDate.getTime(),
			createdAt: new Date(),
		}).save((err, invoice) => {
			if (err) {
				throw err;
			}
		});
	} catch (err) {
		throw err;
	}
};

InvoiceSchema.statics.updateInvoice = async function (invoice, booking) {
	try {
		const journey = await Journey.findById(booking.journey).exec();

		if (!journey) {
			throw new Error('Journey not found');
		}

		let amount = journey.fare * booking.seats.length;
		let updatedAmount = amount + amount * payments.salesTax;

		invoice.updateOne(
			{ $set: { totalAmountDue: updatedAmount, updatedAt: new Date() } },
			(err) => {
				if (err) {
					throw err;
				}
			}
		);
	} catch (err) {
		throw err;
	}
};

module.exports = mongoose.model('invoices', InvoiceSchema);
