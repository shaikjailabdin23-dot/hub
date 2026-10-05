const Hub = require('../models/Hub');
const Topic = require('../models/Topic');

// @desc    Get all 5 Hubs
// @route   GET /api/hubs
// @access  Public
const getHubs = async (req, res) => {
  try {
    const hubs = await Hub.find().sort({ createdAt: 1 });

    // Dynamic topic counting
    const hubsWithStats = await Promise.all(
      hubs.map(async (hub) => {
        const count = await Topic.countDocuments({ hubSlug: hub.slug });
        return {
          ...hub.toObject(),
          topicsCount: count || hub.topicsCount,
        };
      })
    );

    return res.status(200).json({
      success: true,
      count: hubsWithStats.length,
      data: hubsWithStats,
    });
  } catch (error) {
    console.error('[GetHubs Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch hubs.',
    });
  }
};

// @desc    Get single Hub by slug or ID
// @route   GET /api/hubs/:id
// @access  Public
const getHubById = async (req, res) => {
  try {
    const { id } = req.params;
    let hub;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      hub = await Hub.findById(id);
    } else {
      hub = await Hub.findOne({ slug: id.toLowerCase() });
    }

    if (!hub) {
      return res.status(404).json({
        success: false,
        message: 'Hub not found.',
      });
    }

    const topics = await Topic.find({ hubSlug: hub.slug }).select('title slug category difficulty estimatedTime description');

    return res.status(200).json({
      success: true,
      data: {
        ...hub.toObject(),
        topics,
        topicsCount: topics.length,
      },
    });
  } catch (error) {
    console.error('[GetHubById Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch hub details.',
    });
  }
};

module.exports = {
  getHubs,
  getHubById,
};
