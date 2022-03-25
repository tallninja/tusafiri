const router = require('express').Router();

const {
  addLocation,
  editLocation,
  deleteLocation,
  getLocation,
  getLocations,
} = require('../controllers/location.controllers');

router.get('/', getLocations);
router.get('/:id', getLocation);
router.post('/new', addLocation);
router.patch('/edit/', editLocation);
router.delete('/delete/', deleteLocation);

module.exports = router;
