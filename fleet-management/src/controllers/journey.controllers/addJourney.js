const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Journey, Bus, Route } = require('../../models');

const handleError = (err, res) => {
	console.log('Error:', err);
	return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

const CreateJourneySchema = Joi.object({
	bus: Joi.string(),
	route: Joi.string(),
	fare: Joi.number().min(50).max(10000),
	departureTime: Joi.date(),
	arrivalTime: Joi.date().optional(),
});

module.exports = async (req, res) => {
	try {
		let journeyDetails = await CreateJourneySchema.validateAsync(req.body);

		let route = await Route.findOne({ name: journeyDetails.route }).exec();

		if (!route) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: `${journeyDetails.route} route not found.` });
		}

		journeyDetails.route = route._id;
		let bus = await Bus.findOne({ regNo: journeyDetails.bus }).exec();
		let existingJourneys = await Journey.find({ completed: false });

		if (!bus) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: `${journeyDetails.bus} not found.` });
		}

		let unavailableBuses = existingJourneys.map((journey) =>
			JSON.stringify(journey.bus)
		);
		if (unavailableBuses.includes(JSON.stringify(bus._id))) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: 'Bus already assigned another journey.' });
		}

		journeyDetails.bus = bus._id;
		let existingjourney = await Journey.findOne(journeyDetails).exec();

		if (existingjourney) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: 'Journey already exists.' });
		}

		journeyDetails.createdAt = new Date();
		let newJourney = await new Journey(journeyDetails).save();

		console.log('Info:', `Journey ${newJourney._id} was created.`);

		let createdJourney = await Journey.findById(newJourney._id)
			.populate(['bus', 'route'])
			.exec();

		return res.status(Sc.OK).json(createdJourney);
	} catch (err) {
		return handleError(err, res);
	}
};
