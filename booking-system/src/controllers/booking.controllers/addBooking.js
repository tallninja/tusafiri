const _ = require('lodash');
const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const {
	Booking,
	Seat,
	BookedSeat,
	Journey,
	Ticket,
	Invoice,
} = require('../../models');

const handleError = require('../../utils/handleError');

const CreateBookingSchema = Joi.object({
	journey: Joi.string(),
	seats: Joi.array().items(Joi.string()),
	tickets: Joi.array().items(
		Joi.object({
			journey: Joi.string(),
			seat: Joi.string(),
			passengerName: Joi.string(),
			passengerPhone: Joi.string().optional(),
		})
	),
});

module.exports = async (req, res) => {
	try {
		const user = req.headers['x-user'];
		let bookingDetails = await CreateBookingSchema.validateAsync(req.body);
		let journey = await Journey.findById(bookingDetails.journey)
			.populate(['bus'])
			.exec();

		// check first if journey exists
		if (!journey) {
			return res.status(Sc.BAD_REQUEST).json({ message: 'Journey not found.' });
		}

		bookingDetails.journey = journey._id;

		// check if there's an existing booking
		let existingBooking = await Booking.findOne(bookingDetails).exec();

		if (existingBooking) {
			return res.status(Sc.BAD_REQUEST).json({ message: 'Booking exists.' });
		}

		// check if bus is full
		const journeyBookedSeats = await BookedSeat.find({
			journey: bookingDetails.journey,
		}).exec();

		if (journeyBookedSeats.length >= journey.bus.capacity - 2) {
			return res.status(Sc.BAD_REQUEST).json({ message: 'Bus is full.' });
		}

		// check if all the requested seats exist and they belong to that particular bus.
		let requestedSeats = await Seat.find({
			_id: { $in: bookingDetails.seats },
			bus: journey.bus,
		}).exec();

		if (requestedSeats.length !== bookingDetails.seats.length) {
			return res.status(Sc.BAD_REQUEST).json({ message: 'Seats are invalid.' });
		}

		// check if seats are available.
		const exitsingBookedSeats = await BookedSeat.find({
			seat: { $in: bookingDetails.seats },
			journey: bookingDetails.journey,
		}).exec();

		if (exitsingBookedSeats.length) {
			return res.status(Sc.BAD_REQUEST).json({ message: "Seat's taken." });
		}

		bookingDetails.createdAt = new Date();

		// if all the checks passed we can proceed and save the booking
		let booking = await new Booking({
			...bookingDetails,
			user,
		}).save({ seats: bookingDetails.seats, user }); // save options to pass the seats to the pre save hooks

		bookingDetails.tickets.map(async (ticket) => {
			let newTicket = await new Ticket({
				...ticket,
				user,
				booking: booking._id,
				validUntil: journey.arrivalTime || new Date(),
			}).save();
			console.log('Info:', `Ticket ${newTicket._id} was created.`);
		});

		console.log('Info:', `Booking ${booking._id} was created.`);

		let createdBooking = await Booking.findById(booking._id)
			.populate(['journey', 'seats'])
			.exec();
		return res.status(Sc.OK).json(createdBooking);
	} catch (err) {
		return handleError(err, res);
	}
};
