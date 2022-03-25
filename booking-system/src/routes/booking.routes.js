const router = require('express').Router();

const {
  addBooking,
  editBooking,
  deleteBooking,
  getBooking,
  getBookings,
} = require('../controllers/booking.controllers');

router.get('/', getBookings);
router.get('/:id', getBooking);
router.post('/new', addBooking);
router.patch('/edit/', editBooking);
router.delete('/delete/', deleteBooking);

module.exports = router;
