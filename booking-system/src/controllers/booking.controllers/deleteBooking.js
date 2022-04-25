const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Booking, Invoice } = require('../../models');

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

		await booking.deleteOne();

		console.log('Info:', `Booking ${booking._id} was deleted.`);

		let invoice = await Invoice.findOne({
			booking: booking._id,
		}).exec();

		if (invoice) {
			await invoice.deleteOne();
			console.log('Info:', `Invoice ${invoice._id} was deleted.`);
		}

		return res.status(Sc.OK).json(booking);
	} catch (err) {
		return handleError(err, res);
	}
};
