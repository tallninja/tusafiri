const router = require('express').Router();

router.use('/bookings', require('./booking.routes'));

router.use('/invoices', require('./invoice.routes'));

module.exports = router;
