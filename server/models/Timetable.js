const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true
  },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  type: {
    type: String,
    enum: ['academic', 'training', 'boarding', 'recovery', 'medical'],
    required: true
  },
  title: { type: String, required: true },
  category: { type: String },
  instructor: { type: String },
  location: { type: String },
  targetGroup: { type: String, required: true }
});

module.exports = mongoose.models.Timetable || mongoose.model('Timetable', timetableSchema);
