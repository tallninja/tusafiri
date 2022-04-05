const router = require('express').Router();

const authControllers = require('../controllers').auth;
const { verifyToken } = require('../middlewares/auth');

router.post('/users/signup', authControllers.users.signup);
router.post('/users/signin', authControllers.users.signin);
router.get('/users/refresh-token', authControllers.users.refreshToken);
router.get('/users/signout', [verifyToken], authControllers.users.signout);

module.exports = router;
