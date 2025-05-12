const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const auth = require('../middlewares/auth');

router.post('/', auth, notificationController.sendNotification);
router.get('/', auth, notificationController.getNotifications);

module.exports = router;