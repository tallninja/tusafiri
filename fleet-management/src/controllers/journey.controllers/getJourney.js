const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Journey } = require('../../models');

const handleError = (err, res) => {
	console.log('Error:', err);
	return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

module.exports = async (req, res) => {
	const { id } = req.params;

	try {
		let journey = await Journey.findById(id)
			.populate(['bus', 'drivers', { path: 'route', populate: ['from', 'to'] }])
			.exec();

		if (!journey) {
			return res.status(Sc.BAD_REQUEST).json({ message: 'Journey not found.' });
		}

		return res.status(Sc.OK).json(journey);
	} catch (err) {
		return handleError(err, res);
	}
};
