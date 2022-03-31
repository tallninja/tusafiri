const router = require('express').Router();

const authRoutes = require('./auth.routes');

router.use('/auth', authRoutes);

module.exports = router;
