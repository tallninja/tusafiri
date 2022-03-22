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
      .json({ message: 'Please provide the bus id.' });
  }
  Bus.findById(id)
    .populate({ path: 'routes', populate: ['pointA', 'pointB'] })
    .exec((err, bus) => {
      if (err) {
        return handleDbError(err, res);
      }
      if (!bus) {
        res.status(Sc.BAD_REQUEST).json({ message: 'Bus not found.' });
      }
      bus.delete((err) => {
        if (err) {
          return handleDbError(err, res);
        }
        console.log('Info:', `${bus.regNo} was deleted.`);
        return res.status(Sc.OK).json(bus);
      });
    });
};
