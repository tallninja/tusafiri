const router = require('express').Router();

const {
  addJourney,
  editJourney,
  deleteJourney,
  getJourney,
  getJourneys,
  addDrivers,
} = require('../controllers/journey.controllers');

router.get('/', getJourneys);
router.get('/:id', getJourney);
router.post('/new', addJourney);
router.patch('/edit/:id', editJourney);
router.delete('/delete/:id', deleteJourney);
router.patch('/add-drivers', addDrivers);

module.exports = router;
