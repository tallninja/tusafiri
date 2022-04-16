const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookedSeatSchema = new Schema({
	seat: { type: Schema.Types.ObjectId, ref: 'seats', required: true },
	user: { type: Schema.Types.ObjectId, ref: 'users' },
	booking: { type: Schema.Types.ObjectId, ref: 'bookings', required: true },
	journey: { type: Schema.Types.ObjectId, ref: 'journeys', required: true },
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BookedSeat', BookedSeatSchema);
