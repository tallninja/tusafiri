const mongoose = require('mongoose');

const Seat = require('./Seat');

const BusSchema = new mongoose.Schema({
  regNo: { type: String, unique: true, required: true, index: true },
  make: { type: String },
  yom: { type: Number },
  capacity: { type: Number, required: true, min: 1, max: 50 },
  seats: [{ type: mongoose.Types.ObjectId, ref: 'seats' }],
});

BusSchema.pre('save', async function (next) {
  try {
    for (let i = 1; i <= this.capacity; i++) {
      await new Seat({
        number: i,
        bus: this._id,
      }).save();
    }
    let seats = await Seat.find({ bus: this._id });
    this.seats = seats.map((seat) => seat._id);
  } catch (err) {
    throw err;
  }
});

module.exports = mongoose.model('buses', BusSchema);
