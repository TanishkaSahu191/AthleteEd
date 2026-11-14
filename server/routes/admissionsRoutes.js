const express = require('express');
const router = express.Router();
const {
  submitApplication,
  getApplications,
  updateApplicationStatus
} = require('../controllers/admissionsController');

router.post('/', submitApplication);
router.get('/', getApplications);
router.patch('/:id/status', updateApplicationStatus);

module.exports = router;
