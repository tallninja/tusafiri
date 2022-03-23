const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Journey, Employee, Role } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

const SetDriversSchema = Joi.object({
  drivers: Joi.array().length(2),
});

module.exports = (req, res) => {
  const { journey_id } = req.params;

  SetDriversSchema.validateAsync(req.body)
    .then(({ drivers }) => {
      Journey.findById(id).exec((err, journey) => {
        if (err) {
          return handleDbError(err, res);
        }

        if (!journey) {
          return res
            .status(Sc.BAD_REQUEST)
            .json({ message: 'Journey not found.' });
        }

        Role.find({ name: 'driver' }).exec((err, role) => {
          if (err) {
            return handleDbError(err, res);
          }

          Employee.find({
            role: role._id,
            employeeId: { $in: drivers },
          }).exec((err, drivers) => {
            if (err) {
              return handleDbError(err, res);
            }

            journey.updateOne(
              { $set: { drivers: drivers, updatedAt: new Date() } },
              (err) => {
                if (err) {
                  return handleDbError(err, res);
                }

                Journey.findById(journey._id)
                  .populate(['bus', 'route', 'seats', 'drivers'])
                  .exec((err, newJourney) => {
                    if (err) {
                      return handleDbError(err, res);
                    }

                    return res.status(Sc.OK).json(newJourney);
                  });
              }
            );
          });
        });
      });
    })
    .catch((err) => {
      return res.status(Sc.BAD_REQUEST).json(err);
    });
};
