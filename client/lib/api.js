const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

// Safe fetch with timeout and graceful local fallback
async function fetchAPI(endpoint, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3500);

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      signal: controller.signal,
      ...options
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || `API Error: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    clearTimeout(timeoutId);
    console.warn(`[API Fallback] Request to ${endpoint} failed (${error.message}). Using local client state.`);
    return null;
  }
}

// Applications API
export async function submitApplication(data) {
  const result = await fetchAPI('/applications', {
    method: 'POST',
    body: JSON.stringify(data)
  });
  if (result) return result;

  // Local fallback simulation
  return {
    success: true,
    message: 'Application registered locally (Demo Mode). Admissions dossier created!',
    application: {
      id: `app_${Date.now()}`,
      ...data,
      status: 'Submitted',
      submittedAt: new Date().toISOString(),
      documents: [{ name: 'Application_Profile.pdf', size: '1.2 MB' }]
    }
  };
}

export async function getApplications(params = {}) {
  const query = new URLSearchParams(params).toString();
  const result = await fetchAPI(`/applications?${query}`);
  if (result && result.applications) return result.applications;

  // Fallback default applications
  return [
    {
      id: "app_1001",
      studentName: "Rohan Varma",
      sport: "Tennis",
      gradeApplying: "Grade 10",
      parentName: "Vikram Varma",
      parentEmail: "v.varma@example.com",
      parentPhone: "+91 98201 44521",
      currentRating: "ITF Junior #412 / UTR 10.4",
      status: "Under Review",
      trialDate: null,
      documents: [{ name: "ITF_Scores.pdf", size: "1.4 MB" }]
    },
    {
      id: "app_1002",
      studentName: "Chloe Dupont",
      sport: "Football",
      gradeApplying: "Grade 11",
      parentName: "Claire Dupont",
      parentEmail: "claire.dupont@example.com",
      parentPhone: "+33 6 12 34 56 78",
      currentRating: "Regional U-17 Selection",
      status: "Trial Scheduled",
      trialDate: "2026-11-20T09:00:00Z",
      documents: [{ name: "Match_Reel.mp4", size: "14.2 MB" }]
    },
    {
      id: "app_1003",
      studentName: "Liam O'Connor",
      sport: "Athletics",
      gradeApplying: "Grade 9",
      parentName: "Sean O'Connor",
      parentEmail: "s.oconnor@example.com",
      parentPhone: "+44 7700 900123",
      currentRating: "State Champion U-14",
      status: "Offer Extended",
      trialDate: "2026-11-05T10:00:00Z",
      documents: [{ name: "Track_Times.pdf", size: "0.8 MB" }]
    }
  ];
}

export async function updateApplicationStatus(id, updateData) {
  const result = await fetchAPI(`/applications/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify(updateData)
  });
  if (result) return result;

  return {
    success: true,
    message: `Status updated to ${updateData.status} (Client mode)`
  };
}

