const router = require('express').Router();

const {
  addJourney,
  editJourney,
  deleteJourney,
  getJourney,
  getJourneys,
  addDrivers,
  getAvailableJourneys,
} = require('../controllers/journey.controllers');

router.get('/', getJourneys);
router.get('/:id', getJourney);
router.post('/new', addJourney);
router.patch('/edit/:id', editJourney);
router.delete('/delete/:id', deleteJourney);
router.patch('/add-drivers', addDrivers);
router.get('/available/all', getAvailableJourneys);

module.exports = router;
