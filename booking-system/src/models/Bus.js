const mongoose = require('mongoose');

const Seat = require('./Seat');

const BusSchema = new mongoose.Schema({
	regNo: { type: String },
	make: { type: String },
	yom: { type: Number },
	capacity: { type: Number },
	seats: [{ type: mongoose.Schema.Types.ObjectId }],
});

module.exports = mongoose.model('buses', BusSchema, 'buses');
