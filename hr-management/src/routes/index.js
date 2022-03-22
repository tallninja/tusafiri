const { StatusCodes: Sc } = require('http-status-codes');
const router = require('express').Router();

const apiRoutes = require('./api.routes');

router.get('/', (req, res) => {
  res.status(Sc.OK).json({ message: 'Human Resource Management' });
});

router.use('/api', apiRoutes);

module.exports = router;
