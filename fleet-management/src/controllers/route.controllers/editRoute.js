const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Route, Location } = require('../../models');

const handleError = require('../../utils/handleError');

const EditRouteSchema = Joi.object({
	name: Joi.string().optional(),
	from: Joi.string().length(3).optional(),
	to: Joi.string().length(3).optional(),
});

module.exports = async (req, res) => {
	const { id } = req.params;
	try {
		let updatedFields = await EditRouteSchema.validateAsync(req.body);

		if (updatedFields.from) {
			let location = await Location.findOne({
				code: updatedFields.from,
			}).exec();

			if (!location) {
				return res
					.status(Sc.BAD_REQUEST)
					.json({ message: `${updatedFields.from} not found.` });
			}

			updatedFields.from = location._id;
		}

		if (updatedFields.to) {
			let location = await Location.findOne({ code: updatedFields.to }).exec();

			if (!location) {
				return res
					.status(Sc.BAD_REQUEST)
					.json({ message: `${updatedFields.from} not found.` });
			}

			updatedFields.to = location._id;
		}

		if (updatedFields.name) {
			let existingRoute = await Route.findOne({
				name: updatedFields.name,
			}).exec();

			if (existingRoute) {
				return res
					.status(Sc.BAD_REQUEST)
					.json({ message: `${existingRoute.name} exists.` });
			}
		}

		let currentRoute = await Route.findById(id).exec();

		if (!currentRoute) {
			return res.status(Sc.BAD_REQUEST).json({ message: 'Route not found' });
		}

		updatedFields.updatedAt = new Date();

		await currentRoute.updateOne({ $set: updatedFields });
		console.log('Info:', `${currentRoute.name} was updated.`);

		let updatedRoute = await Route.findById(currentRoute._id)
			.populate(['from', 'to'])
			.exec();

		return res.status(Sc.OK).json(updatedRoute);
	} catch (err) {
		return handleError(err, res);
	}
};
