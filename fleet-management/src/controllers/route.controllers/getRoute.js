const { StatusCodes: Sc } = require('http-status-codes');

const { Route } = require('../../models');

const handleError = require('../../utils/handleError');

module.exports = async (req, res) => {
	const { id } = req.params;

	try {
		let route = await Route.findById(id).populate(['from', 'to']).exec();

		if (!route) {
			return res.status(Sc.BAD_REQUEST).json({ message: 'Route not found' });
		}

		return res.status(Sc.OK).json(route);
	} catch (err) {
		return handleError(err, res);
	}
};
