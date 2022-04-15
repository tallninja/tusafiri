const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookedSeatSchema = new Schema(
	{
		seat: { type: Schema.Types.ObjectId },
		journey: { type: Schema.Types.ObjectId },
	},
	{ collection: 'bookedseats' }
);

module.exports = mongoose.model('BookedSeat', BookedSeatSchema);
