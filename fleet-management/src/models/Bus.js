const mongoose = require('mongoose');

const Seat = require('./Seat');

const BusSchema = new mongoose.Schema({
	regNo: { type: String, unique: true, required: true, index: true },
	make: { type: String },
	yom: { type: Number },
	capacity: { type: Number, required: true, min: 3, max: 100 },
	createdAt: { type: Date },
	updatedAt: { type: Date },
});

module.exports = mongoose.model('buses', BusSchema);
