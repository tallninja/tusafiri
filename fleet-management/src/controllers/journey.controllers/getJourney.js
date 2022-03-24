const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Journey } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

module.exports = (req, res) => {
  const { id } = req.params;

  Journey.findById(id)
    .populate(['bus', 'route'])
    .exec((err, journey) => {
      if (err) {
        return handleDbError(err, res);
      }

      if (!journey) {
        return res
          .status(Sc.BAD_REQUEST)
          .json({ message: 'Journey not found.' });
      }

      return res.status(Sc.OK).json(journey);
    });
};
