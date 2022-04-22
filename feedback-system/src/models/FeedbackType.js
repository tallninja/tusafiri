const { default: mongoose } = require('mongoose');
const mondoose = require('mongoose');

const FeedbackTypeSchema = new mongoose.Schema({
	name: { type: String, required: true, unique: true },
});

const FEEDBACK_TYPES = {
	suggestion: 'suggestion',
	query: 'query',
	complaint: 'complaint',
	complement: 'complement',
};

module.exports = {
	FeedbackType: mongoose.model('FeedbackType', FeedbackTypeSchema),
	FEEDBACK_TYPES,
};
