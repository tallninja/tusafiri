const router = require('express').Router();

const {
	getInvoice,
	getInvoices,
	deleteInvoice,
} = require('../controllers/invoice.controllers');

router.get('/', getInvoices);
router.get('/:id', getInvoice);
router.delete('/delete', deleteInvoice);

module.exports = router;
