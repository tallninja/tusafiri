const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
	journey: { type: mongoose.Schema.Types.ObjectId, ref: 'journeys' },
	seat: { type: mongoose.Schema.Types.ObjectId, ref: 'seats' },
	passengerName: { type: String, required: true },
});

module.exports = mongoose.model('tickets', TicketSchema);
