const Joi = require('joi');
const { StatusCodes: Sc } = require('http-status-codes');

const { Feedback, FeedbackType, FEEDBACK_TYPES } = require('../models');

const handleError = require('../utils/handleError');

const FeedbackSchema = Joi.object({
	firstName: Joi.string().optional(),
	lastName: Joi.string().optional(),
	phoneNo: Joi.string().optional(),
	email: Joi.string()
		.email({ allowFullyQualified: ['.com', '.ke', '.edu'] })
		.optional(),
	type: Joi.string(),
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
