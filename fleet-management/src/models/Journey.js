const mongoose = require('mongoose');

const JourneySchema = new mongoose.Schema({
  bus: { type: mongoose.Types.ObjectId, ref: 'buses', required: true },
  route: { type: mongoose.Types.ObjectId, ref: 'routes', required: true },
  fare: { type: Number, required: true },
  seats: [{ type: mongoose.Types.ObjectId, ref: 'seats' }],
  drivers: [{ type: mongoose.Types.ObjectId, ref: 'employees' }], // for safety purposes every journey should have at least 2 drivers.
  departureTime: { type: Date },
  arrivalTime: { type: Date },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

JourneySchema.pre('validate', (next) => {
  if (this.drivers) {
    if (this.drivers.length != 2) {
      throw 'Journey should have at least 2 drivers';
    }
    next();
  } else {
    next();
  }
});

module.exports = mongoose.model('journeys', JourneySchema);
