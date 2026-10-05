const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    hub: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hub',
    },
    hubSlug: {
      type: String,
      required: true,
      enum: ['technical', 'skills', 'coding', 'career', 'project'],
    },
    category: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    estimatedTime: {
      type: String,
      default: '15 mins',
    },
    description: {
      type: String,
      required: true,
    },
    whatIsIt: {
      type: String,
      default: '',
    },
    deepDive: {
      type: String,
      default: '',
    },
    memoryAllocation: {
      type: String,
      default: '',
    },
    typesAndRules: {
      type: mongoose.Schema.Types.Mixed,
      default: '',
    },
    whyLearnIt: {
      type: String,
      default: '',
    },
    simpleExplanation: {
      type: String,
      default: '',
    },
    realWorldExample: {
      type: String,
      default: '',
    },
    whereUsed: {
      type: String,
      default: '',
    },
    keyPoints: [{
      type: String,
    }],
    advantages: [{
      type: String,
    }],
    commonMistakes: [{
      type: String,
    }],
    codeExample: {
      language: { type: String, default: 'javascript' },
      code: { type: String, default: '' },
      explanation: { type: String, default: '' },
    },
    practiceQuestions: [{
      question: String,
      hint: String,
      answer: String,
    }],
    relatedTopics: [{
      type: String,
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Topic', TopicSchema);
