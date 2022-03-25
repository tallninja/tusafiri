const { StatusCodes: Sc } = require('http-status-codes');

const { Bus, Seat } = require('../../models');

const handleError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

module.exports = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ message: 'Please provide the bus id.' });
  }

  try {
    let bus = await Bus.findById(id).exec();

    if (!bus) {
      res.status(Sc.BAD_REQUEST).json({ message: 'Bus not found.' });
    }

    await bus.deleteOne();
    await Seat.deleteMany({ bus: bus._id });
    console.log('Info:', `${bus.regNo} was deleted.`);

    return res.status(Sc.OK).json(bus);
  } catch (err) {
    return handleError(err, res);
  }
};
