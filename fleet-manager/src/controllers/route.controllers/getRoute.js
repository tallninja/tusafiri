const { StatusCodes: Sc } = require('http-status-codes');

const { Route } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

module.exports = (req, res) => {
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
