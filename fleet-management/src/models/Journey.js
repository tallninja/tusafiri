const mongoose = require('mongoose');

const BookedSeat = require('./BookedSeat');

const JourneySchema = new mongoose.Schema({
	bus: { type: mongoose.Schema.Types.ObjectId, ref: 'buses', required: true },
	route: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'routes',
		required: true,
	},
	fare: { type: Number, required: true },
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

JourneySchema.pre(
	'deleteOne',
	{ document: true, query: false },
	async function (next) {
		try {
			const { deletedCount } = await BookedSeat.deleteMany({
				journey: this._id,
			});
			console.log(`${deletedCount} booked seats were deleted.`);
			next();
		} catch (err) {
			throw err;
		}
	}
);

module.exports = mongoose.model('journeys', JourneySchema);
