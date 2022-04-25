const router = require('express').Router();

const employeesRoutes = require('./employees.routes');

router.use('/employees', employeesRoutes);

module.exports = router;
