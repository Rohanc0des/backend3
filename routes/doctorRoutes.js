const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { auth, isAdmin } = require('../middleware/auth');

router.post('/', auth, isAdmin, doctorController.create);
router.put('/:id', auth, isAdmin, doctorController.update);
router.delete('/:id', auth, isAdmin, doctorController.delete);
router.get('/', doctorController.list);

module.exports = router;
