const router = require('express').Router();

router.use('/bookings', require('./booking.routes'));

module.exports = router;
