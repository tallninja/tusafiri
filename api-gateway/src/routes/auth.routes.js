const router = require('express').Router();

const {
	signup,
	signin,
	signinAdmin,
	signout,
	refreshToken,
} = require('../controllers/auth');
const { verifyToken } = require('../middlewares/auth');

router.post('/users/signup', signup);
router.post('/users/signin', signin);
router.post('/users/signin/admin', signinAdmin);
router.get('/users/refresh-token', refreshToken);
router.get('/users/signout', [verifyToken], signout);

module.exports = router;
