const mongoose = require('mongoose');
const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Journey, Bus, Route, Role, Employee, Seat } = require('../../models');

const handleError = require('../../utils/handleError');

const CreateJourneySchema = Joi.object({
	bus: Joi.string(),
	route: Joi.string(),
	fare: Joi.number().min(50).max(10000),
	departureTime: Joi.date(),
	arrivalTime: Joi.date().optional(),
	drivers: Joi.array(),
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

		if (!bus) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: `${journeyDetails.bus} not found.` });
		}

		journeyDetails.bus = bus._id;
		let existingjourney = await Journey.findOne(journeyDetails).exec();

		if (existingjourney) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: 'Journey already exists.' });
		}

		let drivers = await Employee.find({
			employeeId: { $in: journeyDetails.drivers },
		}).exec();

		if (drivers.length !== 2) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: 'Please provide exactly 2 drivers.' });
		}

		journeyDetails.drivers = drivers.map((driver) => driver._id);

		// initialize the number of available seats
		journeyDetails.availableSeats = bus.capacity - 2;

		journeyDetails.createdAt = new Date();
		let newJourney = await new Journey(journeyDetails).save();

		console.log('Info:', `Journey ${newJourney._id} was created.`);

		let createdJourney = await Journey.findById(newJourney._id)
			.populate(['bus', { path: 'route', populate: ['from', 'to'] }])
			.exec();

		return res.status(Sc.OK).json(createdJourney);
	} catch (err) {
		return handleError(err, res);
	}
};
