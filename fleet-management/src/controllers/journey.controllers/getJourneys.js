const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Journey } = require('../../models');

const handleError = (err, res) => {
	console.log('Error:', err);
	return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

module.exports = async (req, res) => {
	try {
		let journeys = await Journey.find()
			.populate(['bus', { path: 'route', populate: ['from', 'to'] }, 'drivers'])
			.exec();

		return res
			.status(Sc.OK)

			.json(journeys);
	} catch (err) {
		return handleError(err, res);
	}
};
