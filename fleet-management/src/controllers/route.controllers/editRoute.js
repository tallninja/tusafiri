const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Route, Location } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

const EditRouteSchema = Joi.object({
  name: Joi.string().optional(),
  from: Joi.string().length(3).optional(),
  to: Joi.string().length(3).optional(),
});

module.exports = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ message: 'Please provide the route id.' });
  }

  EditRouteSchema.validateAsync(req.body)
    .then((validatedData) => {
      let updatedFields = validatedData;

      if (updatedFields.from) {
        let locationCode = updatedFields.from;
        Location.findOne({ code: locationCode }).exec((err, location) => {
          if (err) {
            return handleDbError(location);
          }
          if (!location) {
            return res
              .status(Sc.BAD_REQUEST)
              .json({ message: `${locationCode} not found.` });
          }
          updatedFields.from = location._id;
        });
      }

      if (updatedFields.to) {
        let locationCode = updatedFields.to;
        Location.findOne({ code: locationCode }).exec((err, location) => {
          if (err) {
            return handleDbError(location);
          }
          if (!location) {
            return res
              .status(Sc.BAD_REQUEST)
              .json({ message: `${locationCode} not found.` });
          }
          updatedFields.to = location._id;
        });
      }

      Route.findOne({ name: updatedFields.name }).exec((err, route) => {
        if (err) {
          return handleDbError(err);
        }

        if (route) {
          return res
            .status(Sc.BAD_REQUEST)
            .json({ message: `${route.name} exists.` });
        }

        Route.findById(id).exec((err, route) => {
          if (err) {
            return handleDbError(err, res);
          }

          if (!route) {
            return res
              .status(Sc.BAD_REQUEST)
              .json({ message: 'Route not found' });
          }

          route.updateOne({ $set: updatedFields }, (err) => {
            if (err) {
              return handleDbError(err, res);
            }

            console.log('Info:', `${route.name} was edited.`);

            Route.findById(route._id)
              .populate(['from', 'to'])
              .exec((err, updatedRoute) => {
                if (err) {
                  return handleDbError(err, res);
                }

                return res.status(Sc.OK).json(updatedRoute);
              });
          });
        });
      });
    })
    .catch((err) => {
      return res.status(Sc.BAD_REQUEST).json(err);
    });
};
