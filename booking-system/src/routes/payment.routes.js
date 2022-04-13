const router = require('express').Router();

const {
	createPayment,
	getPayment,
	getPayments,
} = require('../controllers/payment.controllers');

router.get('/', getPayments);
router.get('/:id', getPayment);
router.post('/', createPayment);

module.exports = router;
