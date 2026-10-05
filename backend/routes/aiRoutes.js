const express = require('express');
const router = express.Router();
const { chatWithAi } = require('../controllers/aiController');

// @route   POST /api/ai/chat
// @desc    Career and roadmap chat endpoint (Gemini 2.5 Flash)
// @access  Public
router.post('/chat', chatWithAi);

module.exports = router;
