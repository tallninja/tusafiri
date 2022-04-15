const router = require('express').Router();

const {
	createPayment,
	getPayment,
	getPayments,
} = require('../controllers/payment.controllers');

router.post('/', createPayment);
router.get('/', getPayments);
router.get('/:id', getPayment);

module.exports = router;
