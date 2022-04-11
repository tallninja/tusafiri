const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
	journey: { type: mongoose.Schema.Types.ObjectId, ref: 'journeys' },
	booking: { type: mongoose.Schema.Types.ObjectId, ref: 'bookings' },
	seat: { type: mongoose.Schema.Types.ObjectId, ref: 'seats' },
	passengerName: { type: String, required: true },
});

module.exports = mongoose.model('tickets', TicketSchema);
