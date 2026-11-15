const express = require('express');
const router = express.Router();
const {
  getTimetable,
  addTimetableEntry,
  simulateConflict,
  resolveConflict
} = require('../controllers/timetableController');

router.get('/', getTimetable);
router.post('/', addTimetableEntry);
router.post('/simulate-conflict', simulateConflict);
router.post('/resolve-conflict', resolveConflict);

module.exports = router;
