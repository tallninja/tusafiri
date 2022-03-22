const router = require('express').Router();

const {
  addEmployee,
  editEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  changePassword,
  changeRole,
} = require('../controllers/employee.controllers');

router.get('/', getEmployees);
router.get('/:id', getEmployee);
router.post('/new', addEmployee);
router.patch('/edit/:id', editEmployee);
router.delete('/delete/:id', deleteEmployee);
router.patch('/change-password', changePassword);
router.patch('/change-role', changeRole);

module.exports = router;
