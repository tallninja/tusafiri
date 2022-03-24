const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Journey, Bus, Route } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

const CreateJourneySchema = Joi.object({
  bus: Joi.string(),
  route: Joi.string(),
  fare: Joi.number().min(50).max(10000),
  departureTime: Joi.date(),
});

module.exports = (req, res) => {
  CreateJourneySchema.validateAsync(req.body)
    .then((journeyDetails) => {
      // check given route is valid
      Route.findOne({ name: journeyDetails.route }).exec((err, route) => {
        if (err) {
          return handleDbError(err, res);
        }

        if (!route) {
          return res
            .status(Sc.BAD_REQUEST)
            .json({ message: `${journeyDetails.route} route not found.` });
        }

        journeyDetails.route = route._id;

        // check given bus is valid
        Bus.findOne({ regNo: journeyDetails.bus }).exec((err, bus) => {
          if (err) {
            return handleDbError(err, res);
          }

          if (!bus) {
            return res
              .status(Sc.BAD_REQUEST)
              .json({ message: `${journeyDetails.bus} not found.` });
          }

          journeyDetails.bus = bus._id;

          // check if there is a similar journey
          Journey.findOne(journeyDetails).exec((err, journey) => {
            if (err) {
              return handleDbError(err, res);
            }

            if (journey) {
              return res
                .status(Sc.BAD_REQUEST)
                .json({ message: 'Journey already exists.' });
            }

            journeyDetails.createdAt = new Date();

            new Journey(journeyDetails).save((err, journey) => {
              if (err) {
                return handleDbError(err, res);
              }

              console.log('Info:', `Journey ${journey._id} was created.`);

              Journey.findById(journey._id)
                .populate(['bus', 'route'])
                .exec((err, newJourney) => {
                  if (err) {
                    return handleDbError(err, res);
                  }

                  return res.status(Sc.OK).json(newJourney);
                });
            });
          });
        });
      });
    })
    .catch((err) => {
      return res.status(Sc.BAD_REQUEST).json(err);
    });
};
