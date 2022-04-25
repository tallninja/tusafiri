const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');
const { Bus, Seat } = require('../../models');

const handleError = require('../../utils/handleError');

const CreateBusSchema = Joi.object({
	regNo: Joi.string(),
	make: Joi.string(),
	yom: Joi.number()
		.min(2005)
		.max(new Date().getFullYear())
		.max(new Date().getFullYear()),
	capacity: Joi.number().min(3).max(100),
});

module.exports = async (req, res) => {
	try {
		let busDetails = await CreateBusSchema.validateAsync(req.body);
		let existingBus = await Bus.findOne({ regNo: busDetails.regNo }).exec();

		if (existingBus) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: `${existingBus.regNo} exists.` });
		}

		busDetails.createdAt = new Date();

		let newBus = await new Bus(busDetails).save();

		for (let i = 1; i <= newBus.capacity; i++) {
			await new Seat({ number: i, bus: newBus._id }).save();
		}

		await newBus.save();

		console.log('Info:', `${newBus.regNo} was added.`);

		let createdBus = await Bus.findById(newBus._id).exec();

		return res.status(Sc.OK).json(createdBus);
	} catch (err) {
		return handleError(err, res);
	}
};
