const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { StatusCodes: Sc } = require('http-status-codes');

const { Passenger } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

const ChangePaswordSchema = Joi.object({
  oldPassword: Joi.string(),
  newPassword: Joi.string(),
});

module.exports = (req, res) => {
  const { passenger_id } = req.query;

  if (!passenger_id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ mmesage: 'Please provide passenger id.' });
  }

  ChangePaswordSchema.validateAsync(req.body)
    .then(({ oldPassword, newPassword }) => {
      Passenger.findById(passenger_id).exec((err, passenger) => {
        if (err) {
          return handleDbError(err, res);
        }

        if (!passenger) {
          return res
            .status(Sc.BAD_REQUEST)
            .json({ message: 'Passenger not found.' });
        }

        let oldPasswordIsValid = bcrypt.compareSync(
          oldPassword,
          passenger.password
        );

        if (!oldPasswordIsValid) {
          return res
            .status(Sc.BAD_REQUEST)
            .json({ message: 'Old password is invalid.' });
        }

        passenger.updateOne(
          {
            $set: {
              password: bcrypt.hashSync(newPassword),
              updatedAt: new Date(),
            },
          },
          (err) => {
            if (err) {
              return handleDbError(err, res);
            }

            Passenger.findById(passenger._id, { password: 0 }).exec(
              (err, updatedPassenger) => {
                if (err) {
                  return handleDbError(err, res);
                }

                return res.status(Sc.OK).json(updatedPassenger);
              }
            );
          }
        );
      });
    })
    .catch((err) => {
      return res.status(Sc.BAD_REQUEST).json(err);
    });
};
