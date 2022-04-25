const mongoose = require('mongoose');

const JourneySchema = new mongoose.Schema({
	_id: { type: mongoose.Schema.Types.ObjectId },
	bus: { type: mongoose.Schema.Types.ObjectId },
	bus: { type: mongoose.Schema.Types.ObjectId },
	route: { type: mongoose.Schema.Types.ObjectId },
	drivers: [{ type: mongoose.Schema.Types.ObjectId }],
	fare: { type: Number },
	availableSeats: Number,
	departureTime: { type: Date },
	arrivalTime: { type: Date },
	completed: { type: Boolean },
	createdAt: { type: Date },
	updatedAt: { type: Date },
});

module.exports = mongoose.model('journeys', JourneySchema, 'journeys');
