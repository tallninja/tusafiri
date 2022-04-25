const router = require('express').Router();
const { StatusCodes: Sc } = require('http-status-codes');

router.get('/', (req, res) => {
  res.status(Sc.OK).json({ message: 'Api Gateway' });
});

router.use('/api', require('./api.routes'));

module.exports = router;
