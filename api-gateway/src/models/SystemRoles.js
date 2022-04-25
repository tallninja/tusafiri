const mongoose = require('mongoose');

const SystemRolesSchema = new mongoose.Schema({
	name: { type: String, required: true },
});

const SYSTEM_ROLES = {
	user: 'user',
	employee: 'employee',
	admin: 'admin',
};

module.exports = {
	SystemRole: mongoose.model('system-roles', SystemRolesSchema),
	SYSTEM_ROLES,
};
