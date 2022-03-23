const { StatusCodes: Sc } = require('http-status-codes');

const { Bus, Seat } = require('../../models');

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
  Bus.findById(id).exec((err, bus) => {
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

      Seat.find({ bus: bus._id }).exec((err, seats) => {
        if (err) {
          return handleDbError(err, res);
        }

        // also delete the bus seats
        seats.map((seat) => {
          seat.delete((err) => {
            if (err) {
              return handleDbError(err, res);
            }
          });
        });
      });

      return res.status(Sc.OK).json(bus);
    });
  });
};
