const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Bus, Seat } = require('../../models');

const handleError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

const EditBusSchema = Joi.object({
  regNo: Joi.string().optional(),
  make: Joi.string().optional(),
  yom: Joi.number().min(2010).max(new Date().getFullYear()).optional(),
  capacity: Joi.number().min(1).max(60).optional(),
});

module.exports = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res
      .status(Sc.BAD_REQUEST)
      .json({ message: 'Please provide the bus id.' });
  }

  try {
    let updatedFields = await EditBusSchema.validateAsync(req.body);
    let currentBus = await Bus.findById(id).exec();

    if (!currentBus) {
      return res.status(Sc.BAD_REQUEST).json({ message: 'Bus not found.' });
    }

    // also adjust the number of seats
    if (updatedFields.capacity) {
      await Seat.deleteMany({ bus: currentBus._id });

      updatedFields.seats = [];
      for (let i = 1; i <= updatedFields.capacity; i++) {
        let seat = await new Seat({ number: i, bus: currentBus._id }).save();
        updatedFields.seats.push(seat);
      }
    }

    updatedFields.updatedAt = new Date();

    await currentBus.updateOne({ $set: updatedFields });
    console.log('Info:', `${currentBus.regNo} was updated.`);

    let updatedBus = await Bus.findById(currentBus.id)
      .populate(['seats'])
      .exec();

    return res.status(Sc.OK).json(updatedBus);
  } catch (err) {
    return handleError(err, res);
  }
};
