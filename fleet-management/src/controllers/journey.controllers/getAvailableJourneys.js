const { StatusCodes: Sc } = require('http-status-codes');

const { Journey, Route } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

module.exports = async (req, res) => {
  const { route_name } = req.query;

  try {
    let route = await Route.findOne({ name: route_name });

    if (!route) {
      return res.status(Sc.BAD_REQUEST).json({ message: 'Route not found.' });
    }

    let journeys = await Journey.find({
      route: route._id,
      availableSeats: { $gt: 0 },
    }).exec();

    return res.status(Sc.OK).json(journeys);
  } catch (err) {
    return handleDbError(err, res);
  }
};
