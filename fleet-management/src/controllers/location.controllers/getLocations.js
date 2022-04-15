const { StatusCodes: Sc } = require('http-status-codes');

const { Location } = require('../../models');

const handleError = (err, res) => {
	console.log('Error:', err);
	return res.status(Sc.INTERNAL_SERVER_ERROR).json({ error: err });
};

module.exports = async (req, res) => {
	const { count } = req.query;
	try {
		const locations = await Location.find().exec();

		if (count) {
			return res.status(Sc.OK).json({ count: locations.length });
		}

		return res.status(Sc.OK).json(locations);
	} catch (err) {
		return handleError(err, res);
	}
};
