const cron = require('node-cron');
const User = require('../models/User');
const Activity = require('../models/Activity');
const { sendWeeklyReport } = require('./emailService');

/**
 * Calculate real weekly statistics from DB
 */
const generateWeeklyStats = async () => {
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const totalUsers = await User.countDocuments();
  const newUsersThisWeek = await User.countDocuments({ createdAt: { $gte: oneWeekAgo } });
  const activeUsers = await User.countDocuments({ lastActive: { $gte: oneWeekAgo } });

  // Compute total logins across all users
  const userLogins = await User.aggregate([
    { $group: { _id: null, total: { $sum: '$loginCount' } } },
  ]);
  const totalLogins = userLogins[0]?.total || 0;

  // Module activities in past 7 days
  const projectViews = await Activity.countDocuments({
    module: 'Project Hub',
    createdAt: { $gte: oneWeekAgo },
  });
  const codingActivity = await Activity.countDocuments({
    module: 'Coding Hub',
    createdAt: { $gte: oneWeekAgo },
  });
  const technicalHubActivity = await Activity.countDocuments({
    module: 'Technical Hub',
    createdAt: { $gte: oneWeekAgo },
  });
  const developerToolsActivity = await Activity.countDocuments({
    module: 'Developer Tools',
    createdAt: { $gte: oneWeekAgo },
  });
  const careerHubActivity = await Activity.countDocuments({
    module: 'Career Hub',
    createdAt: { $gte: oneWeekAgo },
  });

  return {
    totalUsers,
    newUsersThisWeek,
    activeUsers,
    totalLogins,
    projectViews,
    codingActivity,
    technicalHubActivity,
    developerToolsActivity,
    careerHubActivity,
    generatedAt: new Date(),
  };
};

/**
 * Initialize weekly scheduled cron job (Runs every Monday at 09:00 AM)
 */
const initWeeklyCron = () => {
  // Cron format: minute hour day-of-month month day-of-week (1 = Monday)
  cron.schedule('0 9 * * 1', async () => {
    console.log('[Scheduler] Executing scheduled weekly admin report job...');
    try {
      const stats = await generateWeeklyStats();
      await sendWeeklyReport(stats);
      console.log('[Scheduler] Scheduled weekly admin report dispatched successfully.');
    } catch (err) {
      console.error('[Scheduler] Error running weekly report job:', err.message);
    }
  });

  console.log('[Scheduler] Weekly Admin Report Cron initialized (Every Monday at 09:00 AM).');
};

module.exports = {
  initWeeklyCron,
  generateWeeklyStats,
};
