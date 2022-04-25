const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema({
	number: { type: Number },
	bus: { type: mongoose.Schema.Types.ObjectId },
});

module.exports = mongoose.model('seats', SeatSchema, 'seats');
