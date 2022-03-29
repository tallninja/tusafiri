const { StatusCodes: Sc } = require('http-status-codes');

const { Invoice, Booking } = require('../models');

const handleError = (err, res) => {
	console.log('Error:', err);
	return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

exports.getInvoices = async (req, res) => {
	try {
		let invoices = await Invoice.find({}).exec();

		return res.status(Sc.OK).json(invoices);
	} catch (err) {
		return handleError(err, res);
	}
};

exports.deleteInvoice = async (req, res) => {
	const { id } = req.query;

	try {
		let invoice = await Invoice.findById(id).populate(['booking']).exec();

		if (!invoice) {
			return res.status(Sc.BAD_REQUEST).json({ message: 'Invoice not found.' });
		}

		await invoice.deleteOne();

		console.log('Info:', `Invoice ${invoice._id} was deleted.`);

		let booking = await Booking.findById(invoice.booking).exec();

		if (booking) {
			await booking.deleteOne();
			console.log('Info:', `Booking ${booking._id} was deleted.`);
		}

		return res.status(Sc.OK).json(invoice);
	} catch (err) {
		return handleError(err, res);
	}
};
