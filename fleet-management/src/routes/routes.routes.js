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
router.patch('/edit/:id', editRoute);
router.delete('/delete/:id', deleteRoute);

module.exports = router;
