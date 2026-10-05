const express = require('express');
const router = express.Router();
const { trackActivity } = require('../controllers/activityController');
const { optionalAuth } = require('../middleware/authMiddleware');

router.post('/track', optionalAuth, trackActivity);

module.exports = router;
