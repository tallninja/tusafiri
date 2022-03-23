const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Passenger } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

const EditPasengerSchema = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  username: Joi.string().max(20).optional(),
  email: Joi.string().optional(),
  idNo: Joi.number().optional(),
  phoneNumber: Joi.string().optional(),
});

module.exports = (req, res) => {
  const { id } = req.params;

  EditPasengerSchema.validateAsync(req.body)
    .then((updatedFields) => {
      Passenger.findById(id).exec((err, passenger) => {
        if (err) {
          return handleDbError(err, res);
        }

        if (!passenger) {
          return res
            .status(Sc.BAD_REQUEST)
            .json({ message: 'Passenger not found.' });
        }

        updatedFields.updatedAt = new Date();
        passenger.updateOne({ $set: updatedFields }, (err) => {
          if (err) {
            return handleDbError(err, res);
          }

          console.log('Info:', `${passenger.username} was updated.`);
          Passenger.findById(passenger._id, { password: 0 }).exec(
            (err, updatedPassenger) => {
              if (err) {
                return handleDbError(err, res);
              }
              return res.status(Sc.OK).json(updatedPassenger);
            }
          );
        });
      });
    })
    .catch((err) => {
      return res.status(Sc.BAD_REQUEST).json(err);
    });
};
