const router = require('express').Router();

const { getUser, getUsers, editUser, deleteUser } =
	require('../controllers').users;

router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/:id', editUser);
router.delete('/:id', deleteUser);

module.exports = router;
