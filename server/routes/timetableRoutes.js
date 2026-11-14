const express = require('express');
const router = express.Router();
const { getTimetable, addTimetableEntry } = require('../controllers/timetableController');

router.get('/', getTimetable);
router.post('/', addTimetableEntry);

module.exports = router;
