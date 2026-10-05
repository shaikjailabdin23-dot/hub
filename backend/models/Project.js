const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    problemStatement: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    category: {
      type: String,
      required: [true, 'Project category is required'],
      enum: [
        'Personal Projects',
        'Academic Projects',
        'Web Projects',
        'Java Projects',
        'Python Projects',
        'AI Projects',
        'Open Source',
        'Hackathon Projects',
      ],
      default: 'Web Projects',
    },
    technologies: [{
      type: String,
      trim: true,
    }],
    role: {
      type: String,
      default: 'Full Stack Developer',
    },
    features: [{
      type: String,
    }],
    githubUrl: {
      type: String,
      default: '',
    },
    demoUrl: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Completed', 'In Progress', 'Production Ready', 'Beta'],
      default: 'Production Ready',
    },
    challenges: {
      type: String,
      default: '',
    },
    solutions: {
      type: String,
      default: '',
    },
    lessonsLearned: {
      type: String,
      default: '',
    },
    outcome: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', ProjectSchema);
