const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Journey } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

module.exports = (req, res) => {
  Journey.find()
    .populate(['route'])
    .exec((err, journeys) => {
      if (err) {
        return handleDbError(err, res);
      }

      return res.status(Sc.OK).json(journeys);
    });
};
