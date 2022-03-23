const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Journey, Bus, Route, Seat } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

const EditJourneySchema = Joi.object({
  bus: Joi.string().optional(),
  route: Joi.string().optional(),
  fare: Joi.number().min(50).max(10000).optional(),
  departureTime: Joi.date().optional(),
});

module.exports = (req, res) => {
  const { id } = req.params;

  EditJourneySchema.validateAsync(req.body)
    .then((updatedFields) => {
      // check given route is valid
      Route.findOne({ name: updatedFields.route }).exec((err, route) => {
        if (err) {
          return handleDbError(err, res);
        }

        if (!route) {
          return res
            .status(Sc.BAD_REQUEST)
            .json({ message: `${updatedFields.route} route not found.` });
        }

        updatedFields.route = route._id;

        // check given bus is valid
        Bus.findOne({ regNo: updatedFields.bus }).exec((err, bus) => {
          if (err) {
            return handleDbError(err, res);
          }

          if (!bus) {
            return res
              .status(Sc.BAD_REQUEST)
              .json({ message: `${updatedFields.bus} not found.` });
          }

          updatedFields.bus = bus._id;
          updatedFields.updatedAt = new Date();

          Journey.findById(id).exec((err, journey) => {
            if (err) {
              return handleDbError(err, res);
            }

            if (!journey) {
              return res
                .status(Sc.BAD_REQUEST)
                .json({ message: 'Journey not found.' });
            }

            if (JSON.stringify(journey.bus) !== JSON.stringify(bus._id)) {
              Seat.find({ bus: bus._id }).exec((err, seats) => {
                if (err) {
                  return handleDbError(err, res);
                }

                updatedFields.seats = seats.map((seat) => seat._id);

                journey.updateOne({ $set: updatedFields }, (err) => {
                  if (err) {
                    return handleDbError(err, res);
                  }

                  console.log('Info:', `${journey._id} was updated.`);

                  Journey.findById(journey._id).exec((err, updatedJourney) => {
                    if (err) {
                      return handleDbError(err, res);
                    }

                    return res.status(Sc.OK).json(updatedJourney);
                  });
                });
              });
            } else {
              journey.updateOne({ $set: updatedFields }, (err) => {
                if (err) {
                  return handleDbError(err, res);
                }

                console.log('Info:', `${journey._id} was updated.`);

                Journey.findById(journey._id).exec((err, updatedJourney) => {
                  if (err) {
                    return handleDbError(err, res);
                  }

                  return res.status(Sc.OK).json(updatedJourney);
                });
              });
            }
          });
        });
      });
    })
    .catch((err) => {
      return res.status(Sc.BAD_REQUEST).json(err);
    });
};
