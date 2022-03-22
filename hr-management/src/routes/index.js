const { StatusCodes: Sc } = require('http-status-codes');
const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(Sc.OK).json({ message: 'Human Resource Management' });
});

module.exports = router;
