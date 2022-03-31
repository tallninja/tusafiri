const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	phoneNo: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	confirmed: { type: Boolean, default: false },
	createdAt: { type: Date },
	updatedAt: { type: Date },
});

module.exports = mongoose.model('users', UserSchema);
