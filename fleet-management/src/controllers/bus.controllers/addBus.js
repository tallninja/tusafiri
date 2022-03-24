const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');
const { Bus } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

const CreateBusSchema = Joi.object({
  regNo: Joi.string(),
  make: Joi.string(),
  yom: Joi.number()
    .min(2005)
    .max(new Date().getFullYear())
    .max(new Date().getFullYear()),
  capacity: Joi.number().min(1).max(60),
});

module.exports = (req, res) => {
  CreateBusSchema.validateAsync(req.body)
    .then((busDetails) => {
      // check if bus with regNo exists
      Bus.findOne({ regNo: busDetails.regNo }).exec((err, bus) => {
        if (err) {
          return handleDbError(err, res);
        }

        if (bus) {
          return res
            .status(Sc.BAD_REQUEST)
            .json({ message: `${bus.regNo} exists.` });
        }

        new Bus(busDetails).save((err, bus) => {
          if (err) {
            return handleDbError(err, res);
          }

          console.log('Info:', `${bus.regNo} was added.`);

          Bus.findById(bus._id).exec((err, newBus) => {
            if (err) {
              return handleDbError(err, res);
            }
            return res.status(Sc.OK).json(newBus);
          });
        });
      });
    })
    .catch((err) => {
      return res.status(Sc.BAD_REQUEST).json(err);
    });
};
