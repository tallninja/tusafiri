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

router.post('/', addEmployee);
router.get('/', getEmployees);
router.patch('/:id', editEmployee);
router.delete('/:id', deleteEmployee);
router.get('/drivers', getDrivers);
router.get('/fleet-managers', getFleetManagers);
router.get('/snm-managers', getSnmManagers);
router.get('/help-desk', getShd);
router.get('/:id', getEmployee);
router.patch('/employee/change-password', changePassword);
router.patch('/employee/change-role', changeRole);

module.exports = router;
