const router = require('express').Router();

const {
	addBooking,
	deleteBooking,
	getBooking,
	getBookings,
	getUserBookings,
} = require('../controllers/booking.controllers');

router.get('/', getBookings);
router.post('/', addBooking);
router.get('/user', getUserBookings);
router.get('/:id', getBooking);
router.delete('/:id', deleteBooking);

module.exports = router;
