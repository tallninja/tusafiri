const { StatusCodes: Sc } = require('http-status-codes');

const { Seat } = require('../../models');

const handleError = (err, res) => {
	console.log('Error:', err);
	return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

module.exports = async (req, res) => {
	const { bus } = req.params;
	try {
		const busSeats = await Seat.find({ bus: bus }).exec();

		return res.status(Sc.OK).json(busSeats);
	} catch (err) {
		return handleError(err, res);
	}
};
