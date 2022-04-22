const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Journey } = require('../../models');

const handleError = require('../../utils/handleError');

module.exports = async (req, res) => {
	const { id } = req.params;
	try {
		let journey = await Journey.findById(id)
			.populate(['bus', { path: 'route', populate: ['from', 'to'] }])
			.exec();

		if (!journey) {
			return res.status(Sc.BAD_REQUEST).json({ message: 'Journey not found.' });
		}

		await journey.deleteOne();
		console.log('Info:', `Journey ${journey._id} was deleted.`);

		return res.status(Sc.OK).json(journey);
	} catch (err) {
		return handleError(err, res);
	}
};
