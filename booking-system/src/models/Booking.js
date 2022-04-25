const _ = require('lodash');
const mongoose = require('mongoose');

const Invoice = require('./Invoice');
const Journey = require('./Journey');
const Ticket = require('./Ticket');
const BookedSeat = require('./BookedSeat');

const BookingSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	journey: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'journeys',
		required: true,
	},
	seats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'seats' }],
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date },
	paid: { type: Boolean, default: false },
});

BookingSchema.pre('save', async function (next) {
	try {
		const { seats, user } = this.$__.saveOptions;
		let booking = this;

		let journey = await Journey.findById(booking.journey).exec();

		// Adds booked seat to the DB
		seats.forEach(async function (seat) {
			const bookedSeat = await new BookedSeat({
				seat: seat,
				user: user,
				booking: booking._id,
				journey: booking.journey,
			}).save();
			console.log(`Booked Seat ${bookedSeat._id} was created.`);
		});

		// checks if invoice already exists and if not it generates a new invoice.
		const invoice = await Invoice.findOne({ booking: booking._id });
		if (!invoice) {
			await Invoice.generateInvoice(booking);
		}

		console.log('Invoice Generated');

		// calculates the vailable seats
		let availableSeats = journey.availableSeats - seats.length;
		await journey.updateOne({ $set: { availableSeats: availableSeats } });

		next();
	} catch (err) {
		throw err;
	}
});

BookingSchema.pre(
	'deleteOne',
	{ document: true, query: false },
	async function (next) {
		try {
			const journey = await Journey.findById(this.journey).exec();

			if (journey) {
				const { deletedCount } = await BookedSeat.deleteMany({
					booking: this._id,
					journey: journey._id,
				}).exec();
				const availableSeats = journey.availableSeats + deletedCount;
				await journey.updateOne({ $set: { availableSeats: availableSeats } });
			}

			await Ticket.deleteMany({ booking: this._id }).exec();
			next();
		} catch (err) {
			throw err;
		}
	}
);

module.exports = mongoose.model('bookings', BookingSchema);
