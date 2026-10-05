const Quiz = require('../models/Quiz');
const Progress = require('../models/Progress');
const Topic = require('../models/Topic');

// @desc    Get all quizzes (summary list)
// @route   GET /api/quizzes
// @access  Public / Optional Auth
const getQuizzes = async (req, res) => {
  try {
    const { hub } = req.query;
    const filter = hub ? { hubSlug: hub.toLowerCase() } : {};

    const quizzes = await Quiz.find(filter).select('title topicSlug hubSlug difficulty passingScore questions');

    // Transform to not expose answers immediately in list view
    const formatted = quizzes.map((q) => ({
      _id: q._id,
      title: q.title,
      topicSlug: q.topicSlug,
      hubSlug: q.hubSlug,
      difficulty: q.difficulty,
      passingScore: q.passingScore,
      questionsCount: q.questions.length,
    }));

    return res.status(200).json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (error) {
    console.error('[GetQuizzes Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch quizzes.',
    });
  }
};

// @desc    Get single Quiz by topicSlug or Quiz ID (returns questions without exposing correct answers until submission)
// @route   GET /api/quizzes/:id
// @access  Public
const getQuizById = async (req, res) => {
  try {
    const { id } = req.params;
    let quiz;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      quiz = await Quiz.findById(id);
    } else {
      quiz = await Quiz.findOne({ topicSlug: id.toLowerCase() });
    }

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found for this topic.',
      });
    }

    // Sanitize questions: provide question, options, id, but DO NOT reveal correctAnswer to client before submit
    const sanitizedQuestions = quiz.questions.map((q, idx) => ({
      index: idx,
      id: q._id,
      question: q.question,
      options: q.options,
    }));

    return res.status(200).json({
      success: true,
      data: {
        _id: quiz._id,
        title: quiz.title,
        topicSlug: quiz.topicSlug,
        hubSlug: quiz.hubSlug,
        difficulty: quiz.difficulty,
        passingScore: quiz.passingScore,
        totalQuestions: quiz.questions.length,
        questions: sanitizedQuestions,
      },
    });
  } catch (error) {
    console.error('[GetQuizById Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch quiz details.',
    });
  }
};

// @desc    Submit quiz answers and evaluate score
// @route   POST /api/quizzes/:id/submit
// @access  Private / Optional Auth
const submitQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { answers } = req.body; // e.g. { "0": 1, "1": 3, ... } or array of selected indices

    let quiz;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      quiz = await Quiz.findById(id);
    } else {
      quiz = await Quiz.findOne({ topicSlug: id.toLowerCase() });
    }

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found.',
      });
    }

    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Please provide answers to evaluate.',
      });
    }

    let correctCount = 0;
    const review = [];

    quiz.questions.forEach((q, idx) => {
      const userAnswer = answers[idx] !== undefined ? Number(answers[idx]) : -1;
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) correctCount++;

      review.push({
        index: idx,
        question: q.question,
        options: q.options,
        userAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
      });
    });

    const totalQuestions = quiz.questions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = percentage >= quiz.passingScore;

    // Update progress in database if user is logged in
    let savedProgress = null;
    if (req.user) {
      const existing = await Progress.findOne({
        user: req.user._id,
        topicSlug: quiz.topicSlug,
      });

      const highestScore = existing && existing.quizScore !== null
        ? Math.max(existing.quizScore, percentage)
        : percentage;

      savedProgress = await Progress.findOneAndUpdate(
        { user: req.user._id, topicSlug: quiz.topicSlug },
        {
          $set: {
            user: req.user._id,
            hubSlug: quiz.hubSlug,
            topicSlug: quiz.topicSlug,
            completed: existing?.completed || passed,
            completedAt: existing?.completed ? existing.completedAt : (passed ? new Date() : null),
            quizScore: highestScore,
            quizTotal: totalQuestions,
            percentage: highestScore,
            updatedAt: new Date(),
          },
          $inc: { attempts: 1 },
        },
        { upsert: true, new: true }
      );
    }

    return res.status(200).json({
      success: true,
      data: {
        score: correctCount,
        totalQuestions,
        percentage,
        passed,
        passingScore: quiz.passingScore,
        correctCount,
        wrongCount: totalQuestions - correctCount,
        review,
        progress: savedProgress,
      },
    });
  } catch (error) {
    console.error('[SubmitQuiz Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to evaluate quiz submission.',
    });
  }
};

module.exports = {
  getQuizzes,
  getQuizById,
  submitQuiz,
};
