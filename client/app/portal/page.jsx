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
  Trophy,
  Users,
  Shield,
  GraduationCap,
  Calendar,
  CreditCard,
  CheckCircle2,
  Clock,
  HeartPulse,
  Award,
  AlertCircle,
  FileCheck,
  TrendingUp,
  MapPin,
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Role Simulator Switcher Bar */}
      <RoleSwitcher activeRole={activeRole} onSelectRole={setActiveRole} />

      {/* Role View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-wider px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {activeRole.toUpperCase()} DASHBOARD
            </span>
            <span className="text-xs text-slate-400">· AthleteEd Operations Suite</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            {activeRole === 'admin' && 'Academy Administration & Admissions Pipeline'}
            {activeRole === 'parent' && 'Parent 360° Portal: Leo Jenkins'}
            {activeRole === 'student' && 'Student-Athlete Unified Hub: Leo Jenkins'}
            {activeRole === 'coach' && 'Head Coach Coaching Console: Tennis Academy'}
            {activeRole === 'teacher' && 'Academic Faculty & Curriculum Portal'}
          </h1>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto text-xs bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-slate-300 font-mono">Platform Live · 2026 Season</span>
        </div>
      </div>

      {/* ========================================================
          ROLE 1: ADMIN DASHBOARD
          ======================================================== */}
      {activeRole === 'admin' && (
        <div className="space-y-8">
          {/* Key KPI Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Enrolled Athletes</span>
                <Users className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-black text-white">{adminMetrics?.totalStudents || 184}</div>
              <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
                <TrendingUp className="w-3 h-3" />
                <span>+12% vs last semester</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Admissions Pipeline</span>
                <FileCheck className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-3xl font-black text-white">{applications.length || 28}</div>
              <div className="text-[11px] text-slate-400 mt-1">
                {applications.filter(a => a.status === 'Trial Scheduled').length} Trials Scheduled
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Tuition Collected</span>
                <CreditCard className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-black text-white">
                ${(adminMetrics?.totalFeesCollected || 218500).toLocaleString()}
              </div>
              <div className="text-[11px] text-emerald-400 mt-1 font-semibold">
                {adminMetrics?.collectionRate || 89}% Collection Rate
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Academic & Sports Attendance</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-black text-white">{adminMetrics?.averageAttendance || 96.8}%</div>
              <div className="text-[11px] text-emerald-400 mt-1 font-semibold">Exceeds 95% PRD KPI Target</div>
            </div>
          </div>

          {/* Admissions Kanban Pipeline */}
          <AdmissionsKanban initialApplications={applications} />

          {/* Unified Timetable view for Admin */}
          <TimetableCalendar entries={timetableData.entries} conflictsDetected={timetableData.conflictsDetected} />
        </div>
      )}

      {/* ========================================================
          ROLE 2: PARENT PORTAL (US-06, US-07, Section 5.7)
          ======================================================== */}
      {activeRole === 'parent' && parentData && (
        <div className="space-y-8">
          {/* Child 360 Overview Header Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl font-black">
                LJ
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black text-white">{parentData.student.name}</h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Active Boarder
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1 space-x-3">
                  <span>Admission No: <strong className="text-slate-200">{parentData.student.admissionNo}</strong></span>
                  <span>·</span>
                  <span>{parentData.student.gradeLevel}</span>
                  <span>·</span>
                  <span>{parentData.student.sport} ({parentData.student.squad})</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Assigned Coach: <strong className="text-emerald-400">{parentData.student.coach}</strong> · Dorm: {parentData.student.roomNo}
                </div>
              </div>
            </div>

            {/* Quick child stats pills */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[11px]">Academic GPA</div>
                <div className="text-base font-bold text-white mt-0.5">{parentData.student.academicGPA}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[11px]">Attendance</div>
                <div className="text-base font-bold text-emerald-400 mt-0.5">{parentData.student.attendanceRate}%</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-slate-400 text-[11px]">Medical Status</div>
                <div className="text-base font-bold text-emerald-400 mt-0.5">Cleared</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Leave Approvals (US-06) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>Hostel Leave / Travel Outing Requests</span>
                </h3>
                <span className="text-[11px] text-slate-400">Parent Sign-off Required</span>
              </div>

              {parentData.leaveRequests.map((req) => (
                <div key={req.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{req.type}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      req.parentApprovalStatus === 'Approved'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : req.parentApprovalStatus === 'Rejected'
                        ? 'bg-rose-500/20 text-rose-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {req.parentApprovalStatus}
                    </span>
                  </div>

                  <div className="text-slate-400 space-y-1">
                    <div>Reason: <strong className="text-slate-200">{req.reason}</strong></div>
                    <div>Destination: {req.destination}</div>
                    <div className="font-mono text-emerald-400">
                      Window: {new Date(req.fromDate).toLocaleDateString()} to {new Date(req.toDate).toLocaleDateString()}
                    </div>
                  </div>

                  {req.parentApprovalStatus === 'Pending' && (
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                      <button
                        onClick={() => handleLeaveAction(req.id, 'approve')}
                        disabled={actionLoading}
                        className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve Outing</span>
                      </button>
                      <button
                        onClick={() => handleLeaveAction(req.id, 'reject')}
                        disabled={actionLoading}
                        className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-300 font-semibold text-xs flex items-center justify-center gap-1.5"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Decline</span>
                      </button>
                    </div>
                  )}

                  {req.parentApprovalStatus === 'Approved' && (
                    <div className="p-2 rounded bg-emerald-950/30 border border-emerald-800/30 text-emerald-300 text-[11px] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Approved by parent. Forwarded to Head Warden for gate pass generation.</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Fees & Payments (US-07) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>Tuition & Boarding Fee Statements</span>
                </h3>
                <span className="text-[11px] text-slate-400">Installments & Receipts</span>
              </div>

              {parentData.fees.map((inv) => (
                <div key={inv.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-sm">{inv.title}</div>
                      <div className="text-[11px] text-slate-400 font-mono">Invoice: {inv.invoiceNo}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-white">${inv.amount.toLocaleString()}</div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inv.status === 'Paid'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {inv.status}
                      </span>
                    </div>
                  </div>

                  {/* Fee item breakdown */}
                  {inv.breakdown && (
                    <div className="space-y-1 pt-2 border-t border-slate-850 text-slate-400">
                      {inv.breakdown.map((item, i) => (
                        <div key={i} className="flex justify-between text-[11px]">
                          <span>{item.item}</span>
                          <span className="font-mono text-slate-200">${item.amount}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {inv.status === 'Pending' && (
                    <div className="pt-2 border-t border-slate-800">
                      <button
                        onClick={() => handlePayTuition(inv.id)}
                        disabled={actionLoading}
                        className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Pay Now via Razorpay / Stripe (${inv.amount})</span>
                      </button>
                    </div>
                  )}

                  {inv.status === 'Paid' && (
                    <div className="p-2 rounded bg-emerald-950/30 border border-emerald-800/30 text-emerald-300 text-[11px] flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Payment verified. Official receipt issued.</span>
                      </span>
                      <button className="text-emerald-400 underline font-semibold">Download PDF</button>
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
          ROLE 3: STUDENT-ATHLETE HUB (US-03)
          ======================================================== */}
      {activeRole === 'student' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Daily Schedule Status</span>
              <div className="text-lg font-bold text-white mt-1">3 Classes · 2 Training Blocks</div>
              <div className="text-xs text-emerald-400 mt-1 font-semibold">No Overlaps / Full Recovery Rest</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Head Coach Evaluation</span>
              <div className="text-lg font-bold text-white mt-1">Serve Velocity: 114 MPH</div>
              <div className="text-xs text-slate-300 mt-1">"Excellent forehand cross-court accuracy."</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Hostel Gate Pass</span>
              <div className="text-lg font-bold text-white mt-1">Active on Campus</div>
              <div className="text-xs text-slate-300 mt-1">Next tournament leave approved</div>
            </div>
          </div>

          {/* Conflict-free Timetable */}
          <TimetableCalendar entries={timetableData.entries} conflictsDetected={false} />
        </div>
      )}

      {/* ========================================================
          ROLE 4: COACH CONSOLE (US-04, US-08)
          ======================================================== */}
      {activeRole === 'coach' && (
        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Tennis Elite U-16 Squad Roster</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Coach David Miller · High-Performance Clay & Hard Courts
                </p>
              </div>
              <button className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs">
                Log Squad Session Attendance
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">Leo Jenkins</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    Cleared
                  </span>
                </div>
                <div className="text-slate-400">UTR: 10.4 · Single Hand Backhand</div>
                <div className="text-slate-300 text-[11px]">
                  <strong>Medical Physio note:</strong> Right ankle rehabilitation completed. Full load authorized.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">Alexei Romanov</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    Cleared
                  </span>
                </div>
                <div className="text-slate-400">UTR: 10.8 · Power Baseliner</div>
                <div className="text-slate-300 text-[11px]">
                  <strong>Target:</strong> Improve second serve kick bounce above 1.8m.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">Mateo Gomez</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold">
                    Conditional Load
                  </span>
                </div>
                <div className="text-slate-400">UTR: 9.9 · Serve & Volley</div>
                <div className="text-amber-300 text-[11px]">
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
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-2">Grade 10 STEM & AP Physics Gradebook</h3>
            <p className="text-xs text-slate-400 mb-6">
              Flexible submission deadlines accommodated for athletes travelling to national tournaments.
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Kinematics in Tennis Biomechanics - Lab Report</div>
                  <div className="text-slate-400 text-[11px]">Submitted by: Leo Jenkins (Grade: A, 96/100)</div>
                </div>
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded">Graded</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Projectile Trajectory Analysis - Midterm Project</div>
                  <div className="text-slate-400 text-[11px]">Submitted by: Aria Sharma (Due: Nov 22)</div>
                </div>
                <span className="text-blue-400 font-bold bg-blue-500/10 px-2.5 py-1 rounded">In Review</span>
              </div>
            </div>
          </div>

          <TimetableCalendar entries={timetableData.entries} conflictsDetected={false} />
        </div>
      )}
    </div>
  );
}
