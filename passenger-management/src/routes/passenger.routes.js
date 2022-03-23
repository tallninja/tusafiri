const router = require('express').Router();

const {
  addPassenger,
  editPassenger,
  deletePassenger,
  getPassenger,
  getPassengers,
  changePassword,
} = require('../controllers/passenger.controllers');

router.get('/', getPassengers);
router.get('/:id', getPassenger);
router.post('/new', addPassenger);
router.patch('/edit/:id', editPassenger);
router.delete('/delete/:id', deletePassenger);
router.patch('/change-password', changePassword);

module.exports = router;
