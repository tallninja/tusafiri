const mongoose = require('mongoose');

const { payments } = require('../../config');
const Journey = require('./Journey');

const InvoiceSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	booking: {
		type: mongoose.Schema.Types.ObjectId,
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

		await new this({
			user: booking.user,
			booking: booking._id,
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

const InvoiceModel = mongoose.model('invoices', InvoiceSchema);

(async () => {
	try {
		let indexes = await InvoiceModel.collection.getIndexes();
		let createdAtIndex = Object.keys(indexes).find(
			(indexName) => indexName === 'createdAt_1'
		);

		if (createdAtIndex) {
			await InvoiceModel.collection.dropIndex(createdAtIndex);
		}

		await InvoiceModel.collection.createIndex(
			{ createdAt: 1 },
			{
				expireAfterSeconds: payments.invoiceDue,
				partialFilterExpression: { settled: false },
			}
		);
	} catch (err) {
		console.log('Error:', err);
	}
})();

module.exports = InvoiceModel;
