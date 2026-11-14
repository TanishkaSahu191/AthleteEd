const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  admissionNo: { type: String, required: true, unique: true },
  dob: { type: String },
  gradeLevel: { type: String, required: true },
  sport: { type: String, required: true },
  squad: { type: String },
  coach: { type: String },
  guardianName: { type: String },
  guardianEmail: { type: String },
  roomNo: { type: String },
  academicGPA: { type: String },
  attendanceRate: { type: Number, default: 95.0 },
  fitnessClearance: { type: String, default: 'Cleared' },
  injuryNotes: { type: String }
});

module.exports = mongoose.models.Student || mongoose.model('Student', studentSchema);
