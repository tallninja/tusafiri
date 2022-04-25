const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookedSeatSchema = new Schema({
	seat: { type: Schema.Types.ObjectId, ref: 'seats' },
	booking: { type: Schema.Types.ObjectId, ref: 'bookings' },
	journey: { type: Schema.Types.ObjectId, ref: 'journeys' },
});

module.exports = mongoose.model('BookedSeat', BookedSeatSchema);
