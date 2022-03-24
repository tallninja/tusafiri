const mongoose = require('mongoose');

const JourneySchema = new mongoose.Schema({
  bus: { type: mongoose.Types.ObjectId },
  route: { type: mongoose.Types.ObjectId },
  fare: { type: Number },
  seats: [{ type: mongoose.Types.ObjectId }],
  drivers: [{ type: mongoose.Types.ObjectId }],
  departureTime: { type: Date },
  arrivalTime: { type: Date },
  completed: { type: Boolean },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

module.exports = mongoose.model('journeys', JourneySchema, 'journeys');
