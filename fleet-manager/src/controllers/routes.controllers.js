const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Route, Location } = require('../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

const CreateRouteSchema = Joi.object({
  name: Joi.string(),
  pointA: Joi.string().length(3),
  pointB: Joi.string().length(3),
});

const EditRouteSchema = Joi.object({
  name: Joi.string().optional(),
  pointA: Joi.string().length(3).optional(),
  pointB: Joi.string().length(3).optional(),
});

exports.addRoute = async (req, res) => {
  CreateRouteSchema.validateAsync(req.body)
    .then((validatedData) => {
      let routeDetails = validatedData;

      let { name, pointA, pointB } = routeDetails;

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
          code: pointA,
        }).exec((err, location) => {
          if (err) {
            return handleDbError(err, res);
          }
          if (!location) {
            return res
              .status(Sc.BAD_REQUEST)
              .json({ message: `${location} location does not exist.` });
          }

          pointA = location._id;

          Location.findOne({
            code: pointB,
          }).exec((err, location) => {
            if (err) {
              return handleDbError(err, res);
            }
            if (!location) {
              return res
                .status(Sc.BAD_REQUEST)
                .json({ message: `${location} location does not exist.` });
            }

            pointB = location._id;

            new Route({
              name: name,
              pointA: pointA,
              pointB: pointB,
            }).save((err, route) => {
              if (err) {
                return handleDbError(err, res);
              }
              console.log('Info:', `${route.name} was created.`);
              return res.status(Sc.OK).json(route);
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

exports.editRoute = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ message: 'Please provide the route id.' });
  }

  EditRouteSchema.validateAsync(req.body)
    .then((validatedData) => {
      let updatedFields = validatedData;

      if (updatedFields.pointA) {
        let locationCode = updatedFields.pointA;
        Location.findOne({ code: locationCode }).exec((err, location) => {
          if (err) {
            return handleDbError(location);
          }
          if (!location) {
            return res
              .status(Sc.BAD_REQUEST)
              .json({ message: `${locationCode} not found.` });
          }
          updatedFields.pointA = location._id;
        });
      }

      if (updatedFields.pointB) {
        let locationCode = updatedFields.pointB;
        Location.findOne({ code: locationCode }).exec((err, location) => {
          if (err) {
            return handleDbError(location);
          }
          if (!location) {
            return res
              .status(Sc.BAD_REQUEST)
              .json({ message: `${locationCode} not found.` });
          }
          updatedFields.pointB = location._id;
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

          route.update({ $set: updatedFields }, (err) => {
            if (err) {
              return handleDbError(err, res);
            }

            console.log('Info:', `${route.name} was edited.`);

            Route.findById(route._id)
              .populate(['pointA', 'pointB'])
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

exports.deleteRoute = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ message: 'Please provide the route id.' });
  }
  Route.findById(id, (err, route) => {
    if (err) {
      return handleDbError(err, res);
    }
    if (!route) {
      return res.status(Sc.BAD_REQUEST).json({ message: 'Route not found' });
    }
    route.delete((err) => {
      if (err) {
        return handleDbError(err, res);
      }
      console.log('Info:', `${route.name} deleted.`);
      return res.status(Sc.OK).json(route);
    });
  });
};

exports.getRoute = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ message: 'Please provide the route id.' });
  }
  Route.findById(id)
    .populate(['pointA', 'pointB'])
    .exec((err, route) => {
      if (err) {
        return handleDbError(err, res);
      }
      if (!route) {
        return res.status(Sc.BAD_REQUEST).json({ message: 'Route not found' });
      }
      return res.status(Sc.BAD_REQUEST).json(route);
    });
};

exports.getRoutes = (req, res) => {
  Route.find()
    .populate(['pointA', 'pointB'])
    .exec((err, routes) => {
      if (err) {
        return handleDbError(err, res);
      }
      return res.status(Sc.OK).json(routes);
    });
};
