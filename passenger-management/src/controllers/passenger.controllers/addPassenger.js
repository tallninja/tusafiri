const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { StatusCodes: Sc } = require('http-status-codes');

const { Passenger } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

const CreatePasengerSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  username: Joi.string().max(20),
  email: Joi.string(),
  idNo: Joi.number(),
  phoneNumber: Joi.string(),
  password: Joi.string().min(8).max(32),
});

module.exports = (req, res) => {
  CreatePasengerSchema.validateAsync(req.body)
    .then((passengerDetails) => {
      Passenger.findOne({ username: passengerDetails.username }).exec(
        (err, passenger) => {
          if (err) {
            return handleDbError(err, res);
          }

          if (passenger) {
            return res
              .status(Sc.BAD_REQUEST)
              .json({ message: 'Username already taken.' });
          }

          Passenger.findOne({ email: passengerDetails.email }).exec(
            (err, passenger) => {
              if (err) {
                return handleDbError(err, res);
              }

              if (passenger) {
                return res
                  .status(Sc.BAD_REQUEST)
                  .json({ message: 'Account exists.' });
              }

              passengerDetails.createdAt = new Date();
              passengerDetails.password = bcrypt.hashSync(
                passengerDetails.password
              );
              new Passenger(passengerDetails).save((err, passenger) => {
                if (err) {
                  return handleDbError(err, res);
                }

                console.log(
                  'Info:',
                  `Passenger ${passenger.username} was created`
                );
                Passenger.findById(passenger._id, { password: 0 }).exec(
                  (err, newPassenger) => {
                    if (err) {
                      return handleDbError(err, res);
                    }

                    return res.status(Sc.OK).json(newPassenger);
                  }
                );
              });
            }
          );
        }
      );
    })
    .catch((err) => {
      return res.status(Sc.BAD_REQUEST).json(err);
    });
};
