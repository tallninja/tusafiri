const _ = require('lodash');
const mongoose = require('mongoose');

const Invoice = require('./Invoice');
const Journey = require('./Journey');
const Ticket = require('./Ticket');

const BookingSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	journey: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'journeys',
		required: true,
	},
	seats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'seats' }],
	createdAt: { type: Date },
	updatedAt: { type: Date },
	paid: { type: Boolean, default: false },
});

BookingSchema.pre('save', async function (next) {
	try {
		const invoice = await Invoice.findOne({ booking: this._id });
		if (!invoice) {
			Invoice.generateInvoice(this);
		}
		let journey = await Journey.findById(this.journey).exec();
		this.seats.map((seat) => journey.bookedSeats.push(seat));
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
			let bookedSeats = journey.bookedSeats.map((seat) => JSON.stringify(seat));
			// console.log('bookedSeats', bookedSeats);
			let bookingSeats = this.seats.map((seat) => JSON.stringify(seat._id));
			// console.log('bookingSeats', bookingSeats);
			let newBookedSeats = bookedSeats
				.filter((seat) => !bookingSeats.includes(seat))
				.map((seat) => JSON.parse(seat));
			// console.log('newBookedSeats', newBookedSeats);
			await journey.updateOne({ $set: { bookedSeats: newBookedSeats } });
			await Ticket.deleteMany({ booking: this._id }).exec();
			next();
		} catch (err) {
			throw err;
		}
	}
);

module.exports = mongoose.model('bookings', BookingSchema);
