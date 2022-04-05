const router = require('express').Router();

const {
	createFeedback,
	deleteFeedback,
	getFeedback,
	getFeedbacks,
} = require('../controllers');

router.get('/', getFeedbacks);
router.get('/:id', getFeedback);
router.post('/new', createFeedback);
router.delete('/delete', deleteFeedback);

module.exports = router;
