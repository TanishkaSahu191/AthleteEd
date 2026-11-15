'use client';

import { useState, useEffect } from 'react';
import RoleSwitcher from '../../components/RoleSwitcher';
import TimetableCalendar from '../../components/TimetableCalendar';
import AdmissionsKanban from '../../components/AdmissionsKanban';
import SportsTelemetry from '../../components/SportsTelemetry';
import DigitalGatePassModal from '../../components/DigitalGatePassModal';
import {
  getApplications,
  getTimetable,
  getParentOverview,
  getAdminMetrics,
  getMedicalRecords,
  updateAthleteClearance,
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
  X,
  Activity,
  AlertTriangle,
  ShieldAlert,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Dumbbell,
  Send,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export default function PortalPage() {
  const [activeRole, setActiveRole] = useState('admin');
  const [loading, setLoading] = useState(true);

  // Data states
  const [adminMetrics, setAdminMetrics] = useState(null);
  const [applications, setApplications] = useState([]);
  const [timetableData, setTimetableData] = useState({ entries: [], conflictsDetected: false });
  const [parentData, setParentData] = useState(null);

  // Medical Alert Chain State (US-08: Dr. Maya Lin -> Coach David Miller -> Parent Sarah Jenkins)
  const [athleteHealth, setAthleteHealth] = useState({
    studentId: 'stu_101',
    studentName: 'Leo Jenkins',
    sport: 'Tennis (Elite U-16 Squad)',
    clearanceStatus: 'Cleared - Full Training', // 'Cleared - Full Training' | 'Modified Load: Conditional Clearance' | 'Restricted / Medical Bench'
    diagnosis: 'Right ankle strain (rehabilitated)',
    restrictions: 'None. Cleared for 100% competition training volume.',
    cryotherapyRequired: false,
    maxDailyTrainingMinutes: 180,
    attendingPhysio: 'Dr. Maya Lin, PT',
    lastEvaluated: '2026-11-14T09:30:00Z',
    alertHistory: []
  });

  const [medicalFormStatus, setMedicalFormStatus] = useState('Modified Load: Conditional Clearance');
  const [medicalFormDiagnosis, setMedicalFormDiagnosis] = useState('Bilateral tibial stress reaction (Shin Splints)');
  const [medicalFormRestrictions, setMedicalFormRestrictions] = useState('Limit running drills to 20 mins max; No hardcourt plyometrics; Daily cryotherapy required');
  const [medicalFormMaxMins, setMedicalFormMaxMins] = useState(45);
  const [medicalFormCryo, setMedicalFormCryo] = useState(true);
  const [medicalBroadcastSuccess, setMedicalBroadcastSuccess] = useState(false);
  const [coachAcknowledged, setCoachAcknowledged] = useState(false);
  const [parentAcknowledged, setParentAcknowledged] = useState(false);

  // Digital Gate Pass Modal State (US-07)
  const [gatePassModalOpen, setGatePassModalOpen] = useState(false);
  const [selectedPassData, setSelectedPassData] = useState(null);

  const handleOpenGatePass = (req = null) => {
    setSelectedPassData({
      passId: req ? `PASS-AE-2026-${req.id}` : 'PASS-AE-2026-088-USTA',
      studentName: 'Leo Jenkins',
      admissionNo: 'AE-2026-088',
      gradeLevel: 'Grade 10',
      dormRoom: 'Olympus Hall 204-B',
      type: req ? req.type : 'Tournament Travel Leave',
      destination: req ? req.destination : 'USTA National Campus, Orlando, FL',
      reason: req ? req.reason : 'ITF Grade 4 Junior Invitational Tennis Championship',
      departureTime: req?.fromDate ? new Date(req.fromDate).toLocaleString() : 'Nov 27, 2026 · 06:00 AM',
      curfewDeadline: req?.toDate ? new Date(req.toDate).toLocaleString() : 'Nov 29, 2026 · 22:00 PM',
      parentSignoff: 'Sarah Jenkins (Verified Parent)',
      wardenSignoff: 'Arthur Pendelton (Olympus Head Warden)',
      status: 'AUTHORIZED FOR DEPARTURE'
    });
    setGatePassModalOpen(true);
  };

  // Interaction feedback states
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [leaveStatusUpdated, setLeaveStatusUpdated] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [metrics, apps, tt, parent, medRecords] = await Promise.all([
          getAdminMetrics(),
          getApplications(),
          getTimetable(),
          getParentOverview(),
          getMedicalRecords()
        ]);

        setAdminMetrics(metrics);
        setApplications(apps);
        setTimetableData(tt);
        setParentData(parent);

        if (medRecords && medRecords.length > 0) {
          const leoRecord = medRecords.find(r => r.studentId === 'stu_101') || medRecords[0];
          setAthleteHealth(prev => ({
            ...prev,
            ...leoRecord
          }));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Dispatch Medical Directive (Dr. Maya Lin)
  const handleBroadcastMedicalDirective = async () => {
    setActionLoading(true);
    const payload = {
      clearanceStatus: medicalFormStatus,
      diagnosis: medicalFormDiagnosis,
      restrictions: medicalFormRestrictions,
      maxDailyTrainingMinutes: medicalFormMaxMins,
      cryotherapyRequired: medicalFormCryo
    };

    const res = await updateAthleteClearance('stu_101', payload);

    if (res && res.success) {
      setAthleteHealth(prev => ({
        ...prev,
        ...payload,
        lastEvaluated: new Date().toISOString(),
        alertHistory: [
          {
            id: `alt_${Date.now()}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            directive: payload.restrictions,
            status: payload.clearanceStatus
          },
          ...prev.alertHistory
        ]
      }));

      // Update parent data fitness clearance in-place
      if (parentData && parentData.student) {
        setParentData(prev => ({
          ...prev,
          student: {
            ...prev.student,
            fitnessClearance: payload.clearanceStatus,
            injuryNotes: `${payload.diagnosis}: ${payload.restrictions}`
          }
        }));
      }

      setMedicalBroadcastSuccess(true);
      setCoachAcknowledged(false);
      setParentAcknowledged(false);
      setTimeout(() => setMedicalBroadcastSuccess(false), 5000);
    }
    setActionLoading(false);
  };

  // Quick Preset Handlers
  const handleApplyPreset = (presetType) => {
    if (presetType === 'shin_splints') {
      setMedicalFormStatus('Modified Load: Conditional Clearance');
      setMedicalFormDiagnosis('Bilateral tibial stress reaction (Shin Splints)');
      setMedicalFormRestrictions('Limit running to 20 mins max; No hardcourt plyometrics; Daily cryotherapy required');
      setMedicalFormMaxMins(45);
      setMedicalFormCryo(true);
    } else if (presetType === 'ankle_sprain') {
      setMedicalFormStatus('Modified Load: Conditional Clearance');
      setMedicalFormDiagnosis('Right anterior talofibular ligament irritation');
      setMedicalFormRestrictions('Non-impact stationary bike & resistance bands only; No lateral sprints on court');
      setMedicalFormMaxMins(30);
      setMedicalFormCryo(true);
    } else if (presetType === 'full_clearance') {
      setMedicalFormStatus('Cleared - Full Training');
      setMedicalFormDiagnosis('All musculoskeletal screenings normal');
      setMedicalFormRestrictions('None. Cleared for 100% full tournament competition load.');
      setMedicalFormMaxMins(180);
      setMedicalFormCryo(false);
    }
  };

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

  const isMedicalAlertActive = athleteHealth.clearanceStatus !== 'Cleared - Full Training';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-slate-900">
      {/* Role Simulator Switcher Bar */}
      <RoleSwitcher
        activeRole={activeRole}
        onSelectRole={setActiveRole}
        hasMedicalAlert={isMedicalAlertActive}
      />

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
            {activeRole === 'medical' && 'Sports Medicine Clinic & Physio Command (Dr. Maya Lin, PT)'}
            {activeRole === 'coach' && 'Head Coach Coaching Console: Tennis Academy (Coach David Miller)'}
            {activeRole === 'parent' && 'Parent 360° Portal: Sarah Jenkins (Child: Leo Jenkins)'}
            {activeRole === 'student' && 'Student-Athlete Unified Hub: Leo Jenkins (Grade 10)'}
            {activeRole === 'teacher' && 'Academic Faculty & Curriculum Portal: Dr. Elena Rostova'}
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

          {/* Unified Timetable with Conflict Simulation Engine */}
          <TimetableCalendar entries={timetableData.entries} conflictsDetected={timetableData.conflictsDetected} />
        </div>
      )}

      {/* ========================================================
          ROLE 2: SPORTS MEDICINE & PHYSIO COMMAND (US-08)
          ======================================================== */}
      {activeRole === 'medical' && (
        <div className="space-y-8">
          {/* Clinic Stats & Dispatcher */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs mb-2 font-bold">
                <span>Athletes Screened</span>
                <Activity className="w-4 h-4 text-blue-800" />
              </div>
              <div className="text-3xl font-black text-blue-950">184</div>
              <div className="text-[11px] text-emerald-700 mt-1 font-bold">100% Medical Clearances Active</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs mb-2 font-bold">
                <span>Active Physio Protocols</span>
                <Dumbbell className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-3xl font-black text-amber-700">{isMedicalAlertActive ? '2' : '1'}</div>
              <div className="text-[11px] text-slate-500 mt-1 font-medium">Rehabilitation in progress</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs mb-2 font-bold">
                <span>Cryotherapy Sessions</span>
                <ShieldCheck className="w-4 h-4 text-blue-700" />
              </div>
              <div className="text-3xl font-black text-blue-950">14</div>
              <div className="text-[11px] text-blue-700 mt-1 font-bold">Daily Post-Practice Ice Baths</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 text-xs mb-2 font-bold">
                <span>Broadcast Alert Status</span>
                <AlertTriangle className="w-4 h-4 text-rose-600" />
              </div>
              <div className="text-xl font-black text-blue-950 mt-1">
                {isMedicalAlertActive ? 'Directive Active' : 'Normal Operations'}
              </div>
              <div className="text-[11px] text-slate-500 mt-1 font-medium">
                Connected to Coach & Parent Bus
              </div>
            </div>
          </div>

          {/* Interactive Medical Clearance & Injury Dispatch Form */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-blue-950">
                    Cross-Role Injury & Training Clearance Dispatcher (US-08)
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-200">
                    Live Reactive Propagation
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Dr. Maya Lin issues medical directives that automatically enforce load restrictions on Coach Miller's squad roster and alert Parent Sarah Jenkins.
                </p>
              </div>

              {/* Quick simulation presets */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mr-1">Presets:</span>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('shin_splints')}
                  className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-all"
                >
                  Flag Shin Splints
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('ankle_sprain')}
                  className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 text-xs font-bold transition-all"
                >
                  Flag Ankle Strain
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPreset('full_clearance')}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold transition-all"
                >
                  Full 100% Cleared
                </button>
              </div>
            </div>

            {/* Target Athlete Header */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-900 flex items-center justify-center text-white font-bold">
                  LJ
                </div>
                <div>
                  <div className="font-black text-slate-900 text-sm">Leo Jenkins · Admission AE-2026-088</div>
                  <div className="text-slate-500 font-medium">Tennis Elite U-16 Squad · Head Coach: David Miller · Parent: Sarah Jenkins</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-medium">Current Status:</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                  athleteHealth.clearanceStatus.includes('Cleared')
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                }`}>
                  {athleteHealth.clearanceStatus}
                </span>
              </div>
            </div>

            {/* Form Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1.5">Clearance Classification</label>
                <select
                  value={medicalFormStatus}
                  onChange={(e) => setMedicalFormStatus(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 focus:outline-none focus:border-blue-900"
                >
                  <option value="Cleared - Full Training">Cleared - Full Training (100% Match Load)</option>
                  <option value="Modified Load: Conditional Clearance">Modified Load: Conditional Clearance (Cap Drills & Intensity)</option>
                  <option value="Restricted: Medical Bench">Restricted: Medical Bench (Total Suspension from Sports)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1.5">Max Daily Training Minutes</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="15"
                    max="180"
                    step="15"
                    value={medicalFormMaxMins}
                    onChange={(e) => setMedicalFormMaxMins(Number(e.target.value))}
                    className="flex-1 accent-blue-900"
                  />
                  <span className="font-mono font-bold text-blue-950 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                    {medicalFormMaxMins} mins
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1.5">Diagnosis / Clinical Finding</label>
                <input
                  type="text"
                  value={medicalFormDiagnosis}
                  onChange={(e) => setMedicalFormDiagnosis(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 focus:outline-none focus:border-blue-900"
                  placeholder="e.g. Bilateral tibial stress reaction (Shin Splints)"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1.5">Physio Directives & Activity Restrictions</label>
                <input
                  type="text"
                  value={medicalFormRestrictions}
                  onChange={(e) => setMedicalFormRestrictions(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 focus:outline-none focus:border-blue-900"
                  placeholder="e.g. Limit running to 20 mins max; No hardcourt plyometrics"
                />
              </div>
            </div>

            {/* Cryotherapy checkbox */}
            <div className="flex items-center gap-2 pt-1 text-xs">
              <input
                type="checkbox"
                id="cryoCheck"
                checked={medicalFormCryo}
                onChange={(e) => setMedicalFormCryo(e.target.checked)}
                className="w-4 h-4 rounded text-blue-900 accent-blue-900"
              />
              <label htmlFor="cryoCheck" className="font-bold text-slate-700 cursor-pointer">
                Mandatory Post-Practice Cryotherapy / Ice Bath Protocol Required
              </label>
            </div>

            {/* Action CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleBroadcastMedicalDirective}
                disabled={actionLoading}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-950/20 transition-all"
              >
                <Send className="w-3.5 h-3.5 text-blue-200" />
                <span>Broadcast Real-Time Directive to Coach Miller & Parent Sarah</span>
              </button>

              {medicalBroadcastSuccess && (
                <div className="text-xs text-emerald-800 font-bold flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Broadcast Dispatched! Coach roster & Parent portal synchronized in real time.</span>
                </div>
              )}
            </div>

            {/* Live Audit Log */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                Recent Broadcast Transmission Log
              </h4>
              <div className="space-y-2">
                {athleteHealth.alertHistory && athleteHealth.alertHistory.length > 0 ? (
                  athleteHealth.alertHistory.map((log, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-blue-700" />
                        <span className="font-bold text-slate-800">{log.status}:</span>
                        <span className="text-slate-600">{log.directive}</span>
                      </div>
                      <span className="font-mono text-slate-400 font-medium">{log.timestamp}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-slate-400">Initial evaluation recorded at academy onboarding.</div>
                )}
              </div>
            </div>
          </div>

          {/* Timetable view */}
          <TimetableCalendar entries={timetableData.entries} conflictsDetected={timetableData.conflictsDetected} />
        </div>
      )}

      {/* ========================================================
          ROLE 3: COACH CONSOLE (Receives Medical Alert US-08)
          ======================================================== */}
      {activeRole === 'coach' && (
        <div className="space-y-8">
          {/* Medical Alert Warning Banner if Active */}
          {isMedicalAlertActive && (
            <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-3 shadow-sm animate-in fade-in">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-500 text-white shadow-xs">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-black text-amber-950">
                        ACTIVE PHYSIO RESTRICTION DIRECTIVE FROM DR. MAYA LIN
                      </h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-200 text-amber-900 border border-amber-300">
                        Load Capped at {athleteHealth.maxDailyTrainingMinutes} mins
                      </span>
                    </div>
                    <p className="text-xs text-amber-900 mt-1 font-medium leading-relaxed">
                      Athlete: <strong>{athleteHealth.studentName}</strong> · Diagnosis: <strong>{athleteHealth.diagnosis}</strong>.
                      <br />
                      Directive: <span className="underline font-bold">{athleteHealth.restrictions}</span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCoachAcknowledged(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                    coachAcknowledged
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-amber-900 hover:bg-amber-950 text-white shadow-xs'
                  }`}
                >
                  {coachAcknowledged ? 'Acknowledged by Coach' : 'Confirm & Adjust Drills'}
                </button>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold text-amber-800 pt-1 border-t border-amber-200/60">
                <span>Auto-Adjustment: High-intensity groundstroke plyometrics locked out.</span>
                {athleteHealth.cryotherapyRequired && (
                  <span>· Mandatory Cryo Check-in at 15:30.</span>
                )}
              </div>
            </div>
          )}

          {/* Squad Roster */}
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
              {/* Leo Jenkins Card (Reacts directly to Physio) */}
              <div className={`p-4 rounded-xl border text-xs space-y-2 transition-all ${
                isMedicalAlertActive
                  ? 'bg-amber-50/60 border-amber-300 ring-2 ring-amber-400/20 shadow-xs'
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-sm">{athleteHealth.studentName}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    isMedicalAlertActive
                      ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
                      : 'bg-blue-100 text-blue-900 border-blue-200'
                  }`}>
                    {athleteHealth.clearanceStatus}
                  </span>
                </div>
                <div className="text-slate-600 font-medium">UTR: 10.4 · Single Hand Backhand</div>
                <div className={`text-[11px] font-medium p-2 rounded-lg border ${
                  isMedicalAlertActive
                    ? 'bg-white border-amber-200 text-amber-950'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}>
                  <strong>Physio Directive:</strong> {athleteHealth.restrictions}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Attending: {athleteHealth.attendingPhysio}
                </div>
              </div>

              {/* Alexei Romanov */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-sm">Alexei Romanov</span>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200 text-[10px] font-bold">
                    Cleared
                  </span>
                </div>
                <div className="text-slate-600 font-medium">UTR: 10.8 · Power Baseliner</div>
                <div className="text-slate-700 text-[11px] font-medium p-2 rounded-lg bg-white border border-slate-200">
                  <strong>Target:</strong> Improve second serve kick bounce above 1.8m.
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Full Training Clearance
                </div>
              </div>

              {/* Mateo Gomez */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-sm">Mateo Gomez</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200 text-[10px] font-bold">
                    Conditional Load
                  </span>
                </div>
                <div className="text-slate-600 font-medium">UTR: 9.9 · Serve & Volley</div>
                <div className="text-amber-900 text-[11px] font-medium p-2 rounded-lg bg-white border border-amber-200">
                  <strong>Medical restriction:</strong> 45-minute limit on hardcourt impacts (shin splints).
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Attending: Dr. Maya Lin, PT
                </div>
              </div>
            </div>
          </div>

          {/* Coach Live Sports Science & GPS Telemetry Feed */}
          <SportsTelemetry studentName="Leo Jenkins" sport="Tennis Elite U-16 Squad" />

          <TimetableCalendar entries={timetableData.entries} conflictsDetected={false} />
        </div>
      )}

      {/* ========================================================
          ROLE 4: PARENT PORTAL (Receives Medical Alert US-08)
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
                <div className="flex items-center gap-2 flex-wrap">
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
              <div className={`p-3.5 rounded-xl border ${
                isMedicalAlertActive
                  ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400/20'
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="text-slate-500 text-[11px] font-semibold">Medical Status</div>
                <div className={`text-sm font-black mt-0.5 ${
                  isMedicalAlertActive ? 'text-amber-800' : 'text-emerald-700'
                }`}>
                  {athleteHealth.clearanceStatus.includes('Cleared') ? 'Cleared' : 'Modified Load'}
                </div>
              </div>
            </div>
          </div>

          {/* Dedicated Sports Medicine & Rehab Bulletin Card for Parents */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-800" />
                <h3 className="text-sm font-black text-blue-950">
                  Sports Medicine & Athletic Rehabilitation Bulletin
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400 font-medium">
                Supervised by {athleteHealth.attendingPhysio}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Clinical Status</div>
                <div className="text-sm font-black text-slate-900">{athleteHealth.clearanceStatus}</div>
                <div className="text-slate-600 font-medium">
                  <strong>Diagnosis:</strong> {athleteHealth.diagnosis}
                </div>
                <div className="text-slate-600 font-medium">
                  <strong>Daily Max Training:</strong> {athleteHealth.maxDailyTrainingMinutes} minutes
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Physiotherapy Directive</div>
                <div className="text-xs text-slate-800 font-medium leading-relaxed">
                  {athleteHealth.restrictions}
                </div>
                {athleteHealth.cryotherapyRequired && (
                  <div className="text-[11px] text-blue-800 font-bold flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                    <span>Cryotherapy Ice-Bath Session: Daily post-training protocol active.</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs flex-wrap gap-2">
              <span className="text-slate-500 font-medium">
                Last Evaluated: {new Date(athleteHealth.lastEvaluated).toLocaleDateString()} by Sports Medicine Staff.
              </span>
              <button
                type="button"
                onClick={() => setParentAcknowledged(true)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  parentAcknowledged
                    ? 'bg-blue-100 text-blue-900 border border-blue-200'
                    : 'bg-blue-900 hover:bg-blue-950 text-white shadow-xs'
                }`}
              >
                {parentAcknowledged ? 'Medical Directive Acknowledged' : 'Acknowledge Care Plan'}
              </button>
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
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-[11px] font-semibold flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
                        <span>Approved by parent. Signed by Warden Pendelton.</span>
                      </div>
                      <button
                        onClick={() => handleOpenGatePass(req)}
                        className="px-3 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs whitespace-nowrap shadow-xs flex items-center justify-center gap-1"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>View Digital Gate Pass (QR)</span>
                      </button>
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
          ROLE 5: STUDENT-ATHLETE HUB
          ======================================================== */}
      {activeRole === 'student' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold">Daily Schedule Status</span>
              <div className="text-lg font-black text-blue-950 mt-1">3 Classes · 2 Training Blocks</div>
              <div className="text-xs text-blue-700 mt-1 font-bold">No Overlaps / Full Rest</div>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold">Head Coach Evaluation</span>
              <div className="text-lg font-black text-blue-950 mt-1">Serve: 114 MPH</div>
              <div className="text-xs text-slate-600 mt-1 font-medium">"High forehand cross-court accuracy."</div>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 font-semibold">Physio Clearance</span>
              <div className="text-lg font-black text-blue-950 mt-1">{athleteHealth.clearanceStatus.split('-')[0]}</div>
              <div className="text-xs text-slate-600 mt-1 font-medium">
                {isMedicalAlertActive ? 'Follow cryo schedule at 15:30' : 'Full tournament load permitted'}
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs text-slate-500 font-semibold">Digital Dorm Gate Pass</span>
                <div className="text-sm font-black text-blue-950 mt-1 truncate">USTA National Campus, FL</div>
                <div className="text-xs text-emerald-700 font-bold">Authorized for Departure</div>
              </div>
              <button
                type="button"
                onClick={() => handleOpenGatePass()}
                className="mt-3 py-2 px-3 rounded-lg bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-200" />
                <span>Show Gate Pass (QR)</span>
              </button>
            </div>
          </div>

          {/* Student Biometrics & Telemetry Feed */}
          <SportsTelemetry studentName="Leo Jenkins" sport="Tennis Elite U-16 Squad" />

          <TimetableCalendar entries={timetableData.entries} conflictsDetected={false} />
        </div>
      )}

      {/* ========================================================
          ROLE 6: TEACHER FACULTY
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

      {/* Digital Gate Pass Modal (US-07) */}
      <DigitalGatePassModal
        isOpen={gatePassModalOpen}
        onClose={() => setGatePassModalOpen(false)}
        passData={selectedPassData}
      />
    </div>
  );
}
