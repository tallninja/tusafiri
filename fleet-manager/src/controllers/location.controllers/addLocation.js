const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Location } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

const CreateLocationSchema = Joi.object({
  name: Joi.string(),
  code: Joi.string(),
  lat: Joi.number(),
  lng: Joi.number(),
});

module.exports = async (req, res) => {
  let locationDetails = null;
  try {
    locationDetails = await CreateLocationSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(Sc.BAD_REQUEST).json(err);
  }
  new Location(locationDetails).save((err, location) => {
    if (err) {
      return handleDbError(err, res);
    }
    console.log('Info:', `${location.name} was created.`);
    return res.status(Sc.OK).json(location);
  });
};
