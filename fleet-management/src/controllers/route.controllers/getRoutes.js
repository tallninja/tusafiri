const { StatusCodes: Sc } = require('http-status-codes');

const { Route } = require('../../models');

const handleError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

module.exports = async (req, res) => {
  try {
    let routes = await Route.find().populate(['from', 'to']).exec();

    return res.status(Sc.OK).json(routes);
  } catch (err) {
    return handleError(err, res);
  }
};
