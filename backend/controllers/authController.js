const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Activity = require('../models/Activity');
const { sendAdminNotification, ADMIN_EMAIL } = require('../services/emailService');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'hub_learning_secret_jwt_key_2026_super_secure', {
    expiresIn: '30d',
  });
};

// @desc    Register a new student
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    let { college, branch, year, semester } = req.body;

    // Validate presence of core required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Full name, email, and password are required.',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Prevent anyone from registering as or with the admin email
    if (normalizedEmail === ADMIN_EMAIL.toLowerCase() || normalizedEmail === 'shaikjailabdin23@gmail.com' || normalizedEmail === 'admin@hub.edu') {
      return res.status(403).json({
        success: false,
        message: 'Administrator accounts cannot be registered publicly. Please log in directly with your admin credentials.',
      });
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    // Validate password confirmation if provided
    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match.',
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists. Please log in.',
      });
    }

    // Hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Apply resilient defaults for optional educational fields if omitted
    college = (college && String(college).trim()) || 'Global Institute of Technology';
    branch = (branch && String(branch).trim()) || 'Computer Science and Engineering';
    year = (year && String(year).trim()) || '1st Year';
    semester = (semester && String(semester).trim()) || '1st Semester';

    // Create user strictly with role: 'student' (Requirement: Students/users must never receive Admin permissions)
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      college,
      branch,
      year,
      semester,
      streak: 7,
      role: 'student',
      lastLogin: new Date(),
      lastActive: new Date(),
      loginCount: 1,
      modulesUsed: ['Auth'],
    });

    // Record registration activity in DB
    await Activity.create({
      user: user._id,
      userName: user.name,
      userEmail: user.email,
      type: 'registration',
      module: 'Auth',
      details: { college, branch, year },
      ipAddress: req.ip || '',
    }).catch((e) => console.error('[Activity] Error logging registration:', e.message));

    // Send instant admin email notification
    sendAdminNotification({
      title: 'New Student Registration',
      userName: user.name,
      userEmail: user.email,
      activityType: 'Student Registration',
      details: {
        college: user.college,
        branch: user.branch,
        year: user.year,
        registeredAt: user.createdAt,
      },
    }).catch((e) => console.error('[Email Notification Error]:', e.message));

    const token = generateToken(user._id);

    return res.status(201).json({
      success: true,
      message: 'Account successfully registered!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        college: user.college,
        branch: user.branch,
        year: user.year,
        semester: user.semester,
        streak: user.streak,
        role: 'student',
        lastLogin: user.lastLogin,
        lastActive: user.lastActive,
        loginCount: user.loginCount,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('[Register Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during registration. Please try again later.',
    });
  }
};

// @desc    Authenticate user (student or admin) & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please enter both email and password.',
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const adminEmail = (process.env.ADMIN_EMAIL || 'shaikjailabdin23@gmail.com').toLowerCase().trim();
    const adminDemoPass = process.env.ADMIN_PASSWORD || 'admin123';

    // Check for user
    let user = await User.findOne({ email: normalizedEmail });

    // Auto-provision specified Admin account if not yet in database
    if (!user && (normalizedEmail === adminEmail || normalizedEmail === 'shaikjailabdin23@gmail.com')) {
      const salt = await bcrypt.genSalt(10);
      const adminPass = await bcrypt.hash(adminDemoPass, salt);
      user = await User.create({
        name: 'Shaik Jailabdin',
        email: normalizedEmail,
        password: adminPass,
        role: 'admin',
        college: 'Hub Learning Administration',
        branch: 'System Architecture',
        year: 'Faculty / Admin',
        semester: 'Staff',
        streak: 30,
        loginCount: 0,
        modulesUsed: ['Admin Dashboard', 'Project Hub', 'Technical Hub'],
      });
      console.log(`[Auth] Auto-provisioned designated admin account: ${normalizedEmail}`);
    }

    // Secondary fallback for legacy admin@hub.edu demo
    if (!user && (normalizedEmail === 'admin@hub.edu' || normalizedEmail === 'administrator@hub.edu')) {
      const salt = await bcrypt.genSalt(10);
      const adminPass = await bcrypt.hash('admin123', salt);
      user = await User.create({
        name: 'Platform Administrator',
        email: 'admin@hub.edu',
        password: adminPass,
        role: 'admin',
        college: 'Hub Learning Administration',
        branch: 'System Engineering',
        year: 'Faculty / Admin',
        semester: 'Staff',
        streak: 30,
        loginCount: 0,
      });
    }

    // Demo student fallback alias
    if (!user && (normalizedEmail === 'alex.student@hub.edu' || normalizedEmail === 'demo@hub.edu')) {
      user = await User.findOne({ email: 'student@hub.edu' });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password. Please verify your credentials.',
      });
    }

    // Check password securely using bcrypt comparison
    let isMatch = await bcrypt.compare(password, user.password);

    // Fallback for environment configured demo credentials during local development
    if (!isMatch && adminDemoPass && password === adminDemoPass) {
      const isDesignatedAdmin = user.email === adminEmail || user.email === 'shaikjailabdin23@gmail.com' || user.email === 'admin@hub.edu';
      if (isDesignatedAdmin) {
        isMatch = true;
      }
    }

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password. Please verify your credentials.',
      });
    }

    // Update login count and timestamps
    const isFirstLogin = !user.loginCount || user.loginCount === 0;
    user.loginCount = (user.loginCount || 0) + 1;
    user.lastLogin = new Date();
    user.lastActive = new Date();
    if (!user.modulesUsed) user.modulesUsed = [];
    if (!user.modulesUsed.includes('Auth')) user.modulesUsed.push('Auth');
    await user.save();

    // Log Activity
    await Activity.create({
      user: user._id,
      userName: user.name,
      userEmail: user.email,
      type: isFirstLogin ? 'first_login' : 'login',
      module: 'Auth',
      details: { role: user.role, loginCount: user.loginCount },
      ipAddress: req.ip || '',
    }).catch(() => {});

    // Notification condition: user logs in for the first time
    if (isFirstLogin && user.role !== 'admin') {
      sendAdminNotification({
        title: 'User First-Time Login',
        userName: user.name,
        userEmail: user.email,
        activityType: 'First Login',
        details: {
          college: user.college,
          branch: user.branch,
          time: user.lastLogin,
        },
      }).catch((e) => console.error('[Email Notification Error]:', e.message));
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: 'Successfully logged in!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        college: user.college,
        branch: user.branch,
        year: user.year,
        semester: user.semester,
        streak: user.streak,
        role: user.role || 'student',
        lastLogin: user.lastLogin,
        lastActive: user.lastActive,
        loginCount: user.loginCount,
        modulesUsed: user.modulesUsed,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('[Login Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during login. Please try again later.',
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found.',
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('[GetMe Error]:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve user profile.',
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
};
