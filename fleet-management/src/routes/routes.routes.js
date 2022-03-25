const router = require('express').Router();

const {
  addRoute,
  editRoute,
  deleteRoute,
  getRoute,
  getRoutes,
} = require('../controllers/route.controllers');

router.get('/', getRoutes);
router.get('/:id', getRoute);
router.post('/new', addRoute);
router.patch('/edit', editRoute);
router.delete('/delete', deleteRoute);

module.exports = router;
