const { StatusCodes: Sc } = require('http-status-codes');

const { Location } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

module.exports = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(Sc.BAD_REQUEST).json({
      message: 'Please provide the location id.',
    });
  }
  Location.findById(id).exec((err, location) => {
    if (err) {
      return handleDbError(err, res);
    }
    if (!location) {
      return res
        .status(Sc.BAD_REQUEST)
        .json({ message: 'Location not found.' });
    }
    return res.status(Sc.OK).json(location);
  });
};
