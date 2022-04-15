const router = require('express').Router();

const {
	addRoute,
	editRoute,
	deleteRoute,
	getRoute,
	getRoutes,
} = require('../controllers/route.controllers');

router.post('/', addRoute);
router.get('/', getRoutes);
router.get('/:id', getRoute);
router.patch('/:id', editRoute);
router.delete('/:id', deleteRoute);

module.exports = router;
