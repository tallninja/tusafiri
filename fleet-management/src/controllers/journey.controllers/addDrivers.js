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
  const { journey_id } = req.query;

  SetDriversSchema.validateAsync(req.body)
    .then(({ drivers }) => {
      Journey.findById(journey_id).exec((err, journey) => {
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

          if (!role) {
            return res
              .status(Sc.INTERNAL_SERVER_ERROR)
              .json({ message: 'Role driver does not exist.' });
          }

          Employee.find({
            role: role._id,
            employeeId: { $in: drivers },
          }).exec((err, drivers) => {
            if (err) {
              return handleDbError(err, res);
            }

            if (drivers.length !== 2) {
              return res
                .status(Sc.BAD_REQUEST)
                .json({ message: 'Please provide exactly 2 drivers.' });
            }

            Journey.findOne({ drivers: { $in: drivers } }).exec(
              (err, existingJourney) => {
                if (err) {
                  return handleDbError(err, res);
                }

                if (existingJourney) {
                  return res.status(Sc.BAD_REQUEST).json({
                    message:
                      'One or both drivers not available for assignment.',
                  });
                }

                journey.updateOne(
                  { $set: { drivers: drivers, updatedAt: new Date() } },
                  (err) => {
                    if (err) {
                      return handleDbError(err, res);
                    }

                    Journey.findById(journey._id, { password: 0 })
                      .populate(['bus', 'route'])
                      .exec((err, newJourney) => {
                        if (err) {
                          return handleDbError(err, res);
                        }

                        return res.status(Sc.OK).json(newJourney);
                      });
                  }
                );
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
