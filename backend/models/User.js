const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    college: {
      type: String,
      default: 'Global Institute of Technology',
      trim: true,
    },
    branch: {
      type: String,
      default: 'Computer Science and Engineering',
      trim: true,
    },
    year: {
      type: String,
      default: '1st Year',
      trim: true,
    },
    semester: {
      type: String,
      default: '1st Semester',
      trim: true,
    },
    streak: {
      type: Number,
      default: 7,
    },
    avatar: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student',
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
    loginCount: {
      type: Number,
      default: 0,
    },
    modulesUsed: [{
      type: String,
    }],
    careerProfile: {
      selectedCareer: { type: String, default: 'Software Developer' },
      education: { type: String, default: 'B.Tech' },
      branch: { type: String, default: 'Computer Science and Engineering' },
      year: { type: String, default: '3rd Year' },
      currentSkills: [{ type: String }],
      programmingLanguages: [{ type: String }],
      areasOfInterest: [{ type: String }],
      careerGoal: { type: String, default: 'Software Developer at Top Tech Company' },
      skillLevel: { type: String, default: 'Intermediate' },
      projectsCompleted: { type: Number, default: 0 },
      certifications: [{ type: String }],
      preferredTechnology: { type: String, default: 'React & Node.js' },
      completedSkills: [{ type: String }],
      completedTopics: [{ type: String }],
      projectProgress: { type: mongoose.Schema.Types.Mixed, default: {} },
      interviewProgress: [{ type: String }],
      careerReadiness: { type: Number, default: 45 },
      roadmapProgress: { type: Number, default: 40 },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', UserSchema);
