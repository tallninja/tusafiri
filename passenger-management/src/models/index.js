const mongoose = require('mongoose');

const { db } = require('../../config');

const Passenger = require('./Passenger');

const connectToDb = () =>
  mongoose.connect(db.MONGO_URI, (err) => {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Info:', 'Connected to database.');
    }
  });

module.exports = {
  connectToDb: connectToDb,
  Passenger: Passenger,
};
