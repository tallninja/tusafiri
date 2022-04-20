const router = require('express').Router();

const {
	getInvoice,
	getBookingInvoice,
	getUserInvoices,
	getInvoices,
	deleteInvoice,
} = require('../controllers/invoice.controllers');

router.get('/', getInvoices);
router.get('/:id', getInvoice);
router.delete('/delete', deleteInvoice);
router.get('/booking/:booking', getBookingInvoice);
router.get('/user', getUserInvoices);

module.exports = router;
