const router = require('express').Router();

const authControllers = require('../controllers').auth;

router.post('/users/signup', authControllers.users.signup);
router.post('/users/signin', authControllers.users.signin);
router.post('/users/refresh-token', authControllers.users.refreshToken);

module.exports = router;
