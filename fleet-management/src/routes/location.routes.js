const router = require('express').Router();

const {
	addLocation,
	editLocation,
	deleteLocation,
	getLocation,
	getLocations,
} = require('../controllers/location.controllers');

router.post('/', addLocation);
router.get('/', getLocations);
router.get('/:id', getLocation);
router.patch('/:id', editLocation);
router.delete('/:id', deleteLocation);

module.exports = router;
