const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.get('/email/:email', userController.getUserByEmail);
router.put('/update', auth, userController.updateProfile);
router.get('/favorites', auth, userController.getFavorites);
router.post('/favorites/:providerId', auth, userController.addFavorite);
router.delete('/favorites/:providerId', auth, userController.removeFavorite);

module.exports = router;