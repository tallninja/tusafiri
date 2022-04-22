const router = require('express').Router();

const {
	createFeedback,
	deleteFeedback,
	getFeedback,
	getFeedbacks,
	getFeedbackTypes,
	reviewFeedback,
} = require('../controllers');

router.post('/', createFeedback);
router.get('/', getFeedbacks);
router.get('/types', getFeedbackTypes);
router.get('/:id', getFeedback);
router.delete('/:id', deleteFeedback);
router.patch('/:id/review', reviewFeedback);

module.exports = router;