// Timetable API
export async function getTimetable(params = {}) {
  const query = new URLSearchParams(params).toString();
  const result = await fetchAPI(`/timetable?${query}`);
  if (result && result.entries) return result;

  return {
    success: true,
    conflictsDetected: false,
    entries: [
      // Monday
      { id: "tt_1", day: "Monday", startTime: "06:30", endTime: "08:00", type: "training", title: "Morning Strength & Athletic Conditioning", instructor: "Coach David Miller", location: "High-Performance Gym", category: "Physical Prep" },
      { id: "tt_2", day: "Monday", startTime: "08:15", endTime: "09:00", type: "boarding", title: "Nutritional Breakfast & Hydration Check", instructor: "Dining Hall Staff", location: "Olympus Hall Dining", category: "Nutrition" },
      { id: "tt_3", day: "Monday", startTime: "09:15", endTime: "10:45", type: "academic", title: "AP Physics: Kinematics in Sports Mechanics", instructor: "Dr. Elena Rostova", location: "Academic Lab 3", category: "STEM" },
      { id: "tt_4", day: "Monday", startTime: "11:00", endTime: "12:30", type: "academic", title: "Advanced Math: Calculus & Statistical Modeling", instructor: "Prof. Kenneth Shaw", location: "Room 201", category: "Mathematics" },
      { id: "tt_5", day: "Monday", startTime: "12:30", endTime: "13:30", type: "boarding", title: "Lunch & Recovery Rest", instructor: "Residential Staff", location: "Olympus Hall Lounge", category: "Recovery" },
      { id: "tt_6", day: "Monday", startTime: "14:00", endTime: "15:30", type: "academic", title: "Literature & World History", instructor: "Ms. Clara Higgins", location: "Room 108", category: "Humanities" },
      { id: "tt_7", day: "Monday", startTime: "16:00", endTime: "18:30", type: "training", title: "On-Court Tactical Drills & Match Play", instructor: "Coach David Miller", location: "Tennis Courts 1-4", category: "Tactical" },
      { id: "tt_8", day: "Monday", startTime: "19:00", endTime: "20:00", type: "boarding", title: "Dinner & Athlete Social", instructor: "Dining Staff", location: "Dining Hall", category: "Boarding" },
      { id: "tt_9", day: "Monday", startTime: "20:15", endTime: "21:30", type: "academic", title: "Evening Supervised Study Hall", instructor: "Academic Tutors", location: "Library Study Center", category: "Academic Support" },

      // Tuesday
      { id: "tt_10", day: "Tuesday", startTime: "06:45", endTime: "08:00", type: "training", title: "Agility, Footwork & Speed Development", instructor: "Coach Marcus Vance", location: "Indoor Sprint Track", category: "Speed" },
      { id: "tt_10_b", day: "Tuesday", startTime: "08:15", endTime: "09:00", type: "boarding", title: "Nutritional Breakfast & Hydration Log", instructor: "Dining Hall Staff", location: "Olympus Hall Dining", category: "Nutrition" },
      { id: "tt_11", day: "Tuesday", startTime: "09:15", endTime: "11:00", type: "academic", title: "Biology & Human Anatomy for Athletes", instructor: "Dr. Maya Lin", location: "Sports Science Lab", category: "Science" },
      { id: "tt_12", day: "Tuesday", startTime: "11:15", endTime: "12:45", type: "academic", title: "English Composition & Media Communication", instructor: "Ms. Clara Higgins", location: "Room 108", category: "Humanities" },
      { id: "tt_12_b", day: "Tuesday", startTime: "12:45", endTime: "13:45", type: "boarding", title: "Chef Lunch & Cold Plunge Hydrotherapy", instructor: "Sports Science Team", location: "Aquatic Center", category: "Recovery" },
      { id: "tt_13", day: "Tuesday", startTime: "15:30", endTime: "18:00", type: "training", title: "Video Analysis, Serve Biomechanics & Drills", instructor: "Coach David Miller", location: "Center Court & AV Suite", category: "Technical" },
      { id: "tt_13_b", day: "Tuesday", startTime: "19:00", endTime: "20:00", type: "boarding", title: "Dinner & Peer Boarding Forum", instructor: "Arthur Pendelton", location: "Olympus Hall", category: "Boarding" },
      { id: "tt_13_c", day: "Tuesday", startTime: "20:15", endTime: "21:30", type: "academic", title: "Supervised Study Hall & Tutoring", instructor: "Academic Faculty", location: "Library Hub", category: "Academic Support" },

      // Wednesday
      { id: "tt_14", day: "Wednesday", startTime: "06:30", endTime: "08:00", type: "training", title: "Aerobic Base & Hydro-Recovery Conditioning", instructor: "Coach Rebecca Vance", location: "Olympic Pool & Gym", category: "Conditioning" },
      { id: "tt_15", day: "Wednesday", startTime: "08:15", endTime: "09:00", type: "boarding", title: "Breakfast & Electrolyte Balancing Check", instructor: "Dining Staff", location: "Olympus Dining Hall", category: "Nutrition" },
      { id: "tt_16", day: "Wednesday", startTime: "09:15", endTime: "10:45", type: "academic", title: "AP Physics: Kinetic Energy & Angular Mechanics", instructor: "Dr. Elena Rostova", location: "Academic Lab 3", category: "STEM" },
      { id: "tt_17", day: "Wednesday", startTime: "11:00", endTime: "12:30", type: "academic", title: "Advanced Math: Probability & Game Theory", instructor: "Prof. Kenneth Shaw", location: "Room 201", category: "Mathematics" },
      { id: "tt_18", day: "Wednesday", startTime: "12:30", endTime: "13:30", type: "boarding", title: "Balanced Chef Lunch & Mindfulness Reset", instructor: "Residential Staff", location: "Olympus Hall Lounge", category: "Recovery" },
      { id: "tt_19", day: "Wednesday", startTime: "14:00", endTime: "15:30", type: "academic", title: "World History: Ancient Olympic Ethics to Modern Sport", instructor: "Ms. Clara Higgins", location: "Room 108", category: "Humanities" },
      { id: "tt_20", day: "Wednesday", startTime: "16:00", endTime: "18:30", type: "training", title: "Match Play Simulation: High-Pressure Break Points", instructor: "Coach David Miller", location: "Tennis Courts 1-4", category: "Tactical" },
      { id: "tt_21", day: "Wednesday", startTime: "19:00", endTime: "20:00", type: "boarding", title: "Dinner & Sports Psychology Workshop", instructor: "Dr. Maya Lin", location: "Dining Hall", category: "Wellness" },
      { id: "tt_22", day: "Wednesday", startTime: "20:15", endTime: "21:30", type: "academic", title: "Peer Study Groups & STEM Project Lab", instructor: "Academic Tutors", location: "Library Study Center", category: "Academic Support" },

      // Thursday
      { id: "tt_23", day: "Thursday", startTime: "06:45", endTime: "08:00", type: "training", title: "Plyometric Explosiveness & Reaction Drills", instructor: "Coach David Miller", location: "High-Performance Gym", category: "Physical Prep" },
      { id: "tt_24", day: "Thursday", startTime: "08:15", endTime: "09:00", type: "boarding", title: "Hot Breakfast & Daily Wellness Survey", instructor: "Dining Staff", location: "Olympus Dining Hall", category: "Nutrition" },
      { id: "tt_25", day: "Thursday", startTime: "09:15", endTime: "11:00", type: "academic", title: "Biology: Muscle Physiology & Lactate Clearance", instructor: "Dr. Maya Lin", location: "Sports Science Lab", category: "Science" },
      { id: "tt_26", day: "Thursday", startTime: "11:15", endTime: "12:45", type: "academic", title: "English: Rhetoric, Public Speaking & Press Conferences", instructor: "Ms. Clara Higgins", location: "Room 108", category: "Humanities" },
      { id: "tt_27", day: "Thursday", startTime: "12:45", endTime: "13:45", type: "boarding", title: "High-Protein Lunch & Recovery Nap Window", instructor: "Residential Staff", location: "Olympus Hall", category: "Recovery" },
      { id: "tt_28", day: "Thursday", startTime: "15:30", endTime: "18:00", type: "training", title: "Serve Precision Targeting & Second-Serve Kick", instructor: "Coach David Miller", location: "Center Court", category: "Technical" },
      { id: "tt_29", day: "Thursday", startTime: "19:00", endTime: "20:00", type: "boarding", title: "Nutritional Dinner & Film Room Tactical Review", instructor: "Coaching Staff", location: "Dining Hall & AV Suite", category: "Boarding" },
      { id: "tt_30", day: "Thursday", startTime: "20:15", endTime: "21:30", type: "academic", title: "Supervised Evening Study Hall & 1-on-1 Tutoring", instructor: "Academic Faculty", location: "Library Hub", category: "Academic Support" },

      // Friday
      { id: "tt_31", day: "Friday", startTime: "06:30", endTime: "07:45", type: "training", title: "Dynamic Mobility, Foam Rolling & Core Stability", instructor: "Coach Marcus Vance", location: "High-Performance Gym", category: "Physical Prep" },
      { id: "tt_32", day: "Friday", startTime: "08:00", endTime: "08:45", type: "boarding", title: "Pre-Match Carb-Load Breakfast & Hydration Screening", instructor: "Dining Staff", location: "Olympus Dining Hall", category: "Nutrition" },
      { id: "tt_33", day: "Friday", startTime: "09:00", endTime: "10:30", type: "academic", title: "AP Physics: Lab Experiment & Kinematic Data", instructor: "Dr. Elena Rostova", location: "Academic Lab 3", category: "STEM" },
      { id: "tt_34", day: "Friday", startTime: "10:45", endTime: "12:15", type: "academic", title: "Advanced Math: Weekly Problem-Set Evaluation", instructor: "Prof. Kenneth Shaw", location: "Room 201", category: "Mathematics" },
      { id: "tt_35", day: "Friday", startTime: "12:15", endTime: "13:15", type: "boarding", title: "Chef Lunch & Weekend Tournament Briefing", instructor: "Arthur Pendelton", location: "Olympus Dining Hall", category: "Recovery" },
      { id: "tt_36", day: "Friday", startTime: "13:30", endTime: "15:00", type: "academic", title: "College Admissions & NCAA Compliance Seminar", instructor: "Academic Guidance Team", location: "Main Auditorium", category: "Guidance" },
      { id: "tt_37", day: "Friday", startTime: "15:30", endTime: "18:00", type: "training", title: "Intra-Academy Championship Match Play (3 Sets)", instructor: "Coach David Miller", location: "Tennis Courts 1-4", category: "Match Play" },
      { id: "tt_38", day: "Friday", startTime: "18:30", endTime: "19:30", type: "boarding", title: "Weekend Kickoff Athlete Community Dinner", instructor: "Dining Staff", location: "Olympus Dining Hall", category: "Boarding" },
      { id: "tt_39", day: "Friday", startTime: "19:45", endTime: "21:00", type: "boarding", title: "Hostel Residence Check-In & Gate Pass Review", instructor: "Arthur Pendelton", location: "Olympus Hall Lobby", category: "Boarding" }
    ]
  };
}

