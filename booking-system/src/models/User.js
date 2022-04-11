const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		_id: { type: mongoose.Schema.Types.ObjectId },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		phoneNo: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		confirmed: { type: Boolean, default: false },
		createdAt: { type: Date },
		updatedAt: { type: Date },
	},
	{ collection: 'users' }
);

module.exports = mongoose.model('users', UserSchema);
