const { StatusCodes: Sc } = require('http-status-codes');

const { Journey, Route } = require('../../models');

const handleError = require('../../utils/handleError');

module.exports = async (req, res) => {
	const { route } = req.query;

	if (!route) {
		return res
			.status(Sc.BAD_REQUEST)
			.json({ message: 'Please provide the route name.' });
	}

	try {
		let availableRoute = await Route.findOne({ name: route });

		if (!availableRoute) {
			return res.status(Sc.BAD_REQUEST).json({ message: 'Route not found.' });
		}

		let journeys = await Journey.find({
			route: availableRoute._id,
			availableSeats: { $gt: 0 },
			drivers: { $size: 2 }, // https://stackoverflow.com/questions/31677061/mongoose-find-all-documents-where-array-length-is-greater-than-0-sort-the-data
		}).exec();

		return res.status(Sc.OK).json(journeys);
	} catch (err) {
		return handleError(err, res);
	}
};
