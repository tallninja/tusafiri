const router = require('express').Router();

const {
	addBus,
	editBus,
	deleteBus,
	getBus,
	getBuses,
	getSeats,
} = require('../controllers/bus.controllers');

router.post('/', addBus);
router.get('/', getBuses);
router.patch('/:id', editBus);
router.delete('/:id', deleteBus);
router.get('/seats/:bus', getSeats);
router.get('/:id', getBus);

module.exports = router;
