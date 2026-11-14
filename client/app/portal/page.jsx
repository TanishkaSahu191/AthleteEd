'use client';

import { useState, useEffect } from 'react';
import RoleSwitcher from '../../components/RoleSwitcher';
import TimetableCalendar from '../../components/TimetableCalendar';
import AdmissionsKanban from '../../components/AdmissionsKanban';
import {
  getApplications,
  getTimetable,
  getParentOverview,
  getAdminMetrics,
  payFee,
  approveLeave
} from '../../lib/api';
import {
  Users,
  Calendar,
  CreditCard,
  CheckCircle2,
  FileCheck,
  TrendingUp,
  Check,
  X
} from 'lucide-react';

export default function PortalPage() {
  const [activeRole, setActiveRole] = useState('admin');
  const [loading, setLoading] = useState(true);

  // Data states
  const [adminMetrics, setAdminMetrics] = useState(null);
  const [applications, setApplications] = useState([]);
  const [timetableData, setTimetableData] = useState({ entries: [], conflictsDetected: false });
  const [parentData, setParentData] = useState(null);

  // Interaction feedback states
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [leaveStatusUpdated, setLeaveStatusUpdated] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [metrics, apps, tt, parent] = await Promise.all([
          getAdminMetrics(),
          getApplications(),
          getTimetable(),
          getParentOverview()
        ]);

        setAdminMetrics(metrics);
        setApplications(apps);
        setTimetableData(tt);
        setParentData(parent);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handlePayTuition = async (invoiceId) => {
    setActionLoading(true);
    const res = await payFee(invoiceId, 'Online Card (Visa **** 4092)');
    if (res.success) {
      setPaymentSuccess(true);
      if (parentData && parentData.fees) {
        setParentData(prev => ({
          ...prev,
          fees: prev.fees.map(f => f.id === invoiceId ? { ...f, status: 'Paid', paidAt: new Date().toISOString() } : f)
        }));
      }
    }
    setActionLoading(false);
  };

  const handleLeaveAction = async (leaveId, action) => {
    setActionLoading(true);
    const res = await approveLeave(leaveId, action, `Decision submitted via Parent Portal`);
    if (res.success) {
      setLeaveStatusUpdated(action);
      if (parentData && parentData.leaveRequests) {
        setParentData(prev => ({
          ...prev,
          leaveRequests: prev.leaveRequests.map(l =>
            l.id === leaveId
              ? { ...l, parentApprovalStatus: action === 'approve' ? 'Approved' : 'Rejected' }
              : l
          )
        }));
      }
    }
    setActionLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-slate-900">
      {/* Role Simulator Switcher Bar */}
      <RoleSwitcher activeRole={activeRole} onSelectRole={setActiveRole} />

      {/* Role View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-black tracking-wider px-2.5 py-1 rounded bg-blue-100 text-blue-950 border border-blue-200">
              {activeRole.toUpperCase()} DASHBOARD
            </span>
            <span className="text-xs text-slate-500 font-semibold">· AthleteEd Operations Suite</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-blue-950 mt-1">
            {activeRole === 'admin' && 'Academy Administration & Admissions Pipeline'}
            {activeRole === 'parent' && 'Parent 360° Portal: Leo Jenkins'}
            {activeRole === 'student' && 'Student-Athlete Unified Hub: Leo Jenkins'}
            {activeRole === 'coach' && 'Head Coach Coaching Console: Tennis Academy'}
            {activeRole === 'teacher' && 'Academic Faculty & Curriculum Portal'}
          </h1>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto text-xs bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-700 animate-ping" />
          <span className="text-blue-950 font-bold font-mono">Platform Live · 2026 Season</span>
        </div>
      </div>

      {/* ========================================================
          ROLE 1: ADMIN DASHBOARD
          ======================================================== */}
      {activeRole === 'admin' && (
        <div className="space-y-8">
          {/* Key KPI Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs mb-2 font-bold">
                <span>Enrolled Athletes</span>
                <Users className="w-4 h-4 text-blue-800" />
              </div>
              <div className="text-3xl font-black text-blue-950">{adminMetrics?.totalStudents || 184}</div>
              <div className="text-[11px] text-blue-700 mt-1 flex items-center gap-1 font-bold">
                <TrendingUp className="w-3 h-3" />
                <span>+12% vs last semester</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs mb-2 font-bold">
                <span>Admissions Pipeline</span>
                <FileCheck className="w-4 h-4 text-indigo-700" />
              </div>
              <div className="text-3xl font-black text-blue-950">{applications.length || 28}</div>
              <div className="text-[11px] text-slate-500 mt-1 font-medium">
                {applications.filter(a => a.status === 'Trial Scheduled').length} Trials Scheduled
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs mb-2 font-bold">
                <span>Tuition Collected</span>
                <CreditCard className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-3xl font-black text-blue-950">
                ${(adminMetrics?.totalFeesCollected || 218500).toLocaleString()}
              </div>
              <div className="text-[11px] text-blue-800 mt-1 font-bold">
                {adminMetrics?.collectionRate || 89}% Collection Rate
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs mb-2 font-bold">
                <span>Combined Attendance</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-3xl font-black text-blue-950">{adminMetrics?.averageAttendance || 96.8}%</div>
              <div className="text-[11px] text-emerald-700 mt-1 font-bold">Exceeds 95% Target</div>
            </div>
          </div>

          {/* Admissions Kanban Pipeline */}
          <AdmissionsKanban initialApplications={applications} />

          {/* Unified Timetable view for Admin */}
          <TimetableCalendar entries={timetableData.entries} conflictsDetected={timetableData.conflictsDetected} />
        </div>
      )}

      {/* ========================================================
          ROLE 2: PARENT PORTAL
          ======================================================== */}
      {activeRole === 'parent' && parentData && (
        <div className="space-y-8">
          {/* Child 360 Overview Header Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-900 flex items-center justify-center text-white text-2xl font-black shadow-md shadow-blue-950/20">
                LJ
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-blue-950">{parentData.student.name}</h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-950 border border-blue-200">
                    Active Boarder
                  </span>
                </div>
                <div className="text-xs text-slate-600 mt-1 space-x-3 font-medium">
                  <span>Admission: <strong className="text-slate-900">{parentData.student.admissionNo}</strong></span>
                  <span>·</span>
                  <span>{parentData.student.gradeLevel}</span>
                  <span>·</span>
                  <span>{parentData.student.sport} ({parentData.student.squad})</span>
                </div>
                <div className="text-xs text-slate-500 mt-1 font-medium">
                  Assigned Coach: <strong className="text-blue-900">{parentData.student.coach}</strong> · Dorm: {parentData.student.roomNo}
                </div>
              </div>
            </div>

            {/* Quick child stats pills */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500 text-[11px] font-semibold">Academic GPA</div>
                <div className="text-base font-black text-blue-950 mt-0.5">{parentData.student.academicGPA}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500 text-[11px] font-semibold">Attendance</div>
                <div className="text-base font-black text-blue-700 mt-0.5">{parentData.student.attendanceRate}%</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-slate-500 text-[11px] font-semibold">Medical Status</div>
                <div className="text-base font-black text-emerald-700 mt-0.5">Cleared</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Leave Approvals */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-blue-950 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-800" />
                  <span>Hostel Leave / Travel Outing Requests</span>
                </h3>
                <span className="text-[11px] text-slate-500 font-semibold">Parent Sign-off Required</span>
              </div>

              {parentData.leaveRequests.map((req) => (
                <div key={req.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{req.type}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      req.parentApprovalStatus === 'Approved'
                        ? 'bg-blue-100 text-blue-900 border border-blue-200'
                        : req.parentApprovalStatus === 'Rejected'
                        ? 'bg-rose-100 text-rose-900 border border-rose-200'
                        : 'bg-amber-100 text-amber-900 border border-amber-200'
                    }`}>
                      {req.parentApprovalStatus}
                    </span>
                  </div>

                  <div className="text-slate-600 space-y-1 font-medium">
                    <div>Reason: <strong className="text-slate-900">{req.reason}</strong></div>
                    <div>Destination: {req.destination}</div>
                    <div className="font-mono text-blue-800 font-bold">
                      Window: {new Date(req.fromDate).toLocaleDateString()} to {new Date(req.toDate).toLocaleDateString()}
                    </div>
                  </div>

                  {req.parentApprovalStatus === 'Pending' && (
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                      <button
                        onClick={() => handleLeaveAction(req.id, 'approve')}
                        disabled={actionLoading}
                        className="flex-1 py-2 rounded-lg bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve Outing</span>
                      </button>
                      <button
                        onClick={() => handleLeaveAction(req.id, 'reject')}
                        disabled={actionLoading}
                        className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Decline</span>
                      </button>
                    </div>
                  )}

                  {req.parentApprovalStatus === 'Approved' && (
                    <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-[11px] font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                      <span>Approved by parent. Forwarded to Head Warden for gate pass generation.</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Fees & Payments */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-blue-950 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-800" />
                  <span>Tuition & Boarding Fee Statements</span>
                </h3>
                <span className="text-[11px] text-slate-500 font-semibold">Installments & Receipts</span>
              </div>

              {parentData.fees.map((inv) => (
                <div key={inv.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{inv.title}</div>
                      <div className="text-[11px] text-slate-500 font-mono font-medium">Invoice: {inv.invoiceNo}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-blue-950">${inv.amount.toLocaleString()}</div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inv.status === 'Paid'
                          ? 'bg-blue-100 text-blue-900 border border-blue-200'
                          : 'bg-amber-100 text-amber-900 border border-amber-200'
                      }`}>
                        {inv.status}
                      </span>
                    </div>
                  </div>

                  {inv.breakdown && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-200 text-slate-600 font-medium">
                      {inv.breakdown.map((item, i) => (
                        <div key={i} className="flex justify-between text-[11px]">
                          <span>{item.item}</span>
                          <span className="font-mono text-slate-900 font-semibold">${item.amount}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {inv.status === 'Pending' && (
                    <div className="pt-2 border-t border-slate-200">
                      <button
                        onClick={() => handlePayTuition(inv.id)}
                        disabled={actionLoading}
                        className="w-full py-2.5 rounded-lg bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-950/20"
                      >
                        <CreditCard className="w-4 h-4 text-blue-200" />
                        <span>Pay Now via Razorpay / Stripe (${inv.amount})</span>
                      </button>
                    </div>
                  )}

                  {inv.status === 'Paid' && (
                    <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-[11px] font-bold flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                        <span>Payment verified. Official receipt issued.</span>
                      </span>
                      <button className="text-blue-900 underline font-bold">Download PDF</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Child Timetable */}
          <TimetableCalendar entries={timetableData.entries} conflictsDetected={false} />
        </div>
      )}

      {/* ========================================================
          ROLE 3: STUDENT-ATHLETE HUB
          ======================================================== */}
      {activeRole === 'student' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold">Daily Schedule Status</span>
              <div className="text-lg font-black text-blue-950 mt-1">3 Classes · 2 Training Blocks</div>
              <div className="text-xs text-blue-700 mt-1 font-bold">No Overlaps / Full Recovery Rest</div>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold">Head Coach Evaluation</span>
              <div className="text-lg font-black text-blue-950 mt-1">Serve Velocity: 114 MPH</div>
              <div className="text-xs text-slate-600 mt-1 font-medium">"Excellent forehand cross-court accuracy."</div>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold">Hostel Gate Pass</span>
              <div className="text-lg font-black text-blue-950 mt-1">Active on Campus</div>
              <div className="text-xs text-slate-600 mt-1 font-medium">Next tournament leave approved</div>
            </div>
          </div>

          <TimetableCalendar entries={timetableData.entries} conflictsDetected={false} />
        </div>
      )}

      {/* ========================================================
          ROLE 4: COACH CONSOLE
          ======================================================== */}
      {activeRole === 'coach' && (
        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-lg font-black text-blue-950">Tennis Elite U-16 Squad Roster</h3>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  Coach David Miller · High-Performance Clay & Hard Courts
                </p>
              </div>
              <button className="px-3.5 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs shadow-xs">
                Log Squad Session Attendance
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">Leo Jenkins</span>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200 text-[10px] font-bold">
                    Cleared
                  </span>
                </div>
                <div className="text-slate-600 font-medium">UTR: 10.4 · Single Hand Backhand</div>
                <div className="text-slate-700 text-[11px] font-medium">
                  <strong>Medical Physio note:</strong> Right ankle rehabilitation completed. Full load authorized.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">Alexei Romanov</span>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200 text-[10px] font-bold">
                    Cleared
                  </span>
                </div>
                <div className="text-slate-600 font-medium">UTR: 10.8 · Power Baseliner</div>
                <div className="text-slate-700 text-[11px] font-medium">
                  <strong>Target:</strong> Improve second serve kick bounce above 1.8m.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">Mateo Gomez</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200 text-[10px] font-bold">
                    Conditional Load
                  </span>
                </div>
                <div className="text-slate-600 font-medium">UTR: 9.9 · Serve & Volley</div>
                <div className="text-amber-900 text-[11px] font-medium">
                  <strong>Medical restriction:</strong> 45-minute limit on hardcourt impacts (shin splints).
                </div>
              </div>
            </div>
          </div>

          <TimetableCalendar entries={timetableData.entries} conflictsDetected={false} />
        </div>
      )}

      {/* ========================================================
          ROLE 5: TEACHER FACULTY
          ======================================================== */}
      {activeRole === 'teacher' && (
        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm">
            <h3 className="text-lg font-black text-blue-950 mb-1">Grade 10 STEM & AP Physics Gradebook</h3>
            <p className="text-xs text-slate-500 mb-6 font-medium">
              Flexible submission deadlines accommodated for athletes travelling to national tournaments.
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Kinematics in Tennis Biomechanics - Lab Report</div>
                  <div className="text-slate-500 text-[11px] font-medium">Submitted by: Leo Jenkins (Grade: A, 96/100)</div>
                </div>
                <span className="text-blue-900 font-bold bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
                  Graded
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Projectile Trajectory Analysis - Midterm Project</div>
                  <div className="text-slate-500 text-[11px] font-medium">Submitted by: Aria Sharma (Due: Nov 22)</div>
                </div>
                <span className="text-indigo-900 font-bold bg-indigo-100 px-3 py-1 rounded-full border border-indigo-200">
                  In Review
                </span>
              </div>
            </div>
          </div>

          <TimetableCalendar entries={timetableData.entries} conflictsDetected={false} />
        </div>
      )}
    </div>
  );
}
