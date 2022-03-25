const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Journey, Employee, Role } = require('../../models');

const handleError = (err, res) => {
  console.log('Error:', err);
  return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

const SetDriversSchema = Joi.object({
  drivers: Joi.array().length(2),
});

module.exports = async (req, res) => {
  const { id } = req.query;

  try {
    let updatedFields = await SetDriversSchema.validateAsync(req.body);
    let journey = await Journey.findById(id).exec();

    if (!journey) {
      return res.status(Sc.BAD_REQUEST).json({ message: 'Journey not found.' });
    }

    let driverRole = await Role.find({ name: 'driver' }).exec();

    if (!driverRole) {
      return res
        .status(Sc.INTERNAL_SERVER_ERROR)
        .json({ message: 'Role does not exist.' });
    }

    let drivers = await Employee.find({
      role: driverRole._id,
      employeeId: { $in: updatedFields.drivers },
    }).exec();

    if (drivers.length !== 2) {
      return res
        .status(Sc.BAD_REQUEST)
        .json({ message: 'Please provide exactly 2 drivers.' });
    }

    let existingJourney = await Journey.findOne({
      drivers: { $in: drivers },
    }).exec();

    if (existingJourney) {
      return res.status(Sc.BAD_REQUEST).json({
        message: 'One or both drivers not available for assignment.',
      });
    }

    await journey.updateOne({
      $set: { drivers: drivers, updatedAt: new Date() },
    });

    let updatedJourney = await Journey.findById(journey._id)
      .populate(['bus', 'route'])
      .exec();

    return res.status(Sc.OK).json(updatedJourney);
  } catch (err) {
    return handleError(err, res);
  }
};
