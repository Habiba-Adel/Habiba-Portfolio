const mongoose = require('mongoose');

const contributionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Contribution name/repo is required'],
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
  repositoryUrl: {
    type: String,
    required: [true, 'Repository URL is required']
  },
  technologies: {
    type: [String],
    default: []
  },
  myPullRequests: {
    type: [String],  
    default: []
  },
  learnings: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contribution', contributionSchema);