const { StatusCodes: Sc } = require('http-status-codes');
const Joi = require('joi');
const { Bus, Route } = require('../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

const CreateBusSchema = Joi.object({
  regNo: Joi.string(),
  make: Joi.string(),
  yom: Joi.number().min(2010).max(new Date().getFullYear()),
  capacity: Joi.number().min(1).max(50),
  routes: Joi.array().optional(),
});

const EditBusSchema = Joi.object({
  regNo: Joi.string().optional(),
  make: Joi.string().optional(),
  yom: Joi.number().min(2010).max(new Date().getFullYear()).optional(),
  capacity: Joi.number().min(1).max(50).optional(),
});

exports.addNewBus = async (req, res) => {
  const busDetails = await CreateBusSchema.validateAsync(req.body);
  new Bus(busDetails).save((err, bus) => {
    if (err) {
      return handleDbError(err, res);
    }
    if (busDetails.routes) {
      Route.find({
        name: { $in: busDetails.routes },
      }).exec((err, routes) => {
        if (err) {
          return handleDbError(err, res);
        }
        bus.routes = routes.map((route) => route._id);
        bus.save((err) => {
          if (err) {
            return handleDbError(err, res);
          }
          return res.status(Sc.OK).json({ message: 'Bus details saved.' });
        });
      });
    } else {
      return res.status(Sc.OK).json({ message: 'Bus details saved.' });
    }
  });
};

exports.editBus = async (req, res) => {
  const { id } = req.params;
  const data = await EditBusSchema.validateAsync(req.body);
  if (!id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ message: 'Please provide the id in the URL parameters.' });
  }
  Bus.findByIdAndUpdate(id, data).exec((err) => {
    if (err) {
      return handleDbError(err, res);
    }
    return res.status(Sc.OK).json({ message: 'Bus details edited.' });
  });
};

exports.deleteBus = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ message: 'Please provide the bus id in the URL parameters.' });
  }
  Bus.findByIdAndDelete(bus_id, (err) => {
    if (err) {
      return handleDbError(err, res);
    }
    return res.status(Sc.OK).json({ message: 'Bus deleted from DB.' });
  });
};

exports.getBus = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ message: 'Please provide the bus id in the URL parameters.' });
  }
  Bus.findById(bus_id).exec((err, bus) => {
    if (err) {
      handleDbError(err, res);
    }
    return res.status(Sc.OK).json(bus);
  });
};

exports.getBuses = (req, res) => {
  Bus.find().exec((err, buses) => {
    if (err) {
      return handleDbError(err, res);
    }
    return res.status(Sc.OK).json(buses);
  });
};

exports.addRoute = (req, res) => {
  const { bus_id } = req.query;
  const { route_name } = req.body;
  if (bus_id && route_name) {
    Route.findOne({
      name: route_name,
    }).exec((err, route) => {
      if (err) {
        return handleDbError(err, res);
      }

      if (!route) {
        return res
          .status(Sc.BAD_REQUEST)
          .json({ message: 'Route does not exist.' });
      }

      Bus.findById(bus_id, (err, bus) => {
        if (err) {
          return handleDbError(err, res);
        }
        if (!bus) {
          return res
            .status(Sc.BAD_REQUEST)
            .json({ message: 'Bus does not exist.' });
        }
        bus.routes = routes.map((route) => route._id);
        bus.save((err) => {
          if (err) {
            return handleDbError(err, res);
          }
        });
      });
    });
  }
};

exports.removeRoute = (req, res) => {
  const { bus_id } = req.query;
  const { route_name } = req.body;

  if (bus_id && route_name) {
    Route.findOne({
      name: route_name,
    }).exec((err, route) => {
      if (err) {
        return handleDbError(err, res);
      }
      if (!route) {
        return res
          .status(Sc.BAD_REQUEST)
          .json({ message: `${route} route is not a valid route.` });
      }
      Bus.findById(bus_id).exec((err, bus) => {
        if (err) {
          return handleDbError(err, res);
        }
        if (!bus) {
          return res
            .status(Sc.BAD_REQUEST)
            .json({ message: 'Bus does not exist.' });
        }
        bus.routes.filter((bus_route) => bus_route == route._id);
      });
    });
  }
};
