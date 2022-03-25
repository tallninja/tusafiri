const router = require('express').Router();

const {
  addBus,
  editBus,
  deleteBus,
  getBus,
  getBuses,
} = require('../controllers/bus.controllers');

router.get('/', getBuses);
router.get('/:id', getBus);
router.post('/new', addBus);
router.patch('/edit/', editBus);
router.delete('/delete/', deleteBus);

module.exports = router;
