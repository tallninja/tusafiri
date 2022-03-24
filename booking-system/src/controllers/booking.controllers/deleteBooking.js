const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Booking } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

module.exports = (req, res) => {};
