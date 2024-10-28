const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { auth, isAdmin } = require('../middleware/auth');

router.post('/', auth, appointmentController.create);
router.put('/:id/approve', auth, isAdmin, appointmentController.approve);
router.put('/:id/reschedule', auth, appointmentController.reschedule);
router.get('/search', auth, appointmentController.search);

module.exports = router;
