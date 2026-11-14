const { timetableEntries } = require('../data/demoData');

// GET /api/v1/timetable - Get unified timetable with optional day/type filters
const getTimetable = (req, res) => {
  const { day, type, targetGroup } = req.query;

  let entries = [...timetableEntries];

  if (day && day !== 'all') {
    entries = entries.filter(e => e.day.toLowerCase() === day.toLowerCase());
  }

  if (type && type !== 'all') {
    entries = entries.filter(e => e.type.toLowerCase() === type.toLowerCase());
  }

  if (targetGroup) {
    entries = entries.filter(e => e.targetGroup.toLowerCase().includes(targetGroup.toLowerCase()) || e.targetGroup === 'All Boarders');
  }

  // Detect any scheduling conflicts
  const conflicts = [];
  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      const a = entries[i];
      const b = entries[j];
      if (a.day === b.day) {
        // If times overlap
        if (a.startTime < b.endTime && a.endTime > b.startTime) {
          conflicts.push({
            entryA: a.title,
            entryB: b.title,
            day: a.day,
            timeA: `${a.startTime} - ${a.endTime}`,
            timeB: `${b.startTime} - ${b.endTime}`
          });
        }
      }
    }
  }

  return res.status(200).json({
    success: true,
    count: entries.length,
    conflictsDetected: conflicts.length > 0,
    conflicts,
    entries: entries.sort((a, b) => a.startTime.localeCompare(b.startTime))
  });
};

// POST /api/v1/timetable - Add new slot with automatic conflict detection
const addTimetableEntry = (req, res) => {
  const { day, startTime, endTime, type, title, category, instructor, location, targetGroup } = req.body;

  if (!day || !startTime || !endTime || !type || !title) {
    return res.status(400).json({ success: false, message: 'Please provide all required schedule fields.' });
  }

  // Conflict check against existing entries on that day
  const existingConflict = timetableEntries.find(
    e => e.day.toLowerCase() === day.toLowerCase() &&
    e.targetGroup === (targetGroup || 'Grade 10') &&
    startTime < e.endTime &&
    endTime > e.startTime
  );

  if (existingConflict) {
    return res.status(409).json({
      success: false,
      message: `Conflict detected with existing session: "${existingConflict.title}" (${existingConflict.startTime} - ${existingConflict.endTime}) at ${existingConflict.location}.`
    });
  }

  const newEntry = {
    id: `tt_${Date.now()}`,
    day,
    startTime,
    endTime,
    type,
    title,
    category: category || 'General Session',
    instructor: instructor || 'Academy Staff',
    location: location || 'Main Campus',
    targetGroup: targetGroup || 'Grade 10'
  };

  timetableEntries.push(newEntry);

  return res.status(201).json({
    success: true,
    message: 'Schedule slot added cleanly with zero conflicts!',
    entry: newEntry
  });
};

module.exports = {
  getTimetable,
  addTimetableEntry
};
