const { StatusCodes: Sc } = require('http-status-codes');

const { Bus } = require('../../models');

const handleError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

module.exports = async (req, res) => {
  try {
    let buses = await Bus.find().exec();

    return res.status(Sc.OK).json(buses);
  } catch (err) {
    return handleError(err, res);
  }
};
