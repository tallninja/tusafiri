const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Location } = require('../models');

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

const EditLocationSchema = Joi.object({
  name: Joi.string().optional(),
  code: Joi.string().optional(),
  lat: Joi.number().optional(),
  lng: Joi.number().optional(),
});

exports.addLocation = async (req, res) => {
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
    return res.status(Sc.OK).json({ message: `${location.name} added.` });
  });
};

exports.editLocation = async (req, res) => {
  const { id } = req.query;
  let data = null;
  try {
    data = await EditLocationSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(Sc.BAD_REQUEST).json(err);
  }
  Location.findByIdAndUpdate(id, data).exec((err, location) => {
    if (err) {
      return handleDbError(err, res);
    }
    return res.status(Sc.OK).json({ message: `${location.name} edited.` });
  });
};

exports.deleteLocation = (req, res) => {
  const { id } = req.query;
  if (!location_id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ message: 'Please provide location_id in the URL parameters.' });
  }
  Location.findByIdAndDelete(location_id).exec((err, location) => {
    if (err) {
      return handleDbError(err, res);
    }
    return res.status(Sc.OK).json({ message: `${location} deleted.` });
  });
};

exports.getLocation = (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(Sc.BAD_REQUEST).json({
      message: 'Please provide the location id in the URL parameters.',
    });
  }
  Location.findById(id).exec((err, location) => {
    if (err) {
      return handleDbError(err, res);
    }
    return res.status(Sc.OK).json(location);
  });
};

exports.getLocations = (req, res) => {
  Location.find().exec((err, locations) => {
    if (err) {
      return handleDbError(err, res);
    }
    return res.status(Sc.OK).json(locations);
  });
};
