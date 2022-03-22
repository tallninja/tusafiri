const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Bus, Route } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

const RemoveBusRouteSchema = Joi.object({
  route_name: Joi.string(),
});

module.exports = (req, res) => {
  const { bus_id } = req.query;

  if (!bus_id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ message: 'Please provide the bus id.' });
  }

  RemoveBusRouteSchema.validateAsync(req.body)
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
            .json({ message: `${route} route not found.` });
        }

        Bus.findById(bus_id).exec((err, bus) => {
          if (err) {
            return handleDbError(err, res);
          }

          if (!bus) {
            return res
              .status(Sc.BAD_REQUEST)
              .json({ message: 'Bus not found.' });
          }

          if (!bus.routes.includes(route._id)) {
            return res
              .status(Sc.BAD_REQUEST)
              .json({ message: `${route.name} is not in bus routes.` });
          }

          let newRoutes = bus.routes.filter(
            (bus_route) =>
              JSON.stringify(bus_route) !== JSON.stringify(route._id)
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
    })
    .catch((err) => {
      return res.status(Sc.BAD_REQUEST).json(err);
    });
};
