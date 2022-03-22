const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Bus } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

const EditBusSchema = Joi.object({
  regNo: Joi.string().optional(),
  make: Joi.string().optional(),
  yom: Joi.number().min(2010).max(new Date().getFullYear()).optional(),
  capacity: Joi.number().min(1).max(60).optional(),
});

module.exports = (req, res) => {
  const { id } = req.params;

  EditBusSchema.validateAsync(req.body)
    .then((updatedFields) => {
      Bus.findById(id).exec((err, bus) => {
        if (err) {
          return handleDbError(err, res);
        }
        if (!bus) {
          return res.status(Sc.BAD_REQUEST).json({ message: 'Bus not found.' });
        }
        bus.update({ $set: updatedFields }, (err) => {
          if (err) {
            return handleDbError(err, res);
          }
          console.log('Info:', `${bus.regNo} was updated.`);
          Bus.findById(bus.id)
            .populate({ path: 'routes', populate: ['pointA', 'pointB'] })
            .exec((err, updatedBus) => {
              if (err) {
                return handleDbError(err, res);
              }
              return res.status(Sc.OK).json(updatedBus);
            });
        });
      });
    })
    .catch((err) => {
      return res.status(Sc.BAD_REQUEST).json(err);
    });
};
