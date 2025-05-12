const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middlewares/auth');

router.post('/', auth, appointmentController.bookAppointment);
router.patch('/:id/status', auth, appointmentController.updateStatus);
router.get('/user', auth, appointmentController.getUserAppointments);
router.get('/provider', auth, appointmentController.getProviderAppointments);

module.exports = router;