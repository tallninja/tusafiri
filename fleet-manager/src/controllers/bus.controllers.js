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
  capacity: Joi.number().min(1).max(60),
  routes: Joi.array().optional(),
});

const EditBusSchema = Joi.object({
  regNo: Joi.string().optional(),
  make: Joi.string().optional(),
  yom: Joi.number().min(2010).max(new Date().getFullYear()).optional(),
  capacity: Joi.number().min(1).max(60).optional(),
});

exports.addBus = async (req, res) => {
  const busDetails = await CreateBusSchema.validateAsync(req.body);
  if (busDetails.routes) {
    Route.find({ name: { $in: busDetails.routes } }).exec((err, routes) => {
      if (err) {
        return handleDbError(err, res);
      }

      busDetails.routes = routes.map((route) => route._id);
      new Bus(busDetails).save((err, bus) => {
        if (err) {
          return handleDbError(err, res);
        }

        console.log('Info:', `${bus.regNo} was added.`);
        return res.status(Sc.OK).json(bus);
      });
    });
  } else {
    new Bus(busDetails).save((err, bus) => {
      if (err) {
        return handleDbError(err);
      }

      console.log('Info:', `${bus.regNo} was added.`);
      return res.status(Sc.OK).json(bus);
    });
  }
};

exports.editBus = async (req, res) => {
  const { id } = req.params;
  let updatedFields = null;
  try {
    updatedFields = await EditBusSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(Sc.BAD_REQUEST).json(err);
  }
  if (!id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ message: 'Please provide the id.' });
  }
  Bus.findById(id).exec((err, bus) => {
    if (err) {
      return handleDbError(err, res);
    }
    if (!bus) {
      return res.status(Sc.BAD_REQUEST).json({ message: 'Bus not found.' });
    }
    bus.update({ $set: updatedFields }, (err) => {
      if (err) {
        return handleDbError(err, res);
      }
      console.log('Info:', `${bus.regNo} was updated.`);
      Bus.findById(bus.id)
        .populate({ path: 'routes', populate: ['pointA', 'pointB'] })
        .exec((err, updatedBus) => {
          if (err) {
            return handleDbError(err, res);
          }
          return res.status(Sc.OK).json(updatedBus);
        });
    });
  });
};

exports.deleteBus = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ message: 'Please provide the bus id.' });
  }
  Bus.findById(id)
    .populate({ path: 'routes', populate: ['pointA', 'pointB'] })
    .exec((err, bus) => {
      if (err) {
        return handleDbError(err, res);
      }
      if (!bus) {
        res.status(Sc.BAD_REQUEST).json({ message: 'Bus not found.' });
      }
      bus.delete((err) => {
        if (err) {
          return handleDbError(err, res);
        }
        console.log('Info:', `${bus.regNo} was deleted.`);
        return res.status(Sc.OK).json(bus);
      });
    });
};

exports.getBus = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ message: 'Please provide the bus id' });
  }
  Bus.findById(id)
    .populate({ path: 'routes', populate: ['pointA', 'pointB'] })
    .exec((err, bus) => {
      if (err) {
        handleDbError(err, res);
      }
      if (!bus) {
        return res.status(Sc.BAD_REQUEST).json({ message: 'Bus not found.' });
      }
      return res.status(Sc.OK).json(bus);
    });
};

exports.getBuses = (req, res) => {
  Bus.find()
    .populate(['routes'])
    .exec((err, buses) => {
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

        if (bus.routes.includes(route.id)) {
          return res
            .status(Sc.BAD_REQUEST)
            .json({ message: `${route.name} already exits.` });
        }

        bus.routes.push(route._id);
        bus.save((err) => {
          if (err) {
            return handleDbError(err, res);
          }
          console.log('Info:', `Added ${route.name} to ${bus.regNo} routes.`);
          Bus.findById(bus._id)
            .populate({ path: 'routes', populate: ['pointA', 'pointB'] })
            .exec((err, updatedBus) => {
              if (err) {
                return handleDbError(err, res);
              }
              return res.status(Sc.OK).json(updatedBus);
            });
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
          .json({ message: `${route} route not found.` });
      }

      Bus.findById(bus_id).exec((err, bus) => {
        if (err) {
          return handleDbError(err, res);
        }

        if (!bus) {
          return res.status(Sc.BAD_REQUEST).json({ message: 'Bus not found.' });
        }

        if (!bus.routes.includes(route._id)) {
          return res
            .status(Sc.BAD_REQUEST)
            .json({ message: `${route.name} is not in bus routes.` });
        }

        let newRoutes = bus.routes.filter(
          (bus_route) => JSON.stringify(bus_route) !== JSON.stringify(route._id)
        );
        console.log(route._id);
        bus.update(
          {
            $set: {
              routes: newRoutes,
            },
          },
          (err) => {
            if (err) {
              return handleDbError(err, res);
            }
            console.log(
              'Info:',
              `${route.name} removed from ${bus.regNo} routes.`
            );
            Bus.findById(bus.id)
              .populate({ path: 'routes', populate: ['pointA', 'pointB'] })
              .exec((err, updatedBus) => {
                if (err) {
                  return handleDbError(err);
                }
                return res.status(Sc.OK).json(updatedBus);
              });
          }
        );
      });
    });
  }
};
