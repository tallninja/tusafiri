const router = require('express').Router();

const {
  addEmployee,
  editEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  changePassword,
  changeRole,
  getDrivers,
  getFleetManagers,
  getSnmManagers,
  getShd,
} = require('../controllers/employee.controllers');

router.get('/', getEmployees);
router.get('/drivers', getDrivers);
router.get('/fleet-managers', getFleetManagers);
router.get('/snm-managers', getSnmManagers);
router.get('/help-desk', getShd);
router.get('/:id', getEmployee);
router.post('/new', addEmployee);
router.patch('/edit/', editEmployee);
router.delete('/delete/', deleteEmployee);
router.patch('/change-password', changePassword);
router.patch('/change-role', changeRole);

module.exports = router;
