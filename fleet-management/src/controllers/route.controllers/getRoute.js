const { StatusCodes: Sc } = require('http-status-codes');

const { Route } = require('../../models');

const handleError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    let route = await Route.findById(id).populate(['from', 'to']).exec();

    if (!route) {
      return res.status(Sc.BAD_REQUEST).json({ message: 'Route not found' });
    }

    return res.status(Sc.BAD_REQUEST).json(route);
  } catch (err) {
    return handleError(err, res);
  }
};
