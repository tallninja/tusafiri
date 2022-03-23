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
router.get('/:id', getEmployee);
router.post('/new', addEmployee);
router.patch('/edit/:id', editEmployee);
router.delete('/delete/:id', deleteEmployee);
router.patch('/change-password', changePassword);
router.patch('/change-role', changeRole);

router.get('/dept/drivers', getDrivers);
router.get('/dept/fleet-managers', getFleetManagers);
router.get('/dept/snm-managers', getSnmManagers);
router.get('/dept/help-desk', getShd);

module.exports = router;
