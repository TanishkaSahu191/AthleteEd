const { students, fees, leaveRequests } = require('../data/demoData');

// GET /api/v1/parent/child-overview
const getChildOverview = (req, res) => {
  // Demo default: Leo Jenkins
  const student = students[0];

  const studentFees = fees.filter(f => f.studentId === student.id);
  const studentLeave = leaveRequests.filter(l => l.studentId === student.id);

  return res.status(200).json({
    success: true,
    student,
    fees: studentFees,
    leaveRequests: studentLeave
  });
};

// PATCH /api/v1/parent/leave-requests/:id
const updateLeaveRequest = (req, res) => {
  const { id } = req.params;
  const { action, comment } = req.body; // action: 'approve' | 'reject'

  const request = leaveRequests.find(l => l.id === id);
  if (!request) {
    return res.status(404).json({ success: false, message: 'Leave request not found' });
  }

  if (action === 'approve') {
    request.parentApprovalStatus = 'Approved';
    request.parentApprovedAt = new Date().toISOString();
    request.parentComment = comment || 'Approved by parent';
    request.wardenApprovalStatus = 'Pending Warden Review';
  } else if (action === 'reject') {
    request.parentApprovalStatus = 'Rejected';
    request.parentApprovedAt = new Date().toISOString();
    request.parentComment = comment || 'Declined by parent';
    request.wardenApprovalStatus = 'Declined';
  }

  return res.status(200).json({
    success: true,
    message: `Leave request has been ${request.parentApprovalStatus.toLowerCase()}!`,
    request
  });
};

// POST /api/v1/parent/pay-fee
const payFee = (req, res) => {
  const { invoiceId, paymentMethod } = req.body;

  const invoice = fees.find(f => f.id === invoiceId);
  if (!invoice) {
    return res.status(404).json({ success: false, message: 'Invoice not found' });
  }

  invoice.status = 'Paid';
  invoice.paidAt = new Date().toISOString();
  invoice.paymentMethod = paymentMethod || 'Online Credit Card (Visa **** 4092)';
  invoice.gatewayRef = `PAY_REF_${Date.now()}`;

  return res.status(200).json({
    success: true,
    message: 'Payment processed successfully! Receipt generated in real time.',
    invoice
  });
};

module.exports = {
  getChildOverview,
  updateLeaveRequest,
  payFee
};
