const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Journey, Bus, Route } = require('../../models');

const handleError = (err, res) => {
	console.log('Error:', err);
	return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

const EditJourneySchema = Joi.object({
	bus: Joi.string().optional(),
	route: Joi.string().optional(),
	fare: Joi.number().min(50).max(10000).optional(),
	bookedSeats: Joi.array().optional(),
	departureTime: Joi.date().optional(),
	arrivalTime: Joi.date().optional(),
	driver: Joi.array().optional(),
});

module.exports = async (req, res) => {
	const { id } = req.query;

	if (!id) {
		return res
			.status(Sc.BAD_REQUEST)
			.json({ message: 'Please provide the journey id.' });
	}

	try {
		let updatedFields = await EditJourneySchema.validateAsync(req.body);

		if (updatedFields.route) {
			let route = await Route.findOne({
				name: updatedFields.route,
			}).exec();

			if (!route) {
				return res.status(Sc.BAD_REQUEST).json({ message: `Route not found.` });
			}

			updatedFields.route = route._id;
		}

		if (updatedFields.bus) {
			let bus = await Bus.findOne({ regNo: updatedFields.bus }).exec();

			if (!bus) {
				return res
					.status(Sc.BAD_REQUEST)
					.json({ message: `${updatedFields.bus} not found.` });
			}

			updatedFields.bus = bus._id;
		}

		let currentJourney = await Journey.findById(id).exec();

		if (!currentJourney) {
			return res.status(Sc.BAD_REQUEST).json({ message: 'Journey not found.' });
		}

		updatedFields.updatedAt = new Date();

		await currentJourney.updateOne({ $set: updatedFields });
		console.log('Info:', `${currentJourney._id} was updated.`);

		let updatedJourney = await Journey.findById(currentJourney._id)
			.populate(['bus', 'route', 'drivers', 'bookedSeats'])
			.exec();

		return res.status(Sc.OK).json(updatedJourney);
	} catch (err) {
		return handleError(err, res);
	}
};
