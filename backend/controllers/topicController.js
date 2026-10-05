const Topic = require('../models/Topic');
const Progress = require('../models/Progress');

// @desc    Get all Topics (supports filter by hub, category, search)
// @route   GET /api/topics
// @access  Public / Optional Auth
const getTopics = async (req, res) => {
  try {
    const { hub, category, difficulty, search } = req.query;
    const filter = {};

    if (hub) {
      filter.hubSlug = hub.toLowerCase();
    }
    if (category) {
      filter.category = category;
    }
    if (difficulty) {
      filter.difficulty = difficulty;
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    const topics = await Topic.find(filter).sort({ category: 1, title: 1 });

    // If user is authenticated, attach their completion status
    let topicsWithProgress = topics.map((t) => t.toObject());
    if (req.user) {
      const userProgress = await Progress.find({ user: req.user._id });
      const completedMap = new Map();
      userProgress.forEach((p) => {
        completedMap.set(p.topicSlug, p.completed);
      });

      topicsWithProgress = topicsWithProgress.map((topic) => ({
        ...topic,
        isCompleted: !!completedMap.get(topic.slug),
      }));
    }

    return res.status(200).json({
      success: true,
      count: topicsWithProgress.length,
      data: topicsWithProgress,
    });
  } catch (error) {
    console.error('[GetTopics Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch topics.',
    });
  }
};

// @desc    Get single Topic by slug or ID
// @route   GET /api/topics/:id
// @access  Public / Optional Auth
const getTopicById = async (req, res) => {
  try {
    const { id } = req.params;
    let topic;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      topic = await Topic.findById(id);
    } else {
      topic = await Topic.findOne({ slug: id.toLowerCase() });
    }

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found.',
      });
    }

    let isCompleted = false;
    let quizScore = null;

    if (req.user) {
      const progress = await Progress.findOne({
        user: req.user._id,
        topicSlug: topic.slug,
      });
      if (progress) {
        isCompleted = progress.completed;
        quizScore = progress.quizScore;
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        ...topic.toObject(),
        isCompleted,
        quizScore,
      },
    });
  } catch (error) {
    console.error('[GetTopicById Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch topic details.',
    });
  }
};

module.exports = {
  getTopics,
  getTopicById,
};
