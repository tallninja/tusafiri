const mongoose = require('mongoose');
const { db } = require('../../config/keys');

const connectToDb = () => {
	mongoose.connect(db.MONGO_URI, (err) => {
		if (err) {
			console.log('Error:', err);
		} else {
			console.log('Info:', 'Connected to database !');
		}
	});
};

module.exports = {
	connectToDb: connectToDb,
	Bus: require('./Bus'),
	Location: require('./Location'),
	Route: require('./Route'),
	Journey: require('./Journey'),
	Employee: require('./Employee'),
	Role: mongoose.model('roles', new mongoose.Schema({}), 'roles'),
	Seat: require('./Seat'),
	BookedSeat: require('./BookedSeat'),
};
