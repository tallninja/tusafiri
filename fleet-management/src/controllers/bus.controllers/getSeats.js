const { StatusCodes: Sc } = require('http-status-codes');

const { Seat } = require('../../models');

const handleError = require('../../utils/handleError');

module.exports = async (req, res) => {
	const { bus } = req.params;
	try {
		const busSeats = await Seat.find({ bus: bus }).exec();

		return res.status(Sc.OK).json(busSeats);
	} catch (err) {
		return handleError(err, res);
	}
};
