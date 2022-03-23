const mongoose = require('mongoose');

const JourneySchema = new mongoose.Schema({
  bus: { type: mongoose.Types.ObjectId, ref: 'buses', required: true },
  route: { type: mongoose.Types.ObjectId, ref: 'routes', required: true },
  fare: { type: Number, required: true },
  drivers: [
    { type: mongoose.Types.ObjectId, ref: 'employees', required: true },
  ], // for safety purposes every journey should have at least 2 drivers.
  departureTime: { type: Date },
  arrivalTime: { type: Date },
  completed: { type: Boolean, default: false },
});

JourneySchema.pre('validate', (next) => {
  if (this.drivers.length < 2) {
    throw 'Journey should have at least 2 drivers';
  }
  next();
});

module.exports = mongoose.model('journeys', JourneySchema);
