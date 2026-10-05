const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
      default: null,
    },
    userName: {
      type: String,
      default: 'Guest User',
    },
    userEmail: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      required: true,
      index: true,
      // 'registration', 'login', 'first_login', 'technical_hub', 'coding_hub', 'developer_tools', 'project_view', 'project_manage', 'career_hub', 'quiz_complete', 'general'
    },
    module: {
      type: String,
      required: true,
      index: true,
      // 'Auth', 'Technical Hub', 'Coding Hub', 'Developer Tools', 'Project Hub', 'Career Hub', 'Quiz'
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    ipAddress: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Index to quickly query daily, weekly, and monthly activity
ActivitySchema.index({ createdAt: -1 });
ActivitySchema.index({ type: 1, createdAt: -1 });
ActivitySchema.index({ module: 1, createdAt: -1 });

module.exports = mongoose.model('Activity', ActivitySchema);
