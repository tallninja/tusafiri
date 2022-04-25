const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Bus, Seat } = require('../../models');

const handleError = require('../../utils/handleError');

const EditBusSchema = Joi.object({
	regNo: Joi.string().optional(),
	make: Joi.string().optional(),
	yom: Joi.number().min(2010).max(new Date().getFullYear()).optional(),
	capacity: Joi.number().min(1).max(60).optional(),
});

module.exports = async (req, res) => {
	const { id } = req.params;
	try {
		let updatedFields = await EditBusSchema.validateAsync(req.body);
		let currentBus = await Bus.findById(id).exec();

		if (!currentBus) {
			return res.status(Sc.BAD_REQUEST).json({ message: 'Bus not found.' });
		}

		// also adjust the number of seats if we decide to change the capacity
		if (
			updatedFields.capacity &&
			updatedFields.capacity !== currentBus.capacity
		) {
			await Seat.deleteMany({ bus: currentBus._id });
			for (let i = 1; i <= updatedFields.capacity; i++) {
				let seat = await new Seat({ number: i, bus: currentBus._id }).save();
			}
		}

		updatedFields.updatedAt = new Date();

		await currentBus.updateOne({ $set: updatedFields });
		console.log('Info:', `${currentBus.regNo} was updated.`);

		let updatedBus = await Bus.findById(currentBus.id).exec();

		return res.status(Sc.OK).json(updatedBus);
	} catch (err) {
		return handleError(err, res);
	}
};
