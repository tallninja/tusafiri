const { StatusCodes: Sc } = require('http-status-codes');

const { Bus } = require('../../models');

const handleError = require('../../utils/handleError');

module.exports = async (req, res) => {
	const { id } = req.params;
	try {
		let bus = await Bus.findById(id).exec();

		if (!bus) {
			return res.status(Sc.BAD_REQUEST).json({ message: 'Bus not found.' });
		}

		return res.status(Sc.OK).json(bus);
	} catch (err) {
		return handleError(err, res);
	}
};
