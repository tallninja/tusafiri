const { StatusCodes: Sc } = require('http-status-codes');

const { Route } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

module.exports = (req, res) => {
  Route.find()
    .populate(['pointA', 'pointB'])
    .exec((err, routes) => {
      if (err) {
        return handleDbError(err, res);
      }
      return res.status(Sc.OK).json(routes);
    });
};
