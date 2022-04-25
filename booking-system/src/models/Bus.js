const mongoose = require('mongoose');

const Seat = require('./Seat');

const BusSchema = new mongoose.Schema({
	regNo: { type: String },
	make: { type: String },
	yom: { type: Number },
	capacity: { type: Number },
});

module.exports = mongoose.model('buses', BusSchema, 'buses');
