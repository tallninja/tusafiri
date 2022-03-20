const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  code: { type: String, unique: true, required: true },
  lat: { type: Number },
  lng: { type: Number },
});

module.exports = mongoose.model('locations', LocationSchema);
