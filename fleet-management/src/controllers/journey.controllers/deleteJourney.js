const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Journey } = require('../../models');

const handleError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

module.exports = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ message: 'Please provide the journey id.' });
  }

  try {
    let journey = await Journey.findById(id).populate(['bus', 'route']).exec();

    if (!journey) {
      return res.status(Sc.BAD_REQUEST).json({ message: 'Journey not found.' });
    }

    await journey.deleteOne();
    console.log('Info:', `Journey ${journey._id} was deleted.`);

    return res.status(Sc.OK).json(journey);
  } catch (err) {
    return handleError(err, res);
  }
};
