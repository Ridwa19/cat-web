const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');

router.get('/dashboard', auth, adminOnly, analyticsController.getDashboardStats);
router.get('/services', auth, adminOnly, analyticsController.getServiceTrends);

module.exports = router;
