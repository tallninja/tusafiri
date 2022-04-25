const router = require('express').Router();

const {
	getTicket,
	getTickets,
	getBookingTickets,
	deleteTicket,
} = require('../controllers/ticket.controllers');

router.get('/', getTickets);
router.delete('/delete', deleteTicket);
router.get('/:id', getTicket);
router.get('/booking/:booking', getBookingTickets);

module.exports = router;
