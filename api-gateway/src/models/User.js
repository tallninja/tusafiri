const mongoose = require('mongoose');

const { SystemRole, SYSTEM_ROLES } = require('./SystemRoles');

const UserSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	phoneNo: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	confirmed: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date },
	systemRole: { type: mongoose.Schema.Types.ObjectId, ref: 'system-roles' },
});

UserSchema.pre('save', async function (next) {
	try {
		if (!this.systemRole) {
			const systemRole = await SystemRole.findOne({ name: SYSTEM_ROLES.user });
			this.systemRole = systemRole._id;
			next();
		}
		next();
	} catch (err) {
		throw err;
	}
});

module.exports = mongoose.model('users', UserSchema);
