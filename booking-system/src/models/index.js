const mongoose = require('mongoose');
const cron = require('node-cron');

const { db } = require('../../config');

const Booking = require('./Booking');
const Invoice = require('./Invoice');

const connectToDb = () => {
	mongoose.connect(db.MONGO_URI, (err) => {
		if (err) {
			console.log('Error:', err);
		} else {
			console.log('Info:', 'Conneted to database.');

			cron.schedule('*/1 * * * *', async () => {
				// runs after every 1 minutes
				console.log('Info:', 'Cleaning the bookings collection...');
				try {
					let bookings = await Booking.find({ paid: false }).exec(); // find all bookings which have not been paid for

					if (bookings.length > 0) {
						bookings.map(async (booking) => {
							let invoice = await Invoice.findOne({
								booking: booking._id,
							}).exec();

							if (!invoice) {
								// check if booking is missing an invoice and is not paid for
								await booking.deleteOne();
								console.log('Info:', `Booking ${booking._id} was deleted.`);
							}
						});
					}
				} catch (err) {
					console.log('Error:', err);
				}
			});
		}
	});
};

module.exports = {
	connectToDb: connectToDb,
	Booking: require('./Booking'),
	Invoice: require('./Invoice'),
	Ticket: require('./Ticket'),
	Payment: require('./Payment'),
	Journey: require('./Journey'),
	Bus: require('./Bus'),
	Seat: require('./Seat'),
	BookedSeat: require('./BookedSeat'),
	User: require('./User'),
	Location: require('./Location'),
	Route: require('./Route'),
};
