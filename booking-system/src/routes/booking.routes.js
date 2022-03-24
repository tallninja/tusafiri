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
router.patch('/edit/:id', editBooking);
router.delete('/delete/:id', deleteBooking);

module.exports = router;
