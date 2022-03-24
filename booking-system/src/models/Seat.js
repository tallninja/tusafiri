const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema({
  number: { type: Number },
  bus: { type: mongoose.Types.ObjectId },
});

module.exports = mongoose.model('seats', SeatSchema, 'seats');
