const mongoose = require('mongoose');

const Journey = require('./Journey');
const Booking = require('./Booking');

const TicketSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	journey: { type: mongoose.Schema.Types.ObjectId, ref: 'journeys' },
	booking: { type: mongoose.Schema.Types.ObjectId, ref: 'bookings' },
	seat: { type: mongoose.Schema.Types.ObjectId, ref: 'seats' },
	passengerName: { type: String, required: true },
	passengerPhone: { type: String },
	validUntil: { type: Date },
	createdAt: { type: Date, default: Date.now },
});

TicketSchema.pre(
	'deleteOne',
	{ document: true, query: false },
	async function (next) {
		try {
			let journey = await Journey.findById(this.journey).exec();
			let newBookedSeats = journey.bookedSeats.filter(
				(seat) => seat !== this.seat
			);
			await journey.updateOne({ $set: { bookedSeats: newBookedSeats } });
			next();
		} catch (err) {
			throw err;
		}
	}
);

module.exports = mongoose.model('tickets', TicketSchema);
