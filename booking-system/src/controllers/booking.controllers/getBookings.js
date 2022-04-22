const { StatusCodes: Sc } = require('http-status-codes');

const { Booking } = require('../../models');

const handleError = require('../../utils/handleError');

module.exports = async (req, res) => {
	try {
		let bookings = await Booking.find({}).populate(['seats']).exec();

		return res.status(Sc.OK).json(bookings);
	} catch (err) {
		return handleError(err, res);
	}
};
