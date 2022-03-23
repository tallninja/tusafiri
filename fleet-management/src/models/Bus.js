const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
  regNo: { type: String, unique: true, required: true, index: true },
  make: { type: String },
  yom: { type: Number },
  capacity: { type: Number, required: true, min: 1, max: 50 },
});

module.exports = mongoose.model('buses', BusSchema);
