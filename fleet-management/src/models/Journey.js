const mongoose = require('mongoose');

const Bus = require('./Bus');

const JourneySchema = new mongoose.Schema({
	bus: { type: mongoose.Schema.Types.ObjectId, ref: 'buses', required: true },
	route: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'routes',
		required: true,
	},
	fare: { type: Number, required: true },
	bookedSeats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'seats' }],
	availableSeats: { type: Number },
	drivers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'employees' }], // for safety purposes every journey should have at least 2 drivers.
	departureTime: { type: Date, required: true },
	arrivalTime: { type: Date },
	completed: { type: Boolean, default: false },
	createdAt: { type: Date },
	updatedAt: { type: Date },
});

JourneySchema.pre('validate', (next) => {
	if (this.drivers) {
		if (this.drivers.length != 2) {
			throw 'Journey should have at least 2 drivers';
		}
		next();
	} else {
		next();
	}
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

JourneySchema.post('updateOne', async function () {
	try {
		let journey = await this.model
			.findOne(this.getQuery())
			.populate(['bus'])
			.exec();
		journey.availableSeats =
			journey.bus.capacity - journey.bookedSeats.length - 2;
		await journey.save();
	} catch (err) {
		throw err;
	}
});

module.exports = mongoose.model('journeys', JourneySchema);
