const router = require('express').Router();
const { StatusCodes: Sc } = require('http-status-codes');

router.get('/', (req, res) => {
  return res.status(Sc.OK).json({ message: 'Passenger management API' });
});

module.exports = router;
