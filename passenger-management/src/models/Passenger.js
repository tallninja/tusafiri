const mongoose = require('mongoose');

const PassengerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  idNo: { type: Number, required: true, unique: true, index: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

module.exports = mongoose.model('passengers', PassengerSchema);
