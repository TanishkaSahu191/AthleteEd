// In-memory demo store to ensure the application runs seamlessly with or without live MongoDB

const users = [
  {
    id: "usr_admin_1",
    name: "Director Marcus Vance",
    email: "admin@athleteed.com",
    role: "admin",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 019-2831"
  },
  {
    id: "usr_parent_1",
    name: "Sarah Jenkins",
    email: "parent@athleteed.com",
    role: "parent",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    studentId: "stu_101",
    phone: "+1 (555) 349-1029"
  },
  {
    id: "usr_student_1",
    name: "Leo Jenkins",
    email: "student@athleteed.com",
    role: "student",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    studentId: "stu_101",
    gradeLevel: "Grade 10",
    sport: "Tennis",
    squad: "Elite U-16 Squad",
    roomNo: "Olympus Hall 204-B"
  },
  {
    id: "usr_coach_1",
    name: "Coach David Miller",
    email: "coach@athleteed.com",
    role: "coach",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    specialization: "Tennis Head Coach (Former ATP Pro)"
  },
  {
    id: "usr_teacher_1",
    name: "Dr. Elena Rostova",
    email: "teacher@athleteed.com",
    role: "teacher",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    specialization: "AP Physics & STEM Coordinator"
  },
  {
    id: "usr_warden_1",
    name: "Arthur Pendelton",
    email: "warden@athleteed.com",
    role: "warden",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    specialization: "Olympus Residence Head Warden"
  },
  {
    id: "usr_medical_1",
    name: "Dr. Maya Lin, PT",
    email: "medical@athleteed.com",
    role: "medical",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
    specialization: "Head of Sports Medicine & Physio"
  }
];

const students = [
  {
    id: "stu_101",
    userId: "usr_student_1",
    name: "Leo Jenkins",
    admissionNo: "AE-2026-088",
    dob: "2010-04-12",
    gradeLevel: "Grade 10",
    sport: "Tennis",
    squad: "Elite U-16 Squad",
    coach: "Coach David Miller",
    guardianName: "Sarah Jenkins",
    guardianEmail: "parent@athleteed.com",
    roomNo: "Olympus Hall 204-B",
    academicGPA: "3.85 / 4.0",
    attendanceRate: 97.4,
    fitnessClearance: "Cleared - Full Training",
    injuryNotes: "Mild right ankle strain (resolved, rehab completed)",
    stats: {
      firstServeAccuracy: "68%",
      vo2Max: "56 ml/kg/min",
      matchesWon: 14,
      matchesPlayed: 16
    }
  },
  {
    id: "stu_102",
    name: "Aria Sharma",
    admissionNo: "AE-2026-042",
    dob: "2009-09-18",
    gradeLevel: "Grade 11",
    sport: "Swimming",
    squad: "National Junior Squad",
    coach: "Coach Rebecca Vance",
    roomNo: "Athena Hall 102-A",
    academicGPA: "3.92 / 4.0",
    attendanceRate: 98.1,
    fitnessClearance: "Cleared - Full Training",
    injuryNotes: "No active injuries"
  },
  {
    id: "stu_103",
    name: "Marcus Chen",
    admissionNo: "AE-2026-105",
    dob: "2011-01-24",
    gradeLevel: "Grade 9",
    sport: "Basketball",
    squad: "Varsity Prep Squad",
    coach: "Coach Jamal Harris",
    roomNo: "Olympus Hall 115-A",
    academicGPA: "3.60 / 4.0",
    attendanceRate: 94.0,
    fitnessClearance: "Conditional - Modified Lower Body Load",
    injuryNotes: "Left patellar tendinopathy - review on Friday"
  }
];

