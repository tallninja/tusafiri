const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Journey, Bus, Route } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

const EditJourneySchema = Joi.object({
  bus: Joi.string().optional(),
  route: Joi.string().optional(),
  fare: Joi.number().min(50).max(10000).optional(),
  bookedSeats: Joi.array().optional(),
  departureTime: Joi.date().optional(),
});

module.exports = (req, res) => {
  const { id } = req.params;

  EditJourneySchema.validateAsync(req.body)
    .then((updatedFields) => {
      updatedFields.updatedAt = new Date();

      Journey.findById(id).exec(async (err, journey) => {
        if (err) {
          return handleDbError(err, res);
        }

        if (!journey) {
          return res
            .status(Sc.BAD_REQUEST)
            .json({ message: 'Journey not found.' });
        }

        // check given route is valid
        if (updatedFields.route) {
          try {
            let route = await Route.findOne({
              name: updatedFields.route,
            }).exec();

            if (!route) {
              return res
                .status(Sc.BAD_REQUEST)
                .json({ message: `Route not found.` });
            }

            updatedFields.route = route._id;
          } catch (err) {
            return handleDbError(err, res);
          }
        }

        if (updatedFields.bus) {
          // check given bus is valid
          try {
            let bus = await Bus.findOne({ regNo: updatedFields.bus }).exec();

            if (!bus) {
              return res
                .status(Sc.BAD_REQUEST)
                .json({ message: `${updatedFields.bus} not found.` });
            }

            updatedFields.bus = bus._id;
          } catch (err) {
            return handleDbError(err, res);
          }
        }

        journey.updateOne({ $set: updatedFields }, (err) => {
          if (err) {
            return handleDbError(err, res);
          }

          console.log('Info:', `${journey._id} was updated.`);

          Journey.findById(journey._id)
            .populate(['bus', 'route', 'drivers', 'bookedSeats'])
            .exec((err, updatedJourney) => {
              if (err) {
                return handleDbError(err, res);
              }

              return res.status(Sc.OK).json(updatedJourney);
            });
        });
      });
    })
    .catch((err) => {
      return res.status(Sc.BAD_REQUEST).json(err);
    });
};
