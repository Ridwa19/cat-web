const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providerController');
const auth = require('../middlewares/auth');

router.patch('/availability', auth, providerController.toggleAvailability);
router.patch('/status', auth, providerController.toggleOnlineStatus);
router.patch('/location', auth, providerController.updateLocation);
router.get('/location/:providerId', auth, providerController.getProviderLocation);
router.get('/nearby', providerController.getNearbyProviders);
router.get('/earnings', auth, providerController.getEarnings);

module.exports = router;