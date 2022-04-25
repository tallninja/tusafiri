const router = require('express').Router();
const { StatusCodes: Sc } = require('http-status-codes');

const apiRoutes = require('./api.routes');

router.get('/', (req, res) => {
	res.status(Sc.OK).json({ message: 'Feedback System.' });
});

router.use('/api', apiRoutes);

module.exports = router;
