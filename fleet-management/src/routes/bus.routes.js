const router = require('express').Router();

const {
	addBus,
	editBus,
	deleteBus,
	getBus,
	getBuses,
	getSeats,
} = require('../controllers/bus.controllers');

router.get('/', getBuses);
router.get('/seats/:bus', getSeats);
router.get('/:id', getBus);
router.post('/new', addBus);
router.patch('/edit/', editBus);
router.delete('/delete/', deleteBus);

module.exports = router;
