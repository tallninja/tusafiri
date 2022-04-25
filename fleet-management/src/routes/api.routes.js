const router = require('express').Router();

router.use('/buses', require('./bus.routes'));
router.use('/locations', require('./location.routes'));
router.use('/routes', require('./routes.routes'));
router.use('/journeys', require('./journey.routes'));

module.exports = router;
