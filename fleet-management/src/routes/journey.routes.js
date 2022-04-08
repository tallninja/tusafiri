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
router.get('/available', getAvailableJourneys);
router.get('/search', searchJourney);
router.get('/:id', getJourney);
router.post('/new', addJourney);
router.patch('/edit/', editJourney);
router.delete('/delete/', deleteJourney);

module.exports = router;