const applications = [
  {
    id: "app_1001",
    studentName: "Rohan Varma",
    dob: "2010-06-15",
    gender: "Male",
    gradeApplying: "Grade 10",
    sport: "Tennis",
    primaryPosition: "Singles / Baseline Aggressive",
    currentRating: "ITF Junior Rank #412 / UTR 10.4",
    parentName: "Vikram Varma",
    parentEmail: "v.varma@example.com",
    parentPhone: "+91 98201 44521",
    previousSchool: "International Academy of Delhi",
    status: "Under Review",
    trialDate: null,
    trialLocation: "Center Court Complex",
    notes: [
      { author: "Director Vance", text: "Impressive match footage. High academic transcript.", date: "2026-11-13" }
    ],
    documents: [
      { name: "Academic_Transcript_Grade9.pdf", size: "1.4 MB" },
      { name: "ITF_Tournament_Certificates.pdf", size: "3.2 MB" },
      { name: "Medical_Clearance_Fitness.pdf", size: "0.8 MB" }
    ],
    submittedAt: "2026-11-13T10:15:00Z"
  },
  {
    id: "app_1002",
    studentName: "Chloe Dupont",
    dob: "2009-11-04",
    gender: "Female",
    gradeApplying: "Grade 11",
    sport: "Football",
    primaryPosition: "Central Attacking Midfielder",
    currentRating: "Regional U-17 Selection",
    parentName: "Claire Dupont",
    parentEmail: "claire.dupont@example.com",
    parentPhone: "+33 6 12 34 56 78",
    previousSchool: "Lycée Sportif de Lyon",
    status: "Trial Scheduled",
    trialDate: "2026-11-20T09:00:00Z",
    trialLocation: "Pitch 1 (FIFA Quality Pro)",
    notes: [
      { author: "Coach David Miller", text: "Trial confirmed with parents for Nov 20 morning session.", date: "2026-11-14" }
    ],
    documents: [
      { name: "School_Report_2025_2026.pdf", size: "2.1 MB" },
      { name: "Highlight_Reel_Link.pdf", size: "0.2 MB" }
    ],
    submittedAt: "2026-11-12T14:20:00Z"
  },
  {
    id: "app_1003",
    studentName: "Liam O'Connor",
    dob: "2011-03-29",
    gender: "Male",
    gradeApplying: "Grade 9",
    sport: "Athletics",
    primaryPosition: "400m / 800m Middle Distance",
    currentRating: "State Champion U-14",
    parentName: "Sean O'Connor",
    parentEmail: "s.oconnor@example.com",
    parentPhone: "+44 7700 900123",
    previousSchool: "St. Jude Grammar School",
    status: "Offer Extended",
    trialDate: "2026-11-05T10:00:00Z",
    trialLocation: "Mondo 8-Lane Track",
    notes: [
      { author: "Head of Admissions", text: "Trial score: 94/100. Scholarship offer of 40% approved by committee.", date: "2026-11-08" }
    ],
    documents: [
      { name: "State_Athletics_Times.pdf", size: "1.1 MB" },
      { name: "Standardized_Test_Scores.pdf", size: "0.9 MB" }
    ],
    submittedAt: "2026-11-01T08:30:00Z"
  },
  {
    id: "app_1004",
    studentName: "Zainab Al-Mansoor",
    dob: "2010-08-21",
    gender: "Female",
    gradeApplying: "Grade 10",
    sport: "Basketball",
    primaryPosition: "Point Guard",
    currentRating: "National U-16 Squad Member",
    parentName: "Tariq Al-Mansoor",
    parentEmail: "tariq.m@example.com",
    parentPhone: "+971 50 123 4567",
    previousSchool: "Dubai American Academy",
    status: "Submitted",
    trialDate: null,
    trialLocation: "Indoor Arena Court A",
    notes: [],
    documents: [
      { name: "Application_Dossier_2026.pdf", size: "4.1 MB" }
    ],
    submittedAt: "2026-11-14T11:45:00Z"
  }
];

// Unified Timetable showing Coexistence of Academics and Training without conflicts
const timetableEntries = [
  // Monday
  {
    id: "tt_1",
    day: "Monday",
    startTime: "06:30",
    endTime: "08:00",
    type: "training",
    title: "Morning Strength & Athletic Conditioning",
    category: "Physical Preparation",
    instructor: "Coach David Miller",
    location: "High-Performance Gym",
    targetGroup: "Elite U-16 Squad"
  },
  {
    id: "tt_2",
    day: "Monday",
    startTime: "08:15",
    endTime: "09:00",
    type: "boarding",
    title: "Nutritional Breakfast & Hydration Check",
    category: "Boarding / Wellness",
    instructor: "Dining Hall Staff",
    location: "Olympus Hall Dining",
    targetGroup: "All Boarders"
  },
  {
    id: "tt_3",
    day: "Monday",
    startTime: "09:15",
    endTime: "10:45",
    type: "academic",
    title: "AP Physics: Kinematics in Sports Mechanics",
    category: "STEM / Science",
    instructor: "Dr. Elena Rostova",
    location: "Academic Wing - Lab 3",
    targetGroup: "Grade 10"
  },
  {
    id: "tt_4",
    day: "Monday",
    startTime: "11:00",
    endTime: "12:30",
    type: "academic",
    title: "Advanced Mathematics: Calculus & Statistical Modeling",
    category: "Mathematics",
    instructor: "Prof. Kenneth Shaw",
    location: "Academic Wing - Room 201",
    targetGroup: "Grade 10"
  },
  {
    id: "tt_5",
    day: "Monday",
    startTime: "12:30",
    endTime: "13:30",
    type: "boarding",
    title: "Lunch & Recovery Nap / Mental Reset",
    category: "Recovery",
    instructor: "Residential Staff",
    location: "Olympus Hall & Lounge",
    targetGroup: "All Boarders"
  },
  {
    id: "tt_6",
    day: "Monday",
    startTime: "14:00",
    endTime: "15:30",
    type: "academic",
    title: "Literature & World History: Leadership in History",
    category: "Humanities",
    instructor: "Ms. Clara Higgins",
    location: "Academic Wing - Room 108",
    targetGroup: "Grade 10"
  },
  {
    id: "tt_7",
    day: "Monday",
    startTime: "16:00",
    endTime: "18:30",
    type: "training",
    title: "On-Court Tactical Drills & Match Play",
    category: "Sport-Specific Mastery",
    instructor: "Coach David Miller",
    location: "Tennis Courts 1 - 4",
    targetGroup: "Elite U-16 Squad"
  },
  {
    id: "tt_8",
    day: "Monday",
    startTime: "19:00",
    endTime: "20:00",
    type: "boarding",
    title: "Dinner & Athlete Social",
    category: "Boarding",
    instructor: "Residential Staff",
    location: "Dining Hall",
    targetGroup: "All Boarders"
  },
  {
    id: "tt_9",
    day: "Monday",
    startTime: "20:15",
    endTime: "21:30",
    type: "academic",
    title: "Evening Supervised Study Hall & Tutoring",
    category: "Academic Support",
    instructor: "Academic Tutors",
    location: "Library Study Center",
    targetGroup: "Grade 10"
  },

  // Tuesday
  {
    id: "tt_10",
    day: "Tuesday",
    startTime: "06:45",
    endTime: "08:00",
    type: "training",
    title: "Agility, Footwork & Speed Development",
    category: "Physical Preparation",
    instructor: "Coach Marcus Vance",
    location: "Indoor Sprint Track",
    targetGroup: "Elite U-16 Squad"
  },
  {
    id: "tt_11",
    day: "Tuesday",
    startTime: "09:15",
    endTime: "11:00",
    type: "academic",
    title: "Biology & Human Anatomy for Athletes",
    category: "STEM / Science",
    instructor: "Dr. Maya Lin",
    location: "Sports Science Lab",
    targetGroup: "Grade 10"
  },
  {
    id: "tt_12",
    day: "Tuesday",
    startTime: "11:15",
    endTime: "12:45",
    type: "academic",
    title: "English Composition & Media Communication",
    category: "Humanities",
    instructor: "Ms. Clara Higgins",
    location: "Academic Wing - Room 108",
    targetGroup: "Grade 10"
  },
  {
    id: "tt_13",
    day: "Tuesday",
    startTime: "15:30",
    endTime: "18:00",
    type: "training",
    title: "Video Analysis, Serve Biomechanics & Simulated Tiebreakers",
    category: "Tactical & Technical",
    instructor: "Coach David Miller",
    location: "Center Court & AV Suite",
    targetGroup: "Elite U-16 Squad"
  }
];

