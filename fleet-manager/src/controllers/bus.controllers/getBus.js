const { StatusCodes: Sc } = require('http-status-codes');

const { Bus } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

module.exports = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ message: 'Please provide the bus id' });
  }
  Bus.findById(id)
    .populate({ path: 'routes', populate: ['pointA', 'pointB'] })
    .exec((err, bus) => {
      if (err) {
        handleDbError(err, res);
      }
      if (!bus) {
        return res.status(Sc.BAD_REQUEST).json({ message: 'Bus not found.' });
      }
      return res.status(Sc.OK).json(bus);
    });
};
