const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const Bus = require('./Bus');

const JourneySchema = new mongoose.Schema({
	bus: { type: mongoose.Schema.Types.ObjectId },
	route: { type: mongoose.Schema.Types.ObjectId },
	fare: { type: Number },
	bookedSeats: [{ type: mongoose.Schema.Types.ObjectId }],
	availableSeats: Number,
	seats: [{ type: mongoose.Schema.Types.ObjectId }],
	drivers: [{ type: mongoose.Schema.Types.ObjectId }],
	departureTime: { type: Date },
	arrivalTime: { type: Date },
	completed: { type: Boolean },
	createdAt: { type: Date },
	updatedAt: { type: Date },
});

JourneySchema.pre('save', async function (next) {
	try {
		let bus = await Bus.findById(this.bus).exec();
		this.availableSeats = bus.capacity - this.bookedSeats.length - 2;
		next();
	} catch (err) {
		throw err;
	}
});

module.exports = mongoose.model('journeys', JourneySchema, 'journeys');
