const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Bus, Route } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

const AddBusRouteSchema = Joi.object({
  route_name: Joi.string(),
});

module.exports = (req, res) => {
  const { bus_id } = req.query;

  if (!bus_id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ message: 'Please provide the bus id.' });
  }

  AddBusRouteSchema.validateAsync(req.body)
    .then(({ route_name }) => {
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
    })
    .catch((err) => {
      return res.status(Sc.BAD_REQUEST).json(err);
    });
};
