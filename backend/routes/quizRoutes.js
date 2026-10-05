const express = require('express');
const router = express.Router();
const { getQuizzes, getQuizById, submitQuiz } = require('../controllers/quizController');
const { optionalAuth } = require('../middleware/authMiddleware');

router.get('/', optionalAuth, getQuizzes);
router.get('/:id', optionalAuth, getQuizById);
router.post('/:id/submit', optionalAuth, submitQuiz);

module.exports = router;
