const router = require('express').Router();

router.use('/bookings', require('./booking.routes'));

router.use('/invoices', require('./invoice.routes'));

router.use('/payments', require('./payment.routes'));

router.use('/tickets', require('./ticket.routes'));

module.exports = router;
