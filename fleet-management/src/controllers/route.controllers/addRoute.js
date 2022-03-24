const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Route, Location } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

const CreateRouteSchema = Joi.object({
  name: Joi.string(),
  from: Joi.string().length(3),
  to: Joi.string().length(3),
});

module.exports = (req, res) => {
  CreateRouteSchema.validateAsync(req.body)
    .then((validatedData) => {
      let routeDetails = validatedData;

      let { name, from, to } = routeDetails;

      Route.findOne({ name: name }).exec((err, route) => {
        if (err) {
          return handleDbError(err, res);
        }
        if (route) {
          return res
            .status(Sc.BAD_REQUEST)
            .json({ message: `${route.name} already exists.` });
        }
        Location.findOne({
          code: from,
        }).exec((err, location) => {
          if (err) {
            return handleDbError(err, res);
          }
          if (!location) {
            return res
              .status(Sc.BAD_REQUEST)
              .json({ message: `${location} location does not exist.` });
          }

          from = location._id;

          Location.findOne({
            code: to,
          }).exec((err, location) => {
            if (err) {
              return handleDbError(err, res);
            }
            if (!location) {
              return res
                .status(Sc.BAD_REQUEST)
                .json({ message: `${location} location does not exist.` });
            }

            to = location._id;

            new Route({
              name: name,
              from: from,
              to: to,
            }).save((err, route) => {
              if (err) {
                return handleDbError(err, res);
              }

              console.log('Info:', `${route.name} was created.`);
              Route.findById(route._id)
                .populate(['from', 'to'])
                .exec((err, newRoute) => {
                  if (err) {
                    return handleDbError(err, res);
                  }
                  return res.status(Sc.OK).json(newRoute);
                });
            });
          });
        });
      });
    })
    .catch((err) => {
      if (err) {
        return res.status(Sc.BAD_REQUEST).json(err);
      }
    });
};
