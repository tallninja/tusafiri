const { StatusCodes: Sc } = require('http-status-codes');

const { Route } = require('../../models');

const handleError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

module.exports = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ message: 'Please provide the route id.' });
  }

  try {
    let route = await Route.findById(id).populate(['from', 'to']).exec();

    if (!route) {
      return res.status(Sc.BAD_REQUEST).json({ message: 'Route not found' });
    }

    await route.delete();
    console.log('Info:', `${route.name} was deleted.`);

    return res.status(Sc.OK).json(route);
  } catch (err) {
    return handleError(err, res);
  }
};
