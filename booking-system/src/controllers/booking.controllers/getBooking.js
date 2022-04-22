const { StatusCodes: Sc } = require('http-status-codes');

const { Booking } = require('../../models');

const handleError = require('../../utils/handleError');

module.exports = async (req, res) => {
	const { id } = req.params;

	try {
		let booking = await Booking.findById(id)
			.populate(['journey', 'seats'])
			.exec();

		if (!booking) {
			return res.status(Sc.BAD_REQUEST).json({ message: 'Booking not found.' });
		}

		return res.status(Sc.OK).json(booking);
	} catch (err) {
		return handleError(err, res);
	}
};
