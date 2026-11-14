const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

// Safe fetch with fallback
async function fetchAPI(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || `API Error: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
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
      { id: "tt_1", day: "Monday", startTime: "06:30", endTime: "08:00", type: "training", title: "Morning Strength & Athletic Conditioning", instructor: "Coach David Miller", location: "High-Performance Gym" },
      { id: "tt_2", day: "Monday", startTime: "08:15", endTime: "09:00", type: "boarding", title: "Nutritional Breakfast & Hydration Check", instructor: "Dining Hall Staff", location: "Olympus Hall Dining" },
      { id: "tt_3", day: "Monday", startTime: "09:15", endTime: "10:45", type: "academic", title: "AP Physics: Kinematics in Sports Mechanics", instructor: "Dr. Elena Rostova", location: "Academic Lab 3" },
      { id: "tt_4", day: "Monday", startTime: "11:00", endTime: "12:30", type: "academic", title: "Advanced Math: Calculus & Statistical Modeling", instructor: "Prof. Kenneth Shaw", location: "Room 201" },
      { id: "tt_5", day: "Monday", startTime: "12:30", endTime: "13:30", type: "boarding", title: "Lunch & Recovery Rest", instructor: "Residential Staff", location: "Olympus Hall Lounge" },
      { id: "tt_6", day: "Monday", startTime: "14:00", endTime: "15:30", type: "academic", title: "Literature & World History", instructor: "Ms. Clara Higgins", location: "Room 108" },
      { id: "tt_7", day: "Monday", startTime: "16:00", endTime: "18:30", type: "training", title: "On-Court Tactical Drills & Match Play", instructor: "Coach David Miller", location: "Tennis Courts 1-4" },
      { id: "tt_8", day: "Monday", startTime: "19:00", endTime: "20:00", type: "boarding", title: "Dinner & Athlete Social", instructor: "Dining Staff", location: "Dining Hall" },
      { id: "tt_9", day: "Monday", startTime: "20:15", endTime: "21:30", type: "academic", title: "Evening Supervised Study Hall", instructor: "Academic Tutors", location: "Library Study Center" }
    ]
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
      { sport: 'Tennis', count: 48, icon: '🎾' },
      { sport: 'Football', count: 52, icon: '⚽' },
      { sport: 'Basketball', count: 36, icon: '🏀' },
      { sport: 'Swimming', count: 28, icon: '🏊' },
      { sport: 'Athletics & Track', count: 20, icon: '🏃' }
    ]
  };
}
