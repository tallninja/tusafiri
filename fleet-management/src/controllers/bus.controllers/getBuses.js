const { StatusCodes: Sc } = require('http-status-codes');

const { Bus } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

module.exports = (req, res) => {
  Bus.find().exec((err, buses) => {
    if (err) {
      return handleDbError(err, res);
    }
    return res.status(Sc.OK).json(buses);
  });
};
