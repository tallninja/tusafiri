const { StatusCodes: Sc } = require('http-status-codes');

const { BookedSeat } = require('../../models');

const handleError = require('../../utils/handleError');

module.exports = async (req, res) => {
	const { id } = req.params;
	try {
		const bookedSeats = await BookedSeat.find({ journey: id }).exec();
		return res.status(Sc.OK).json(bookedSeats);
	} catch (err) {
		return handleError(err, res);
	}
};
