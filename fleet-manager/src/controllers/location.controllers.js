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
    console.log('Info:', `${location.name} was created.`);
    return res.status(Sc.OK).json(location);
  });
};

exports.editLocation = async (req, res) => {
  const { id } = req.params;
  let updatedFields = null;
  try {
    updatedFields = await EditLocationSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(Sc.BAD_REQUEST).json(err);
  }
  Location.findById(id).exec((err, location) => {
    if (err) {
      return handleDbError(err, res);
    }
    if (!location) {
      return res
        .status(Sc.BAD_REQUEST)
        .json({ message: 'Location not found.' });
    }
    location.updateOne({ $set: updatedFields }, (err) => {
      if (err) {
        return handleDbError(err, res);
      }
      console.log('Info:', `${updatedLocation.name} was edited.`);
      Location.findById(id).exec((err, updatedLocation) => {
        if (err) {
          return handleDbError(err, res);
        }
        return res.status(Sc.OK).json(updatedLocation);
      });
    });
  });
};

exports.deleteLocation = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ message: 'Please provide location id.' });
  }
  Location.findById(id).exec((err, location) => {
    if (err) {
      return handleDbError(err, res);
    }
    if (!location) {
      return res
        .status(Sc.BAD_REQUEST)
        .json({ message: 'Location not found.' });
    }
    location.delete((err) => {
      if (err) {
        return handleDbError(err, res);
      }
      console.log('Info:', `${location.name} was deleted.`);
      return res
        .status(Sc.OK)
        .json({ message: `${location.name} was deleted.` });
    });
  });
};

exports.getLocation = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(Sc.BAD_REQUEST).json({
      message: 'Please provide the location id.',
    });
  }
  Location.findById(id).exec((err, location) => {
    if (err) {
      return handleDbError(err, res);
    }
    if (!location) {
      return res
        .status(Sc.BAD_REQUEST)
        .json({ message: 'Location not found.' });
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
