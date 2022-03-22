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
router.patch('/edit/:id', editLocation);
router.delete('/delete/:id', deleteLocation);

module.exports = router;
