const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
    maxlength: 150
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    maxlength: 200
  },
  detailedDescription: {
    type: String,
    required: [true, 'Detailed description is required']
  },
  technologies: {
    type: [String],
    default: []
  },
  videoUrl: {
    type: String,
    default: ''
  },
  githubLink: {
    type: String,
    default: ''
  },
  liveDemoLink: {
    type: String,
    default: ''
  },
  learnings: {
    type: String,
    default: ''
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);