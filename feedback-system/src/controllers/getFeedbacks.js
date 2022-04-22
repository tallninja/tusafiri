const { StatusCodes: Sc } = require('http-status-codes');

const { Feedback, FeedbackType, FEEDBACK_TYPES } = require('../models');

const handleError = require('../utils/handleError');

module.exports = async (req, res) => {
	const { type } = req.query;

	try {
		if (!type) {
			const feedbacks = await Feedback.find()
				.sort('-createdAt')
				.populate(['type'])
				.exec();

			return res.status(Sc.OK).json(feedbacks);
		}

		if (type === FEEDBACK_TYPES.suggestion) {
			const feedbackType = await FeedbackType.findOne({
				name: FEEDBACK_TYPES.suggestion,
			}).exec();
			const suggestions = await Feedback.find({ type: feedbackType._id })
				.sort('-createdAt')
				.populate(['type'])
				.exec();

			return res.status(Sc.OK).json(suggestions);
		}

		if (type === FEEDBACK_TYPES.query) {
			const feedbackType = await FeedbackType.findOne({
				name: FEEDBACK_TYPES.query,
			}).exec();
			const queries = await Feedback.find({ type: feedbackType._id })
				.sort('-createdAt')
				.populate(['type'])
				.exec();

			return res.status(Sc.OK).json(queries);
		}

		if (type === FEEDBACK_TYPES.complement) {
			const feedbackType = await FeedbackType.findOne({
				name: FEEDBACK_TYPES.complement,
			}).exec();
			const complements = await Feedback.find({
				type: feedbackType._id,
			})
				.sort('-createdAt')
				.populate(['type'])
				.exec();

			return res.status(Sc.OK).json(complements);
		}

		if (type === FEEDBACK_TYPES.complaint) {
			const feedbackType = await FeedbackType.findOne({
				name: FEEDBACK_TYPES.complaint,
			}).exec();
			const complaints = await Feedback.find({ type: feedbackType._id })
				.sort('-createdAt')
				.populate(['type'])
				.exec();

			return res.status(Sc.OK).json(complaints);
		}
	} catch (err) {
		handleError(err, res);
	}
};
