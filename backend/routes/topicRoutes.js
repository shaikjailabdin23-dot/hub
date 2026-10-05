const express = require('express');
const router = express.Router();
const { getTopics, getTopicById } = require('../controllers/topicController');
const { optionalAuth } = require('../middleware/authMiddleware');

router.get('/', optionalAuth, getTopics);
router.get('/:id', optionalAuth, getTopicById);

module.exports = router;
