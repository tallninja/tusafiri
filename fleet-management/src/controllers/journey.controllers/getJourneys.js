const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Journey } = require('../../models');

const handleError = require('../../utils/handleError');

module.exports = async (req, res) => {
	const { count } = req.query;
	try {
		const journeys = await Journey.find()
			.populate(['bus', { path: 'route', populate: ['from', 'to'] }, 'drivers'])
			.exec();

		if (count) {
			return res.status(Sc.OK).json({ count: journeys.length });
		}

		return res
			.status(Sc.OK)

			.json(journeys);
	} catch (err) {
		return handleError(err, res);
	}
};
