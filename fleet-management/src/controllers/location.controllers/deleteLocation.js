const { StatusCodes: Sc } = require('http-status-codes');

const { Location } = require('../../models');

const handleError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

module.exports = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ message: 'Please provide location id.' });
  }

  try {
    let location = await Location.findById(id).exec();

    if (!location) {
      return res
        .status(Sc.BAD_REQUEST)
        .json({ message: 'Location not found.' });
    }

    await location.deleteOne();
    console.log('Info:', `${location.name} was deleted.`);

    return res.status(Sc.OK).json(location);
  } catch (err) {
    return handleError(err, res);
  }
};
