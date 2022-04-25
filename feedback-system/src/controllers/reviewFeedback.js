const { StatusCodes: Sc } = require('http-status-codes');

const { Feedback } = require('../models');
const handleError = require('../utils/handleError');

module.exports = async (req, res) => {
	const { id } = req.params;

	try {
		const feedback = await Feedback.findById(id).exec();

		if (!feedback) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: 'Feedback not found.' });
		}

		await feedback.updateOne({ $set: { reviewed: true } });

		const reviewedFeedback = await Feedback.findById(feedback._id)
			.populate(['type'])
			.exec();
		console.log('Info:', `Feedback ${feedback._id} was reviewed.`);

		return res.status(Sc.OK).json(reviewedFeedback);
	} catch (err) {
		return handleError(err, res);
	}
};
