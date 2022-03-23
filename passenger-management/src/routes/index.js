const router = require('express').Router();
const { StatusCodes: Sc } = require('http-status-codes');

const apiRoutes = require('./api.routes');

router.get('/', (req, res) => {
  return res.status(Sc.OK).json({ message: 'Passenger management API' });
});

router.use('/api', apiRoutes);

module.exports = router;
