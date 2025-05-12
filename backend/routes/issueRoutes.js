const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');
const auth = require('../middlewares/auth');
const adminOnly = require('../middlewares/adminOnly');

router.post('/', auth, issueController.submitIssue);
router.get('/', auth, adminOnly, issueController.getAllIssues);

module.exports = router;