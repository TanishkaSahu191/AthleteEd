# AthleteEd API Documentation (v1 REST)

## Base URL
`http://localhost:5000/api/v1`

## Endpoints

### 1. Health & Status
* **GET `/health`**: Returns system and database connection status.

### 2. Authentication & RBAC
* **POST `/auth/login`**: Authenticate by email or demo role. Returns JWT token and user profile.
* **GET `/auth/me`**: Get current user profile (requires `Bearer <token>`).
* **GET `/auth/demo-users`**: List all seeded test personas across roles.

### 3. Admissions Management (P0)
* **POST `/applications`**: Submit a new student-athlete application dossier.
  * Body: `studentName`, `dob`, `gender`, `gradeApplying`, `sport`, `primaryPosition`, `currentRating`, `parentName`, `parentEmail`, `parentPhone`, `previousSchool`.
* **GET `/applications`**: Retrieve all applications with filters (`?status=...&sport=...&search=...`).
* **PATCH `/applications/:id/status`**: Update application status (`Submitted`, `Under Review`, `Trial Scheduled`, `Offer Extended`, `Enrolled`) and schedule athletic trials.

### 4. Unified Timetable & Scheduling (P0)
* **GET `/timetable`**: Retrieve unified schedule entries (academics, sports training, boarding) with automatic conflict detection (`?day=...&type=...`).
* **POST `/timetable`**: Add a schedule block with server-side conflict detection.

### 5. Parent Portal (P0)
* **GET `/parent/child-overview`**: 360-degree overview of child's academic GPA, attendance rate, athletic squad, room allocation, pending fees, and leave requests.
* **PATCH `/parent/leave-requests/:id`**: Parent approval or rejection of student boarding outing requests.
* **POST `/parent/pay-fee`**: Process fee payment with instant receipt generation.

### 6. Admin Analytics & Dashboard
* **GET `/dashboard/admin-metrics`**: Key academy metrics including student enrollment, fee collections, attendance averages, and sport breakdown.
