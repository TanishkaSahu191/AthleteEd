const express = require('express');
const router = express.Router();
const {
  getChildOverview,
  updateLeaveRequest,
  payFee
} = require('../controllers/parentController');

router.get('/child-overview', getChildOverview);
router.patch('/leave-requests/:id', updateLeaveRequest);
router.post('/pay-fee', payFee);

module.exports = router;
