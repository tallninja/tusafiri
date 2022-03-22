const mongoose = require('mongoose');

const JourneySchema = new mongoose.Schema({
  bus: { type: mongoose.Types.ObjectId, ref: 'buses', required: true },
  route: { type: mongoose.Types.ObjectId, ref: 'routes', required: true },
  from: { type: mongoose.Types.ObjectId, ref: 'locations', required: true },
  to: { type: mongoose.Types.ObjectId, ref: 'locations', required: true },
  drivers: [
    { type: mongoose.Types.ObjectId, ref: 'employees', required: true },
  ],
  departureTime: { type: Date },
  arrivalTime: { type: Date },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('journeys', JourneySchema);
