const router = require('express').Router();

const {
  addRoute,
  editRoute,
  deleteRoute,
  getRoute,
  getRoutes,
} = require('../controllers/routes.controllers');

router.get('/', getRoutes);
router.get('/:id', getRoute);
router.post('/new', addRoute);
router.patch('/edit', editRoute);
router.delete('/delete/:id', deleteRoute);

module.exports = router;
