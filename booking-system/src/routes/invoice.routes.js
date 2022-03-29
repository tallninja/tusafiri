const router = require('express').Router();

const {
	getInvoices,
	deleteInvoice,
} = require('../controllers/invoice.controllers');

router.get('/', getInvoices);

router.delete('/delete', deleteInvoice);

module.exports = router;
