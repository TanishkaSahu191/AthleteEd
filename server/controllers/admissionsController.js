const { applications } = require('../data/demoData');

// POST /api/v1/applications - Submit new student application
const submitApplication = (req, res) => {
  const {
    studentName,
    dob,
    gender,
    gradeApplying,
    sport,
    primaryPosition,
    currentRating,
    parentName,
    parentEmail,
    parentPhone,
    previousSchool
  } = req.body;

  if (!studentName || !gradeApplying || !sport || !parentName || !parentEmail) {
    return res.status(400).json({
      success: false,
      message: 'Missing required application fields (Student name, Grade, Sport, Parent name, Parent email).'
    });
  }

  const newApp = {
    id: `app_${Date.now()}`,
    studentName,
    dob: dob || '2010-01-01',
    gender: gender || 'Unspecified',
    gradeApplying,
    sport,
    primaryPosition: primaryPosition || 'All-Rounder',
    currentRating: currentRating || 'Club / School Level',
    parentName,
    parentEmail,
    parentPhone: parentPhone || '+1 (555) 000-0000',
    previousSchool: previousSchool || 'Local High School',
    status: 'Submitted',
    trialDate: null,
    trialLocation: 'Main Sports Complex',
    notes: [
      {
        author: 'System Auto-Receipt',
        text: 'Application dossier received. Verification pending.',
        date: new Date().toISOString().split('T')[0]
      }
    ],
    documents: [
      { name: 'Application_Profile.pdf', size: '1.2 MB' }
    ],
    submittedAt: new Date().toISOString()
  };

  applications.unshift(newApp);

  return res.status(201).json({
    success: true,
    message: 'Application submitted successfully! Your admissions reference has been generated.',
    application: newApp
  });
};

// GET /api/v1/applications - List with filter by sport and status
const getApplications = (req, res) => {
  const { status, sport, search } = req.query;

  let filtered = [...applications];

  if (status && status !== 'all') {
    filtered = filtered.filter(a => a.status.toLowerCase() === status.toLowerCase());
  }

  if (sport && sport !== 'all') {
    filtered = filtered.filter(a => a.sport.toLowerCase() === sport.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(a =>
      a.studentName.toLowerCase().includes(q) ||
      a.parentName.toLowerCase().includes(q) ||
      a.id.toLowerCase().includes(q)
    );
  }

  return res.status(200).json({
    success: true,
    count: filtered.length,
    applications: filtered
  });
};

// PATCH /api/v1/applications/:id/status - Update application status (Admin/Staff)
const updateApplicationStatus = (req, res) => {
  const { id } = req.params;
  const { status, note, trialDate, trialLocation } = req.body;

  const app = applications.find(a => a.id === id);
  if (!app) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }

  if (status) {
    app.status = status;
  }

  if (trialDate) {
    app.trialDate = trialDate;
  }

  if (trialLocation) {
    app.trialLocation = trialLocation;
  }

  if (note) {
    app.notes.push({
      author: req.user?.name || 'Admissions Committee',
      text: note,
      date: new Date().toISOString().split('T')[0]
    });
  }

  return res.status(200).json({
    success: true,
    message: `Application updated to ${app.status}`,
    application: app
  });
};

module.exports = {
  submitApplication,
  getApplications,
  updateApplicationStatus
};
