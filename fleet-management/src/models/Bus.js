const mongoose = require('mongoose');

const Seat = require('./Seat');

const BusSchema = new mongoose.Schema({
  regNo: { type: String, unique: true, required: true, index: true },
  make: { type: String },
  yom: { type: Number },
  capacity: { type: Number, required: true, min: 1, max: 50 },
  seats: [{ type: mongoose.Types.ObjectId, ref: 'seats' }],
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

module.exports = mongoose.model('buses', BusSchema);
