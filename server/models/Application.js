const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String },
  gradeApplying: { type: String, required: true },
  sport: { type: String, required: true },
  primaryPosition: { type: String },
  currentRating: { type: String },
  parentName: { type: String, required: true },
  parentEmail: { type: String, required: true },
  parentPhone: { type: String },
  previousSchool: { type: String },
  status: {
    type: String,
    enum: ['Submitted', 'Under Review', 'Trial Scheduled', 'Offer Extended', 'Accepted', 'Enrolled', 'Rejected'],
    default: 'Submitted'
  },
  trialDate: { type: Date },
  trialLocation: { type: String },
  notes: [{
    author: String,
    text: String,
    date: { type: Date, default: Date.now }
  }],
  documents: [{
    name: String,
    url: String,
    size: String
  }],
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Application || mongoose.model('Application', applicationSchema);
