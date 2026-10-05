const express = require('express');
const router = express.Router();
const {
  getAdminStats,
  getAdminUsers,
  getAdminActivity,
  triggerWeeklyReport,
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// All admin routes strictly require valid authentication and role === 'admin'
router.use(protect);
router.use(adminOnly);

router.get('/stats', getAdminStats);
router.get('/users', getAdminUsers);
router.get('/activity', getAdminActivity);
router.post('/send-weekly-report', triggerWeeklyReport);

module.exports = router;
