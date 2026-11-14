const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  invoiceNo: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  dueDate: { type: Date, required: true },
  breakdown: [{
    item: String,
    amount: Number
  }],
  status: { type: String, enum: ['Pending', 'Paid', 'Overdue'], default: 'Pending' },
  paidAt: { type: Date },
  paymentMethod: { type: String },
  gatewayRef: { type: String }
});

module.exports = mongoose.models.Fee || mongoose.model('Fee', feeSchema);
