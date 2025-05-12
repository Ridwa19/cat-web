const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');

router.post('/', auth, serviceController.createService);
router.get('/', serviceController.getAllServices);
router.get('/category/:category', serviceController.getByCategory);
router.get('/search', serviceController.searchServices);
router.patch('/:id/approve', auth, adminOnly, serviceController.approveService);

module.exports = router;