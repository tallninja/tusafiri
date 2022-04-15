const router = require('express').Router();

const {
	createFeedback,
	deleteFeedback,
	getFeedback,
	getFeedbacks,
} = require('../controllers');

router.post('/', createFeedback);
router.get('/', getFeedbacks);
router.get('/:id', getFeedback);
router.delete('/:id', deleteFeedback);

module.exports = router;
