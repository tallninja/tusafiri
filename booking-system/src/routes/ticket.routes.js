const router = require('express').Router();

const {
	getTicket,
	getTickets,
	deleteTicket,
} = require('../controllers/ticket.controllers');

router.get('/', getTickets);
router.delete('/delete', deleteTicket);
router.get('/:id', getTicket);

module.exports = router;
