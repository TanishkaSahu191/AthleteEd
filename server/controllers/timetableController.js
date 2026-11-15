const { timetableEntries } = require('../data/demoData');

// Helper to convert "HH:MM" (or "H:MM") to total minutes from midnight for robust conflict comparison
const timeToMinutes = (t) => {
  if (!t || typeof t !== 'string') return 0;
  const parts = t.split(':').map(Number);
  return (parts[0] || 0) * 60 + (parts[1] || 0);
};

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
      if (a.day.toLowerCase() === b.day.toLowerCase()) {
        const aStart = timeToMinutes(a.startTime);
        const aEnd = timeToMinutes(a.endTime);
        const bStart = timeToMinutes(b.startTime);
        const bEnd = timeToMinutes(b.endTime);

        // If times overlap
        if (aStart < bEnd && aEnd > bStart) {
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

  // Conflict check against existing entries on that day using minute arithmetic
  const newStart = timeToMinutes(startTime);
  const newEnd = timeToMinutes(endTime);

  const existingConflict = timetableEntries.find(
    e => e.day.toLowerCase() === day.toLowerCase() &&
    e.targetGroup === (targetGroup || 'Grade 10') &&
    newStart < timeToMinutes(e.endTime) &&
    newEnd > timeToMinutes(e.startTime)
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

// POST /api/v1/timetable/simulate-conflict - Simulates an overlap check for the PRD Conflict Engine
const simulateConflict = (req, res) => {
  const {
    day = 'Monday',
    startTime = '10:00',
    endTime = '11:30',
    title = 'Tennis High-Intensity Drill Session',
    type = 'training',
    targetGroup = 'Grade 10'
  } = req.body;

  // Find any overlapping existing slot using minute arithmetic
  const propStart = timeToMinutes(startTime);
  const propEnd = timeToMinutes(endTime);

  const conflict = timetableEntries.find(
    e => e.day.toLowerCase() === day.toLowerCase() &&
    propStart < timeToMinutes(e.endTime) &&
    propEnd > timeToMinutes(e.startTime)
  );

  if (conflict) {
    return res.status(200).json({
      success: true,
      hasConflict: true,
      proposedSlot: { day, startTime, endTime, title, type, targetGroup },
      conflictingSession: {
        id: conflict.id,
        title: conflict.title,
        startTime: conflict.startTime,
        endTime: conflict.endTime,
        type: conflict.type,
        instructor: conflict.instructor,
        location: conflict.location
      },
      policyRule: "PRD §4.3 Core Academic Priority: Academic curriculum hours (08:30 - 15:30) take strict legal priority over athletic drills unless tournament travel leave has been approved by the Academic Dean.",
      aiRecommendations: [
        {
          id: 'res_early',
          label: 'Option A: Early Morning Conditioning Window',
          day: 'Monday',
          startTime: '07:00',
          endTime: '08:15',
          title: 'Pre-Class Tactical Conditioning & Footwork',
          type: 'training',
          instructor: 'Coach David Miller',
          location: 'Clay Courts 1-2',
          rationale: 'Slot finishes 45 minutes before morning academics begin; maintains full breakfast & recovery window.'
        },
        {
          id: 'res_afternoon',
          label: 'Option B: Post-Academic Training Window',
          day: 'Monday',
          startTime: '15:45',
          endTime: '17:00',
          title: 'Post-Academic Match Play & Strategy',
          type: 'training',
          instructor: 'Coach David Miller',
          location: 'Center Court',
          rationale: 'Slots immediately after academic dismissal with 15-minute hydration buffer before evening study hall.'
        }
      ]
    });
  }

  return res.status(200).json({
    success: true,
    hasConflict: false,
    message: 'No conflicts detected. Time slot is fully compatible with academic and recovery blocks.'
  });
};

// POST /api/v1/timetable/resolve-conflict - Inserts an AI harmonized slot
const resolveConflict = (req, res) => {
  const { resolutionSlot } = req.body;

  if (!resolutionSlot || !resolutionSlot.startTime || !resolutionSlot.endTime) {
    return res.status(400).json({ success: false, message: 'Invalid resolution slot provided.' });
  }

  const harmonizedEntry = {
    id: `tt_ai_${Date.now()}`,
    day: resolutionSlot.day || 'Monday',
    startTime: resolutionSlot.startTime,
    endTime: resolutionSlot.endTime,
    type: resolutionSlot.type || 'training',
    title: resolutionSlot.title || 'Harmonized Training Session',
    category: 'AI Optimized Block',
    instructor: resolutionSlot.instructor || 'Coach David Miller',
    location: resolutionSlot.location || 'Tennis Facility',
    targetGroup: 'Grade 10',
    isAiResolved: true
  };

  // Avoid duplicates
  const existingIdx = timetableEntries.findIndex(e => e.id === harmonizedEntry.id);
  if (existingIdx === -1) {
    timetableEntries.push(harmonizedEntry);
  }

  return res.status(200).json({
    success: true,
    message: 'Schedule successfully harmonized! Added conflict-free session to unified timetable.',
    entry: harmonizedEntry,
    allEntries: timetableEntries.sort((a, b) => a.startTime.localeCompare(b.startTime))
  });
};

module.exports = {
  getTimetable,
  addTimetableEntry,
  simulateConflict,
  resolveConflict
};
