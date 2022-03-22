const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');
const { Bus, Route } = require('../../models');

const handleDbError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

const CreateBusSchema = Joi.object({
  regNo: Joi.string(),
  make: Joi.string(),
  yom: Joi.number().min(2010).max(new Date().getFullYear()),
  capacity: Joi.number().min(1).max(60),
  routes: Joi.array().optional(),
});

module.exports = async (req, res) => {
  const busDetails = await CreateBusSchema.validateAsync(req.body);
  if (busDetails.routes) {
    Route.find({ name: { $in: busDetails.routes } }).exec((err, routes) => {
      if (err) {
        return handleDbError(err, res);
      }

      busDetails.routes = routes.map((route) => route._id);
      new Bus(busDetails).save((err, bus) => {
        if (err) {
          return handleDbError(err, res);
        }

        console.log('Info:', `${bus.regNo} was added.`);
        return res.status(Sc.OK).json(bus);
      });
    });
  } else {
    new Bus(busDetails).save((err, bus) => {
      if (err) {
        return handleDbError(err);
      }

      console.log('Info:', `${bus.regNo} was added.`);
      return res.status(Sc.OK).json(bus);
    });
  }
};
