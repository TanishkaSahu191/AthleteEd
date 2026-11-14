const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: false },
  role: {
    type: String,
    enum: ['admin', 'parent', 'student', 'coach', 'teacher', 'warden', 'medical'],
    default: 'student'
  },
  status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
  avatar: { type: String },
  studentId: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
