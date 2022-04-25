const router = require('express').Router();

const { verifyToken, isAdmin } = require('../middlewares/auth');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');

router.use('/auth', authRoutes);
router.use('/users', [verifyToken, isAdmin], userRoutes);

module.exports = router;