const fees = [
  {
    id: "inv_2026_01",
    studentId: "stu_101",
    invoiceNo: "INV-AE-2026-088-T2",
    title: "Term 2 Tuition & Sports Coaching Package",
    amount: 6500,
    currency: "USD",
    dueDate: "2026-12-01",
    breakdown: [
      { item: "Accredited Academic Tuition (Term 2)", amount: 3200 },
      { item: "Elite Tennis High-Performance Coaching", amount: 2100 },
      { item: "Residential Boarding & Chef Nutrition Plan", amount: 1000 },
      { item: "Physiotherapy & Tournament Recovery Access", amount: 200 }
    ],
    status: "Pending",
    paidAt: null
  },
  {
    id: "inv_2026_00",
    studentId: "stu_101",
    invoiceNo: "INV-AE-2026-088-T1",
    title: "Term 1 Tuition & Boarding (Paid)",
    amount: 6500,
    currency: "USD",
    dueDate: "2026-08-15",
    status: "Paid",
    paidAt: "2026-08-10T14:12:00Z",
    paymentMethod: "Credit Card (ending 4092)",
    receiptUrl: "#"
  }
];

const leaveRequests = [
  {
    id: "lvr_501",
    studentId: "stu_101",
    studentName: "Leo Jenkins",
    type: "Weekend Family Outing",
    fromDate: "2026-11-21T18:00",
    toDate: "2026-11-22T20:00",
    destination: "Parent Home (Boston)",
    reason: "Grandmother's 80th birthday family dinner",
    parentApprovalStatus: "Approved",
    parentApprovedAt: "2026-11-14T08:30:00Z",
    wardenApprovalStatus: "Pending",
    gatePassGenerated: false
  },
  {
    id: "lvr_502",
    studentId: "stu_101",
    studentName: "Leo Jenkins",
    type: "Tournament Travel Leave",
    fromDate: "2026-11-27T06:00",
    toDate: "2026-11-29T22:00",
    destination: "USTA National Campus, Orlando, FL",
    reason: "ITF Grade 4 Junior Invitational Tennis Championship",
    parentApprovalStatus: "Pending",
    parentApprovedAt: null,
    wardenApprovalStatus: "Pending",
    gatePassGenerated: false
  }
];

const medicalRecords = [
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
    lastEvaluated: "2026-11-14T09:30:00Z",
    alertHistory: []
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
    lastEvaluated: "2026-11-13T16:00:00Z",
    alertHistory: [
      { timestamp: "2026-11-13T16:05:00Z", target: "Coach David Miller", message: "Load capped at 45 mins" }
    ]
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
    lastEvaluated: "2026-11-12T11:00:00Z",
    alertHistory: []
  }
];

module.exports = {
  users,
  students,
  applications,
  timetableEntries,
  fees,
  leaveRequests,
  medicalRecords
};
