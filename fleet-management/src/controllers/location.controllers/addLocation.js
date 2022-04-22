const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Location } = require('../../models');

const handleError = require('../../utils/handleError');

const CreateLocationSchema = Joi.object({
	name: Joi.string(),
	code: Joi.string(),
	lat: Joi.number(),
	lng: Joi.number(),
});

module.exports = async (req, res) => {
	try {
		let locationDetails = await CreateLocationSchema.validateAsync(req.body);
		locationDetails.createdAt = new Date();

		let existingLocation = await Location.findOne({
			name: locationDetails.name,
		}).exec();

		if (existingLocation) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: `${locationDetails.name} already exists.` });
		}

		existingLocation = await Location.findOne({
			code: locationDetails.code,
		}).exec();

		if (existingLocation) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: `${locationDetails.code} already exists.` });
		}

		let newLocation = await new Location(locationDetails).save();
		console.log('Info:', `${newLocation.name} was created.`);

		return res.status(Sc.OK).json(newLocation);
	} catch (err) {
		return handleError(err, res);
	}
};
