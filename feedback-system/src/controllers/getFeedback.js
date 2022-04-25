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
		const feedback = await Feedback.findById(id).populate(['type']).exec();

		if (!feedback) {
			return res
				.status(Sc.BAD_REQUEST)
				.json({ message: 'Feedback not found.' });
		}

		return res.status(Sc.OK).json(feedback);
	} catch (err) {
		handleError(err, res);
	}
};
