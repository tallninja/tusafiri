const router = require('express').Router();

router.use('/bookings', require('./booking.routes'));

router.use('/invoices', require('./invoice.routes'));

router.use('/payments', require('./payment.routes'));

module.exports = router;
