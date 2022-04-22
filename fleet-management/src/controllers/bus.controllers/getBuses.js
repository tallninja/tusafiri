const { StatusCodes: Sc } = require('http-status-codes');

const { Bus } = require('../../models');

const handleError = require('../../utils/handleError');

module.exports = async (req, res) => {
	const { count } = req.query;
	try {
		const buses = await Bus.find().exec();

		if (count) {
			return res.status(Sc.OK).json({ count: buses.length });
		}

		return res.status(Sc.OK).json(buses);
	} catch (err) {
		return handleError(err, res);
	}
};
