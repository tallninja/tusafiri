const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Location } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

const EditLocationSchema = Joi.object({
  name: Joi.string().optional(),
  code: Joi.string().optional(),
  lat: Joi.number().optional(),
  lng: Joi.number().optional(),
});

module.exports = (req, res) => {
  const { id } = req.params;

  EditLocationSchema.validateAsync(req.body)
    .then((updatedFields) => {
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
          console.log('Info:', `${location.name} was edited.`);
          Location.findById(id).exec((err, updatedLocation) => {
            if (err) {
              return handleDbError(err, res);
            }
            return res.status(Sc.OK).json(updatedLocation);
          });
        });
      });
    })
    .catch((err) => {
      return res.status(Sc.BAD_REQUEST).json(err);
    });
};
