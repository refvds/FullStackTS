const express = require('express');

const { auth } = require('../middleware/auth');
const { getAll, addEmployee, removeEmployee, getOne, edit } = require('../controllers/employees');

const router = express.Router();

router.get('/', auth, getAll);
router.get('/:id', auth, getOne);
router.post('/add', auth, addEmployee);
router.delete('/remove/:id', auth, removeEmployee);
router.put('/edit/:id', auth, edit);

module.exports = router;
