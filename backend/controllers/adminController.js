const User = require('../models/User');
const Activity = require('../models/Activity');
const Project = require('../models/Project');
const { generateWeeklyStats } = require('../services/schedulerService');
const { sendWeeklyReport } = require('../services/emailService');

// @desc    Get real platform statistics for Admin Dashboard
// @route   GET /api/admin/stats
// @access  Private (Admin only)
const getAdminStats = async (req, res) => {
  try {
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // 1. User Counts & Timeframes
    const totalRegisteredUsers = await User.countDocuments();
    const newUsersToday = await User.countDocuments({ createdAt: { $gte: oneDayAgo } });
    const newUsersThisWeek = await User.countDocuments({ createdAt: { $gte: oneWeekAgo } });
    const activeUsers = await User.countDocuments({ lastActive: { $gte: thirtyDaysAgo } });
    const dailyUsers = await User.countDocuments({ lastActive: { $gte: oneDayAgo } });
    const weeklyUsers = await User.countDocuments({ lastActive: { $gte: oneWeekAgo } });
    const monthlyUsers = await User.countDocuments({ lastActive: { $gte: thirtyDaysAgo } });

    // 2. Total Logins
    const loginSum = await User.aggregate([
      { $group: { _id: null, total: { $sum: '$loginCount' } } },
    ]);
    const totalLogins = loginSum[0]?.total || 0;

    // 3. Module Usages (from real recorded Activity logs)
    const technicalHubUsage = await Activity.countDocuments({ module: 'Technical Hub' });
    const codingHubUsage = await Activity.countDocuments({ module: 'Coding Hub' });
    const developerToolsUsage = await Activity.countDocuments({ module: 'Developer Tools' });
    const projectViews = await Activity.countDocuments({ module: 'Project Hub' });
    const careerHubUsage = await Activity.countDocuments({ module: 'Career Hub' });

    // 4. Projects count
    const totalProjects = await Project.countDocuments();

    // 5. Activity breakdown for charts (Last 7 days daily counts)
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);
      const nextD = new Date(d);
      nextD.setDate(d.getDate() + 1);

      const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      const count = await Activity.countDocuments({
        createdAt: { $gte: d, $lt: nextD },
      });
      const logins = await Activity.countDocuments({
        type: 'login',
        createdAt: { $gte: d, $lt: nextD },
      });

      last7Days.push({
        date: dayLabel,
        totalActivity: count,
        logins,
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        totalRegisteredUsers,
        newUsersToday,
        newUsersThisWeek,
        activeUsers,
        totalLogins,
        dailyUsers,
        weeklyUsers,
        monthlyUsers,
        technicalHubUsage,
        codingHubUsage,
        developerToolsUsage,
        projectViews,
        careerHubUsage,
        totalProjects,
        chartData: last7Days,
      },
    });
  } catch (error) {
    console.error('[GetAdminStats Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to aggregate admin statistics.',
    });
  }
};

// @desc    Get registered users with activity metrics
// @route   GET /api/admin/users
// @access  Private (Admin only)
const getAdminUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error('[GetAdminUsers Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve registered users list.',
    });
  }
};

// @desc    Get real platform activity stream
// @route   GET /api/admin/activity
// @access  Private (Admin only)
const getAdminActivity = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 50;
    const activities = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('user', 'name email branch role');

    return res.status(200).json({
      success: true,
      count: activities.length,
      data: activities,
    });
  } catch (error) {
    console.error('[GetAdminActivity Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve activity stream.',
    });
  }
};

// @desc    Dispatch weekly admin report on demand
// @route   POST /api/admin/send-weekly-report
// @access  Private (Admin only)
const triggerWeeklyReport = async (req, res) => {
  try {
    const stats = await generateWeeklyStats();
    const result = await sendWeeklyReport(stats);

    return res.status(200).json({
      success: true,
      message: 'Weekly platform report generated and dispatched to ' + (process.env.ADMIN_EMAIL || 'shaikjailabdin23@gmail.com'),
      result,
      stats,
    });
  } catch (error) {
    console.error('[TriggerWeeklyReport Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send weekly report: ' + error.message,
    });
  }
};

module.exports = {
  getAdminStats,
  getAdminUsers,
  getAdminActivity,
  triggerWeeklyReport,
};
