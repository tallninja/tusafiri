const router = require('express').Router();

const {
	addJourney,
	editJourney,
	deleteJourney,
	getJourney,
	getJourneys,
	searchJourney,
	getAvailableJourneys,
} = require('../controllers/journey.controllers');

router.get('/', getJourneys);
router.post('/', addJourney);
router.patch('/:id', editJourney);
router.delete('/:id', deleteJourney);
router.get('/available', getAvailableJourneys);
router.get('/search', searchJourney);
router.get('/:id', getJourney);

module.exports = router;
