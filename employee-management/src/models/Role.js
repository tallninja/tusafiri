const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

exports.Role = mongoose.model('roles', RoleSchema);

exports.ROLES = {
  driver: 'driver',
  fleetManager: 'fleet-manager',
  helpDesk: 'help-desk',
  snmManager: 'snm-manager',
  admin: 'admin',
};
