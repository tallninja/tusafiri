const Joi = require('joi');
const { StatusCodes: Sc, METHOD_FAILURE } = require('http-status-codes');

const { Journey, Route, Location } = require('../../models');

const handleError = (err, res) => {
	console.log('Error:', err);
	return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

const SearchSchema = Joi.object({
	from: Joi.string().length(3),
	to: Joi.string().length(3),
	date: Joi.string().isoDate(),
});

module.exports = async (req, res) => {
	try {
		const searchDetails = await SearchSchema.validateAsync(req.query);
		searchDetails.date = new Date(searchDetails.date);
		const nextDate = new Date().setDate(searchDetails.date.getDate() + 1);

		const from = await Location.findOne({ code: searchDetails.from }).exec();
		const to = await Location.findOne({ code: searchDetails.to }).exec();

		if (!from || !to || JSON.stringify(from._id) === JSON.stringify(to._id)) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: 'Please enter valid locations.' });
		}

		const route = await Route.findOne({ from: from._id, to: to._id }).exec();

		if (!route) {
			return res.status(Sc.OK).json([]);
		}

		const journeys = await Journey.find({
			route: route._id,
			departureTime: { $gte: searchDetails.date, $lt: nextDate },
			availableSeats: { $gt: 0 },
		})
			.populate(['route', 'bus', 'drivers', 'bookedSeats'])
			.exec();

		return res.status(Sc.OK).json(journeys);
	} catch (err) {
		handleError(err, res);
	}
};
