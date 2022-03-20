const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  pointA: { type: mongoose.Types.ObjectId, ref: 'locations', required: true },
  pointB: { type: mongoose.Types.ObjectId, ref: 'locations', required: true },
});

module.exports = mongoose.model('routes', RouteSchema);
