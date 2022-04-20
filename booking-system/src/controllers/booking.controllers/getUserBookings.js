const { StatusCodes: Sc } = require('http-status-codes');

const { Booking } = require('../../models');

const handleError = (err, res) => {
	console.log('Error:', err);
	return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

module.exports = async (req, res) => {
	const user = req.headers['x-user'];
	try {
		const userBookings = await Booking.find({ user })
			.populate(['journey'])
			.exec();
		return res.status(Sc.OK).json(userBookings);
	} catch (err) {
		return handleError(err, res);
	}
};
