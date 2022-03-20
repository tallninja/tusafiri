const router = require('express').Router();

const {
  addNewBus,
  editBus,
  deleteBus,
  getBus,
  getBuses,
  addRoute,
  removeRoute,
} = require('../controllers/bus.controllers');

router.get('/', getBuses);
router.get('/:id', getBus);
router.post('/new', addNewBus);
router.patch('/edit/:id', editBus);
router.delete('/delete/:id', deleteBus);
router.post('/add-route', addRoute);
router.post('/remove-route', removeRoute);

module.exports = router;
