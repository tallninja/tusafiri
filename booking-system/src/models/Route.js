const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema(
	{
		name: { type: String, unique: true },
		from: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'locations',
			required: true,
		},
		to: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'locations',
			required: true,
		},
		createdAt: { type: Date },
		updatedAt: { type: Date },
	},
	{ collection: 'routes' }
);

module.exports = mongoose.model('routes', RouteSchema);
