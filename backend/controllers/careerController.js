const User = require('../models/User');

// @desc    Get current student's career profile & progress
// @route   GET /api/career/profile
// @access  Private
const getCareerProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('careerProfile name email college branch year');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found.',
      });
    }

    const defaultProfile = {
      selectedCareer: 'Software Developer',
      education: user.college ? 'B.Tech' : 'Engineering Degree',
      branch: user.branch || 'Computer Science and Engineering',
      year: user.year || '3rd Year',
      currentSkills: ['HTML', 'CSS', 'JavaScript', 'Git'],
      programmingLanguages: ['JavaScript', 'Python', 'C++'],
      areasOfInterest: ['Full Stack Development', 'Cloud Computing'],
      careerGoal: 'Software Engineer at Top Tech Company',
      skillLevel: 'Intermediate',
      projectsCompleted: 2,
      certifications: ['Full Stack Web Development'],
      preferredTechnology: 'React & Node.js',
      completedSkills: ['HTML & CSS Basics', 'JavaScript Fundamentals', 'Git & GitHub Basics'],
      completedTopics: ['Variables & Data Types', 'Functions & Loops', 'DOM Manipulation'],
      projectProgress: {},
      interviewProgress: ['hr-intro', 'star-method'],
      careerReadiness: 65,
      roadmapProgress: 55,
    };

    const careerProfile = user.careerProfile && Object.keys(user.careerProfile).length > 0
      ? { ...defaultProfile, ...user.careerProfile }
      : defaultProfile;

    return res.status(200).json({
      success: true,
      data: careerProfile,
    });
  } catch (error) {
    console.error('[GetCareerProfile Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve career profile.',
    });
  }
};

// @desc    Update and persist student's career profile & progress
// @route   PUT /api/career/profile
// @access  Private
const updateCareerProfile = async (req, res) => {
  try {
    const updateData = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    // Merge incoming career profile updates
    user.careerProfile = {
      ...(user.careerProfile || {}),
      ...updateData,
    };
    user.lastActive = new Date();

    // Ensure Career Hub is in user's modulesUsed list
    if (!user.modulesUsed.includes('Career Hub')) {
      user.modulesUsed.push('Career Hub');
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Career profile and roadmap progress updated successfully!',
      data: user.careerProfile,
    });
  } catch (error) {
    console.error('[UpdateCareerProfile Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to save career progress.',
    });
  }
};

module.exports = {
  getCareerProfile,
  updateCareerProfile,
};
