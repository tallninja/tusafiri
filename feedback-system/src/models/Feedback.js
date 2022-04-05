const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
	type: { type: mongoose.Schema.Types.ObjectId, ref: 'FeedbackType' },
	email: { type: String, required: true },
	title: { type: String },
	content: { type: String },
	reviewed: { type: Boolean, default: false },
	createdAt: { type: Date },
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
