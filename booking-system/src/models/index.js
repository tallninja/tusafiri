const mongoose = require('mongoose');

const { db } = require('../../config');

const connectToDb = () => {
  mongoose.connect(db.MONGO_URI, (err) => {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Info:', 'Conneted to database.');
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
};
