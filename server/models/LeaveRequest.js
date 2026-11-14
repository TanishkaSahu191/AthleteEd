const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  studentName: { type: String, required: true },
  type: { type: String, required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  destination: { type: String },
  reason: { type: String, required: true },
  parentApprovalStatus: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  parentApprovedAt: { type: Date },
  parentComment: { type: String },
  wardenApprovalStatus: { type: String, enum: ['Pending', 'Approved', 'Declined'], default: 'Pending' },
  gatePassGenerated: { type: Boolean, default: false }
});

module.exports = mongoose.models.LeaveRequest || mongoose.model('LeaveRequest', leaveRequestSchema);
