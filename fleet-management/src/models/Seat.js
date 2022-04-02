const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema({
	number: { type: Number, required: true },
	bus: { type: mongoose.Schema.Types.ObjectId, ref: 'buses' },
});

module.exports = mongoose.model('seats', SeatSchema);
