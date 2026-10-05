const express = require('express');
const router = express.Router();
const { getCareerProfile, updateCareerProfile } = require('../controllers/careerController');
const { protect } = require('../middleware/authMiddleware');

router.get('/profile', protect, getCareerProfile);
router.put('/profile', protect, updateCareerProfile);

module.exports = router;
