const router = require('express').Router();

const passengersRoutes = require('./passenger.routes');

router.use('/passengers', passengersRoutes);

module.exports = router;
