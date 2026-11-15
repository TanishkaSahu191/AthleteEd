const express = require('express');
const router = express.Router();
const {
  getMedicalRecords,
  getStudentMedicalRecord,
  updateStudentClearance
} = require('../controllers/medicalController');

router.get('/records', getMedicalRecords);
router.get('/students/:studentId', getStudentMedicalRecord);
router.patch('/clearance/:studentId', updateStudentClearance);

module.exports = router;
