const Progress = require('../models/Progress');
const Topic = require('../models/Topic');
const Project = require('../models/Project');
const Quiz = require('../models/Quiz');
const User = require('../models/User');

// @desc    Get complete progress summary for authenticated user
// @route   GET /api/progress
// @access  Private
const getProgress = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch user record for streak
    const user = await User.findById(userId);

    // Fetch user progress records
    const progressList = await Progress.find({ user: userId });

    // Fetch total topics per hub
    const allTopics = await Topic.find().select('title slug hubSlug category');
    const totalProjects = await Project.countDocuments({ user: userId });
    const totalQuizzes = await Quiz.countDocuments();

    const hubs = ['technical', 'skills', 'coding', 'career', 'project'];
    const hubStats = {};

    hubs.forEach((hub) => {
      const hubTopics = allTopics.filter((t) => t.hubSlug === hub);
      const hubProgress = progressList.filter((p) => p.hubSlug === hub);
      const completedTopics = hubProgress.filter((p) => p.completed).length;

      let percentage = 0;
      if (hub === 'project') {
        // Projects hub progress is based on projects created (e.g. 5 projects = 100%)
        percentage = Math.min(100, Math.round((totalProjects / 5) * 100));
      } else {
        percentage = hubTopics.length > 0 ? Math.round((completedTopics / hubTopics.length) * 100) : 0;
      }

      hubStats[hub] = {
        total: hub === 'project' ? 5 : hubTopics.length,
        completed: hub === 'project' ? totalProjects : completedTopics,
        percentage,
      };
    });

    // Completed topics count
    const completedTopicsCount = progressList.filter((p) => p.completed).length;

    // Quizzes completed (quizScore != null)
    const completedQuizzesList = progressList.filter((p) => p.quizScore !== null);
    const completedQuizzesCount = completedQuizzesList.length;

    // Average Quiz Score
    const avgQuizScore = completedQuizzesCount > 0
      ? Math.round(completedQuizzesList.reduce((acc, curr) => acc + (curr.quizScore || 0), 0) / completedQuizzesCount)
      : 0;

    // Overall Progress calculation
    const totalTopicsCount = allTopics.length || 1;
    const overallTopicRatio = completedTopicsCount / totalTopicsCount;
    const overallQuizRatio = totalQuizzes > 0 ? completedQuizzesCount / totalQuizzes : 0;
    const overallProjectRatio = Math.min(1, totalProjects / 5);

    const overallPercentage = Math.min(
      100,
      Math.round((overallTopicRatio * 0.5 + overallQuizRatio * 0.3 + overallProjectRatio * 0.2) * 100)
    );

    // Recently studied topics
    const recentProgress = await Progress.find({ user: userId })
      .sort({ updatedAt: -1 })
      .limit(5);

    const recentTopicSlugs = recentProgress.map((p) => p.topicSlug);
    const recentTopics = allTopics.filter((t) => recentTopicSlugs.includes(t.slug));

    return res.status(200).json({
      success: true,
      data: {
        overallPercentage,
        completedTopicsCount,
        totalTopicsCount,
        completedQuizzesCount,
        totalQuizzesCount: totalQuizzes,
        avgQuizScore,
        totalProjects,
        streak: user?.streak || 7,
        hubStats,
        recentTopics,
        progressList,
      },
    });
  } catch (error) {
    console.error('[GetProgress Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve progress data.',
    });
  }
};

// @desc    Update topic completion or quiz progress
// @route   POST /api/progress
// @access  Private
const updateProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { topicSlug, hubSlug, completed, quizScore, quizTotal } = req.body;

    if (!topicSlug || !hubSlug) {
      return res.status(400).json({
        success: false,
        message: 'Topic slug and Hub slug are required.',
      });
    }

    const setFields = {
      user: userId,
      hubSlug: hubSlug.toLowerCase(),
      topicSlug: topicSlug.toLowerCase(),
      updatedAt: new Date(),
    };

    if (completed !== undefined) {
      setFields.completed = Boolean(completed);
      if (completed) {
        setFields.completedAt = new Date();
      }
    }

    const updateDoc = { $set: setFields };

    if (quizScore !== undefined && quizScore !== null) {
      setFields.quizScore = Number(quizScore);
      if (quizTotal) setFields.quizTotal = Number(quizTotal);
      setFields.percentage = Math.round((Number(quizScore) / (Number(quizTotal) || 100)) * 100);
      updateDoc.$inc = { attempts: 1 };
    }

    const updated = await Progress.findOneAndUpdate(
      { user: userId, topicSlug: topicSlug.toLowerCase() },
      updateDoc,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Progress saved successfully.',
      data: updated,
    });
  } catch (error) {
    console.error('[UpdateProgress Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update progress.',
    });
  }
};

module.exports = {
  getProgress,
  updateProgress,
};
