const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Route, Location } = require('../models');
const res = require('express/lib/response');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

const CreateRouteSchema = Joi.object({
  name: Joi.string(),
  pointA: Joi.string().length(3),
  pontB: Joi.string().length(3),
});

const EditRouteSchema = Joi.object({
  name: Joi.string().optional(),
  pointA: Joi.string().length(3).optional(),
  pontB: Joi.string().length(3).optional(),
});

exports.addRoute = async (req, res) => {
  let routeDetails = null;
  try {
    routeDetails = CreateRouteSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(Sc.BAD_REQUEST).json(err);
  }

  let { name, pointA, pointB } = routeDetails;

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
        return res
          .status(Sc.OK)
          .json({ message: `${route.name} route has beed added.` });
      });
    });
  });
};

exports.editRoute = async (req, res) => {
  const { id } = req.query;
  let data = null;
  try {
    data = await EditRouteSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(Sc.BAD_REQUEST).json(err);
  }
  if (!id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ message: 'Please provide the route_id in the URL parameters.' });
  }
  Route.findByIdAndUpdate(id, data).exec((err, route) => {
    if (err) {
      return handleDbError(err, res);
    }
    return res.status(Sc.OK).json({ message: `${route.name} route edited.` });
  });
};

exports.deleteRoute = (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ message: 'Please provide the route id in the URL parameters.' });
  }
  Route.findByIdAndDelete(route_id, (err, route) => {
    if (err) {
      return handleDbError(err, res);
    }
    return res.status(Sc.OK).json({ message: `${route.name} deleted.` });
  });
};

exports.getRoute = (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ message: 'Please provide the route id in the URL parameters.' });
  }
  Route.findById(id).exec((err, route) => {
    if (err) {
      return handleDbError(err, res);
    }
  });
};

exports.getRoutes = (req, res) => {
  Route.find().exec((err, routes) => {
    if (err) {
      return handleDbError(err, res);
    }
    return res.status(Sc.OK).json(routes);
  });
};
