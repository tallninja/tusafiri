const mongoose = require('mongoose');

const { db } = require('../../config');
const { FeedbackType, FEEDBACK_TYPES } = require('./FeedbackType');
const Feedback = require('./Feedback');

const innitDb = () => {
	const feedbackTypes = Object.values(FEEDBACK_TYPES);

	FeedbackType.estimatedDocumentCount((err, count) => {
		if (err) {
			console.log('Error:', err);
		} else {
			if (count === 0) {
				feedbackTypes.forEach((feedbackType) => {
					new FeedbackType({ name: feedbackType }).save((err, type) => {
						if (err) {
							console.log('Error:', err);
						} else {
							console.log('Info:', `${type.name} was created.`);
						}
					});
				});
			}
		}
	});
};

const connectToDb = () => {
	mongoose.connect(db.MONGO_URI, (err) => {
		if (err) {
			console.log('Error:', err);
		} else {
			console.log('Info:', 'Connected to database.');
			innitDb();
		}
	});
};

module.exports = {
	connectToDb,
	FeedbackType,
	FEEDBACK_TYPES,
	Feedback,
};
