const router = require('express').Router();

const {
  addBus,
  editBus,
  deleteBus,
  getBus,
  getBuses,
  addRoute,
  removeRoute,
} = require('../controllers/bus.controllers');

router.get('/', getBuses);
router.get('/:id', getBus);
router.post('/new', addBus);
router.patch('/edit/:id', editBus);
router.delete('/delete/:id', deleteBus);
router.patch('/add-route', addRoute);
router.patch('/remove-route', removeRoute);

module.exports = router;
