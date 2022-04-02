const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	idNo: { type: Number, required: true, unique: true, index: true },
	email: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	employeeId: { type: String, required: true, unique: true, index: true },
	password: { type: String, required: true },
	role: { type: mongoose.Schema.Types.ObjectId, ref: 'roles' },
	createdAt: { type: Date },
	updatedAt: { type: Date },
});

module.exports = mongoose.model('employees', EmployeeSchema);
