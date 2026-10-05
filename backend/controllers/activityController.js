const Activity = require('../models/Activity');
const User = require('../models/User');

// @desc    Track platform activity event
// @route   POST /api/activity/track
// @access  Public / Optional Auth
const trackActivity = async (req, res) => {
  try {
    const { module, type, details } = req.body;

    if (!module || !type) {
      return res.status(400).json({
        success: false,
        message: 'Module and Activity type are required.',
      });
    }

    let userId = null;
    let userName = 'Guest Student';
    let userEmail = '';

    if (req.user) {
      userId = req.user._id;
      userName = req.user.name;
      userEmail = req.user.email;

      // Update user's lastActive and add to modulesUsed if not already recorded
      await User.findByIdAndUpdate(req.user._id, {
        lastActive: new Date(),
        $addToSet: { modulesUsed: module },
      }).catch(() => {});
    }

    const activity = await Activity.create({
      user: userId,
      userName,
      userEmail,
      module,
      type,
      details: details || {},
      ipAddress: req.ip || req.headers['x-forwarded-for'] || '',
    });

    return res.status(201).json({
      success: true,
      data: activity,
    });
  } catch (error) {
    console.error('[TrackActivity Error]:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to record activity.',
    });
  }
};

module.exports = {
  trackActivity,
};
