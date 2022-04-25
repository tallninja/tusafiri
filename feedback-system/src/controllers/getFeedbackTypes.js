const { StatusCodes: Sc } = require('http-status-codes');
const { FeedbackType } = require('../models');

const handleError = require('../utils/handleError');

module.exports = async (req, res) => {
	try {
		const feedbackTypes = await FeedbackType.find().exec();
		return res.status(Sc.OK).json(feedbackTypes);
	} catch (err) {
		handleError(err, res);
	}
};
