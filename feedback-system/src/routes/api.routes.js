const router = require('express').Router();

const feedbackRoutes = require('./feedback.routes');

router.use('/feedbacks', feedbackRoutes);

module.exports = router;
