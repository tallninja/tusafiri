const { StatusCodes: Sc } = require('http-status-codes');

const { Location } = require('../../models');

const handleError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    let location = await Location.findById(id).exec();

    if (!location) {
      return res
        .status(Sc.BAD_REQUEST)
        .json({ message: 'Location not found.' });
    }

    return res.status(Sc.OK).json(location);
  } catch (err) {
    return handleError(err, res);
  }
};
