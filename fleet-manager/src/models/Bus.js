const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
  regNo: { type: String, unique: true, required: true },
  make: { type: String },
  yom: { type: Number },
  capacity: { type: Number, required: true, min: 1, max: 30 },
  routes: [{ type: mongoose.Types.ObjectId, ref: 'routes' }],
});

module.exports = mongoose.model('buses', BusSchema);
