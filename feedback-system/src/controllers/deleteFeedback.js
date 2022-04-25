const { StatusCodes: Sc } = require('http-status-codes');

const { Feedback } = require('../models');

const handleError = require('../utils/handleError');

module.exports = async (req, res) => {
	const { id } = req.params;

	if (!id) {
		return res
			.status(Sc.BAD_REQUEST)
			.json({ message: 'Please provide the id.' });
	}

	try {
		const existingFeedback = await Feedback.findById(id)
			.populate(['type'])
			.exec();

		if (!existingFeedback) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: 'Feedback not found.' });
		}

		await existingFeedback.deleteOne();
		console.log('Info:', `Feedback ${existingFeedback._id} was deleted.`);

		return res.status(Sc.OK).json(existingFeedback);
	} catch (err) {
		handleError(err, res);
	}
};
