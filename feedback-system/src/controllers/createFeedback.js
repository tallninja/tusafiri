const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Feedback, FeedbackType, FEEDBACK_TYPES } = require('../models');

const handleError = (err, res) => {
	console.log('Error:', err);
	return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};

const FeedbackSchema = Joi.object({
	type: Joi.string(),
	email: Joi.string().email({ allowFullyQualified: ['.com', '.ke', '.edu'] }),
	title: Joi.string(),
	content: Joi.string(),
});

module.exports = async (req, res) => {
	try {
		const feedbackDetails = await FeedbackSchema.validateAsync(req.body);
		const feedbackType = await FeedbackType.findOne({
			name: feedbackDetails.type,
		});

		if (!feedbackType) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: `${feedbackDetails.type} does not exist.` });
		}

		feedbackDetails.type = feedbackType._id;
		feedbackDetails.createdAt = new Date();

		const newFeedback = await Feedback(feedbackDetails).save();
		console.log('Info:', `Feedback ${newFeedback._id} was created.`);

		return res.status(Sc.OK).json(newFeedback);
	} catch (err) {
		handleError(err, res);
	}
};
