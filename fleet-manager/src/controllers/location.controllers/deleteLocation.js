const { StatusCodes: Sc } = require('http-status-codes');

const { Location } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

module.exports = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ message: 'Please provide location id.' });
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
    location.delete((err) => {
      if (err) {
        return handleDbError(err, res);
      }
      console.log('Info:', `${location.name} was deleted.`);
      return res
        .status(Sc.OK)
        .json({ message: `${location.name} was deleted.` });
    });
  });
};