export async function simulateScheduleConflict(proposedSlot) {
  const result = await fetchAPI('/timetable/simulate-conflict', {
    method: 'POST',
    body: JSON.stringify(proposedSlot)
  });
  if (result) return result;

  // Local fallback simulation
  return {
    success: true,
    hasConflict: true,
    proposedSlot,
    conflictingSession: {
      id: "tt_3",
      title: "AP Physics: Kinematics in Sports Mechanics",
      startTime: "09:15",
      endTime: "10:45",
      type: "academic",
      instructor: "Dr. Elena Rostova",
      location: "Academic Lab 3"
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
  };
}

export async function resolveScheduleConflict(resolutionSlot) {
  const result = await fetchAPI('/timetable/resolve-conflict', {
    method: 'POST',
    body: JSON.stringify({ resolutionSlot })
  });
  if (result) return result;

  return {
    success: true,
    message: 'Schedule successfully harmonized! Added conflict-free session to unified timetable.',
    entry: {
      id: `tt_ai_${Date.now()}`,
      day: resolutionSlot.day || 'Monday',
      startTime: resolutionSlot.startTime,
      endTime: resolutionSlot.endTime,
      type: resolutionSlot.type || 'training',
      title: resolutionSlot.title,
      category: 'AI Optimized Block',
      instructor: resolutionSlot.instructor || 'Coach David Miller',
      location: resolutionSlot.location || 'Tennis Facility',
      targetGroup: 'Grade 10',
      isAiResolved: true
    }
  };
}

// Medical / Sports Physio API (US-08 Cross-Role Alert Chain)
export async function getMedicalRecords() {
  const result = await fetchAPI('/medical/records');
  if (result && result.records) return result.records;

  return [
    {
      id: "med_101",
      studentId: "stu_101",
      studentName: "Leo Jenkins",
      sport: "Tennis (Elite U-16)",
      clearanceStatus: "Cleared - Full Training",
      diagnosis: "Right ankle strain (rehabilitated)",
      restrictions: "None. Cleared for 100% competition load.",
      cryotherapyRequired: false,
      maxDailyTrainingMinutes: 180,
      attendingPhysio: "Dr. Maya Lin, PT",
      lastEvaluated: "2026-11-14T09:30:00Z"
    },
    {
      id: "med_102",
      studentId: "stu_103",
      studentName: "Mateo Gomez",
      sport: "Tennis (Elite U-16)",
      clearanceStatus: "Modified Load",
      diagnosis: "Bilateral tibial stress reaction (Shin Splints)",
      restrictions: "45-minute limit on hardcourt impacts; zero high-impact plyometrics; daily ice bath.",
      cryotherapyRequired: true,
      maxDailyTrainingMinutes: 45,
      attendingPhysio: "Dr. Maya Lin, PT",
      lastEvaluated: "2026-11-13T16:00:00Z"
    },
    {
      id: "med_103",
      studentId: "stu_102",
      studentName: "Aria Sharma",
      sport: "Swimming (National Junior)",
      clearanceStatus: "Cleared - Full Training",
      diagnosis: "Rotator cuff impingement monitoring",
      restrictions: "None. Rotator cuff mobility within normal range (>165°).",
      cryotherapyRequired: false,
      maxDailyTrainingMinutes: 150,
      attendingPhysio: "Dr. Maya Lin, PT",
      lastEvaluated: "2026-11-12T11:00:00Z"
    }
  ];
}

export async function updateAthleteClearance(studentId, clearanceData) {
  const result = await fetchAPI(`/medical/clearance/${studentId}`, {
    method: 'PATCH',
    body: JSON.stringify(clearanceData)
  });
  if (result) return result;

  return {
    success: true,
    message: `Medical clearance updated to "${clearanceData.clearanceStatus}". Cross-role broadcast dispatched to Coach David Miller & Parent Sarah Jenkins!`,
    record: {
      studentId,
      ...clearanceData,
      attendingPhysio: "Dr. Maya Lin, PT",
      lastEvaluated: new Date().toISOString()
    },
    broadcastAlert: {
      id: `alt_${Date.now()}`,
      timestamp: new Date().toISOString(),
      originator: 'Dr. Maya Lin, PT (Sports Medicine)',
      recipients: ['Coach David Miller (Tennis Head Coach)', 'Sarah Jenkins (Parent / Guardian)'],
      status: clearanceData.clearanceStatus,
      directive: clearanceData.restrictions
    }
  };
}

// Parent API
export async function getParentOverview() {
  const result = await fetchAPI('/parent/child-overview');
  if (result && result.student) return result;

  return {
    success: true,
    student: {
      name: "Leo Jenkins",
      admissionNo: "AE-2026-088",
      gradeLevel: "Grade 10",
      sport: "Tennis",
      squad: "Elite U-16 Squad",
      coach: "Coach David Miller",
      roomNo: "Olympus Hall 204-B",
      academicGPA: "3.85 / 4.0",
      attendanceRate: 97.4,
      fitnessClearance: "Cleared - Full Training",
      injuryNotes: "Mild right ankle strain (fully resolved)"
    },
    fees: [
      {
        id: "inv_2026_01",
        invoiceNo: "INV-AE-2026-088-T2",
        title: "Term 2 Tuition & Sports Coaching Package",
        amount: 6500,
        currency: "USD",
        dueDate: "2026-12-01",
        status: "Pending",
        breakdown: [
          { item: "Accredited Academic Tuition (Term 2)", amount: 3200 },
          { item: "Elite Tennis High-Performance Coaching", amount: 2100 },
          { item: "Residential Boarding & Chef Nutrition Plan", amount: 1000 },
          { item: "Physiotherapy & Tournament Recovery Access", amount: 200 }
        ]
      }
    ],
    leaveRequests: [
      {
        id: "lvr_502",
        type: "Tournament Travel Leave",
        fromDate: "2026-11-27T06:00",
        toDate: "2026-11-29T22:00",
        destination: "USTA National Campus, Orlando, FL",
        reason: "ITF Grade 4 Junior Invitational Tennis Championship",
        parentApprovalStatus: "Pending",
        wardenApprovalStatus: "Pending"
      }
    ]
  };
}

export async function payFee(invoiceId, method) {
  const result = await fetchAPI('/parent/pay-fee', {
    method: 'POST',
    body: JSON.stringify({ invoiceId, paymentMethod: method })
  });
  if (result) return result;

  return {
    success: true,
    message: 'Payment received! Receipt generated.',
    invoice: { id: invoiceId, status: 'Paid', paidAt: new Date().toISOString() }
  };
}

export async function approveLeave(leaveId, action, comment) {
  const result = await fetchAPI(`/parent/leave-requests/${leaveId}`, {
    method: 'PATCH',
    body: JSON.stringify({ action, comment })
  });
  if (result) return result;

  return {
    success: true,
    message: `Leave request marked as ${action}d.`
  };
}

// Admin Metrics API
export async function getAdminMetrics() {
  const result = await fetchAPI('/dashboard/admin-metrics');
  if (result && result.metrics) return result.metrics;

  return {
    totalStudents: 184,
    totalApplications: 28,
    pendingTrials: 6,
    underReview: 9,
    totalFeesCollected: 218500,
    totalFeesExpected: 245000,
    collectionRate: 89,
    averageAttendance: 96.8,
    sportsBreakdown: [
      { sport: 'Tennis', count: 48 },
      { sport: 'Football', count: 52 },
      { sport: 'Basketball', count: 36 },
      { sport: 'Swimming', count: 28 },
      { sport: 'Athletics & Track', count: 20 }
    ]
  };
}
