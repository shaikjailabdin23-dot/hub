const mongoose = require('mongoose');

const HubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'Core Education',
    },
    topicsCount: {
      type: Number,
      default: 0,
    },
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '#6c63ff',
    },
    gradient: {
      type: String,
      default: 'linear-gradient(135deg, #6c63ff 0%, #00d4ff 100%)',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Hub', HubSchema);
