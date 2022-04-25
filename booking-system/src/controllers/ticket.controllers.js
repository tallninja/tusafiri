const { StatusCodes: Sc } = require('http-status-codes');

const { Ticket } = require('../models');

const handleError = require('../utils/handleError');

exports.getTicket = async (req, res) => {
	const { id } = req.params;
	try {
		const ticket = await Ticket.findById(id)
			.populate([
				{ path: 'user', select: 'firstName lastName' },
				{ path: 'seat', select: 'number -_id' },
				{
					path: 'journey',
					select: 'bus route fare departureTime arrivalTime',
					populate: [
						{ path: 'bus', model: 'buses' },
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
		return res.status(Sc.OK).json(ticket);
	} catch (err) {
		return handleError(err, res);
	}
};

exports.getTickets = async (req, res) => {
	try {
		let tickets = await Ticket.find({})
			.populate([
				{ path: 'user', select: 'firstName lastName' },
				{ path: 'seat', select: 'number -_id' },
			])
			.exec();

		return res.status(Sc.OK).json(tickets);
	} catch (err) {
		return handleError(err, res);
	}
};

exports.getBookingTickets = async (req, res) => {
	const { booking } = req.params;
	try {
		let tickets = await Ticket.find({ booking })
			.populate([
				{ path: 'user', select: 'firstName lastName' },
				{ path: 'seat', select: 'number -_id' },
				{
					path: 'journey',
					select: 'bus route fare',
					populate: [
						{ path: 'bus', model: 'buses' },
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

		return res.status(Sc.OK).json(tickets);
	} catch (err) {
		return handleError(err, res);
	}
};

exports.deleteTicket = async (req, res) => {
	const { id } = req.query;

	try {
		let ticket = await Ticket.findById(id).exec();

		if (!ticket) {
			return res.status(Sc.BAD_REQUEST).json({ message: 'Ticket not found.' });
		}

		await ticket.deleteOne();
		console.log('Info:', `Ticket ${ticket._id} was deleted.`);

		return res.status(Sc.OK).json(ticket);
	} catch (err) {
		return handleError(err, res);
	}
};
