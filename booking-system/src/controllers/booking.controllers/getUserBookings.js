const { StatusCodes: Sc } = require('http-status-codes');

const { Booking } = require('../../models');

const handleError = require('../../utils/handleError');

module.exports = async (req, res) => {
	const user = req.headers['x-user'];
	try {
		const userBookings = await Booking.find({ user })
			.sort('-craeatedAt')
			.populate([
				{ path: 'seats', select: 'number -_id' },
				{
					path: 'journey',
					select: 'route fare departureTime',
					populate: [
						{
							path: 'route',
							model: 'routes',
							populate: [
								{ path: 'from', model: 'locations' },
								{ path: 'to', model: 'locations' },
							],
						},
					],
				},
			])
			.exec();
		return res.status(Sc.OK).json(userBookings);
	} catch (err) {
		return handleError(err, res);
	}
};
