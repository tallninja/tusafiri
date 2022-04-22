const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Route, Location } = require('../../models');

const handleError = require('../../utils/handleError');

const CreateRouteSchema = Joi.object({
	name: Joi.string(),
	from: Joi.string().length(3),
	to: Joi.string().length(3),
});

module.exports = async (req, res) => {
	try {
		let routeDetails = await CreateRouteSchema.validateAsync(req.body);
		let existingRoute = await Route.findOne({ name: routeDetails.name }).exec();

		if (existingRoute) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: `${routeDetails.name} exists.` });
		}

		let from = await Location.findOne({ code: routeDetails.from }).exec();
		let to = await Location.findOne({ code: routeDetails.to }).exec();

		if (!from || !to) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: `Enter valid locations.` });
		}

		routeDetails.from = from._id;
		routeDetails.to = to._id;
		routeDetails.createdAt = new Date();

		let route = await new Route(routeDetails).save();

		console.log('Info:', `${route.name} was created.`);

		let newRoute = await Route.findById(route._id)
			.populate(['from', 'to'])
			.exec();

		return res.status(Sc.OK).json(newRoute);
	} catch (err) {
		return handleError(err, res);
	}
};
