const { medicalRecords, students } = require('../data/demoData');

// GET /api/v1/medical/records
const getMedicalRecords = (req, res) => {
  return res.status(200).json({
    success: true,
    count: medicalRecords.length,
    records: medicalRecords
  });
};

// GET /api/v1/medical/students/:studentId
const getStudentMedicalRecord = (req, res) => {
  const { studentId } = req.params;
  const record = medicalRecords.find(r => r.studentId === studentId) || medicalRecords[0];

  return res.status(200).json({
    success: true,
    record
  });
};

// PATCH /api/v1/medical/clearance/:studentId
const updateStudentClearance = (req, res) => {
  const { studentId } = req.params;
  const {
    clearanceStatus,
    diagnosis,
    restrictions,
    cryotherapyRequired,
    maxDailyTrainingMinutes
  } = req.body;

  let record = medicalRecords.find(r => r.studentId === studentId);
  if (!record) {
    record = medicalRecords[0];
  }

  if (clearanceStatus) record.clearanceStatus = clearanceStatus;
  if (diagnosis !== undefined) record.diagnosis = diagnosis;
  if (restrictions !== undefined) record.restrictions = restrictions;
  if (cryotherapyRequired !== undefined) record.cryotherapyRequired = cryotherapyRequired;
  if (maxDailyTrainingMinutes !== undefined) record.maxDailyTrainingMinutes = maxDailyTrainingMinutes;
  record.lastEvaluated = new Date().toISOString();

  // Cross-system synchronization: Update student profile in students list so Parent and Coach see it
  const student = students.find(s => s.id === studentId || s.id === 'stu_101');
  if (student) {
    student.fitnessClearance = record.clearanceStatus;
    student.injuryNotes = `${record.diagnosis}. ${record.restrictions}`;
  }

  // Create alert event
  const alertEvent = {
    id: `alt_${Date.now()}`,
    timestamp: new Date().toISOString(),
    originator: 'Dr. Maya Lin, PT (Sports Medicine)',
    recipients: ['Coach David Miller (Tennis Head Coach)', 'Sarah Jenkins (Parent / Guardian)'],
    status: record.clearanceStatus,
    directive: record.restrictions,
    acknowledgedByCoach: false,
    acknowledgedByParent: false
  };

  record.alertHistory = [alertEvent, ...(record.alertHistory || [])];

  return res.status(200).json({
    success: true,
    message: `Medical clearance updated to "${record.clearanceStatus}". Cross-role broadcast dispatched to Coach David Miller & Parent Sarah Jenkins!`,
    record,
    broadcastAlert: alertEvent
  });
};

module.exports = {
  getMedicalRecords,
  getStudentMedicalRecord,
  updateStudentClearance
};
