const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  journey: { type: mongoose.Types.ObjectId, ref: 'journeys' },
  seat: { type: mongoose.Types.ObjectId, ref: 'seats' },
  passengerName: { type: String, required: true },
});

module.exports = mongoose.model('tickets', TicketSchema);
