const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Payment, Invoice, Booking, User } = require('../models');

const handleError = (err, res) => {
	console.log('Error:', err);
	return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

const PaymentSchema = Joi.object({
	amount: Joi.number(),
	accountNo: Joi.string(),
});

exports.createPayment = async (req, res) => {
	try {
		const paymentDetails = await PaymentSchema.validateAsync(req.body);
		const user = await User.findOne({
			phoneNo: paymentDetails.accountNo,
		}).exec();

		if (!user) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: 'Invalid account no.' });
		}

		paymentDetails.user = user._id;
		const invoice = await Invoice.findOne({
			user: user._id,
			settled: false,
		}).exec();

		if (!invoice) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: 'Invoice does not exist.' });
		}

		paymentDetails.invoice = invoice._id;
		if (paymentDetails.amount !== invoice.totalAmountDue) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: 'Please pay the required amoint.' });
		}

		const booking = await Booking.findById(invoice.booking).exec();
		if (!booking) {
			return res.status(Sc.BAD_REQUEST).json({ message: 'Booking not found.' });
		}

		const newPayment = await new Payment(paymentDetails).save();
		console.log('Info:', `Payment ${newPayment._id} was made.`);

		await invoice.updateOne({ $set: { settled: true } });
		await booking.updateOne({ $set: { paid: true } });

		return res.status(Sc.OK).json(newPayment);
	} catch (err) {
		return handleError(err, res);
	}
};

exports.getPayment = async (req, res) => {
	const { id } = req.params;
	try {
		const payment = await Payment.findById(id)
			.populate([{ path: 'booking', populate: ['journey', 'seats'] }])
			.exec();
		return res.status(Sc.OK).json(payment);
	} catch (err) {
		return handleError(err, res);
	}
};

exports.getPayments = async (req, res) => {
	try {
		let payments = await Payment.find({}).exec();

		return res.status(Sc.OK).json(payments);
	} catch (err) {
		return handleError(err, res);
	}
};
