const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    hubSlug: {
      type: String,
      required: true,
      enum: ['technical', 'skills', 'coding', 'career', 'project'],
    },
    topicSlug: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
    },
    quizScore: {
      type: Number,
      default: null,
    },
    quizTotal: {
      type: Number,
      default: null,
    },
    percentage: {
      type: Number,
      default: 0,
    },
    attempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure unique entry per user per topic
ProgressSchema.index({ user: 1, topicSlug: 1 }, { unique: true });

module.exports = mongoose.model('Progress', ProgressSchema);
