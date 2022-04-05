const router = require('express').Router();
const { StatusCodes: Sc } = require('http-status-codes');

router.get('/', (req, res) => {
	res.status(Sc.OK).json({ message: 'Feedback System.' });
});

module.exports = router;
