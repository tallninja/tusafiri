const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Location } = require('../../models');

const handleError = require('../../utils/handleError');

const EditLocationSchema = Joi.object({
	name: Joi.string().optional(),
	code: Joi.string().optional(),
	lat: Joi.number().optional(),
	lng: Joi.number().optional(),
});

module.exports = async (req, res) => {
	const { id } = req.params;
	try {
		let updatedFields = await EditLocationSchema.validateAsync(req.body);
		let currentLocation = await Location.findById(id).exec();

		if (!currentLocation) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: 'Location not found.' });
		}

		updatedFields.updatedAt = new Date();

		await currentLocation.updateOne({ $set: updatedFields });
		console.log('Info:', `${currentLocation.name} was updated.`);

		let updatedLocation = await Location.findById(currentLocation._id).exec();

		return res.status(Sc.OK).json(updatedLocation);
	} catch (err) {
		return handleError(err, res);
	}
};
