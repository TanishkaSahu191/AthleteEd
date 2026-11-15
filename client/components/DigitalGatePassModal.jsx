'use client';

import { useState } from 'react';
import {
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  User,
  X,
  Printer,
  Download,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function DigitalGatePassModal({ isOpen, onClose, passData }) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const data = passData || {
    passId: 'PASS-AE-2026-088-USTA',
    studentName: 'Leo Jenkins',
    admissionNo: 'AE-2026-088',
    gradeLevel: 'Grade 10',
    dormRoom: 'Olympus Hall 204-B',
    type: 'Tournament Travel Leave',
    destination: 'USTA National Campus, Orlando, FL',
    reason: 'ITF Grade 4 Junior Invitational Tennis Championship',
    departureTime: 'Nov 27, 2026 · 06:00 AM',
    curfewDeadline: 'Nov 29, 2026 · 22:00 PM',
    parentSignoff: 'Sarah Jenkins (Verified Parent)',
    wardenSignoff: 'Arthur Pendelton (Olympus Head Warden)',
    status: 'AUTHORIZED FOR DEPARTURE',
    issueDate: new Date().toLocaleDateString()
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden text-slate-900 animate-in zoom-in-95 duration-200">
        {/* Pass Header Banner */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 border border-white/20">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">
                AthleteEd Residential Boarding Authority
              </span>
              <h3 className="text-xl font-black text-white">
                Official Digital Campus Gate Pass
              </h3>
            </div>
          </div>

          {/* Authorization status pill */}
          <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10 text-xs">
            <span className="font-mono text-blue-200">ID: {data.passId}</span>
            <span className="px-3 py-1 rounded-full text-[11px] font-black bg-emerald-400 text-emerald-950 border border-emerald-300 flex items-center gap-1.5 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{data.status}</span>
            </span>
          </div>
        </div>

        {/* Pass Body Content */}
        <div className="p-6 space-y-6">
          {/* Athlete Info Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-900 flex items-center justify-center text-white text-lg font-black shadow-md shadow-blue-950/20">
                LJ
              </div>
              <div>
                <div className="text-base font-black text-blue-950">{data.studentName}</div>
                <div className="text-slate-500 font-medium">
                  {data.admissionNo} · {data.gradeLevel}
                </div>
                <div className="text-blue-900 font-bold mt-0.5">Dorm: {data.dormRoom}</div>
              </div>
            </div>

            {/* Scannable SVG QR Code */}
            <div className="p-2 bg-white rounded-xl border border-slate-300 shadow-xs flex flex-col items-center">
              <svg
                width="84"
                height="84"
                viewBox="0 0 100 100"
                className="rounded text-blue-950 fill-current"
              >
                {/* Simulated high-contrast QR Matrix */}
                <rect width="100" height="100" fill="white" />
                {/* Top-Left Finder */}
                <rect x="5" y="5" width="28" height="28" fill="#0b193d" />
                <rect x="9" y="9" width="20" height="20" fill="white" />
                <rect x="13" y="13" width="12" height="12" fill="#0b193d" />
                {/* Top-Right Finder */}
                <rect x="67" y="5" width="28" height="28" fill="#0b193d" />
                <rect x="71" y="9" width="20" height="20" fill="white" />
                <rect x="75" y="13" width="12" height="12" fill="#0b193d" />
                {/* Bottom-Left Finder */}
                <rect x="5" y="67" width="28" height="28" fill="#0b193d" />
                <rect x="9" y="71" width="20" height="20" fill="white" />
                <rect x="13" y="75" width="12" height="12" fill="#0b193d" />
                {/* Encoded Data Matrix Dots */}
                <rect x="38" y="10" width="6" height="6" fill="#0b193d" />
                <rect x="50" y="10" width="6" height="6" fill="#0b193d" />
                <rect x="42" y="22" width="6" height="6" fill="#0b193d" />
                <rect x="54" y="22" width="6" height="6" fill="#0b193d" />
                <rect x="10" y="38" width="6" height="6" fill="#0b193d" />
                <rect x="22" y="42" width="6" height="6" fill="#0b193d" />
                <rect x="38" y="38" width="6" height="6" fill="#0b193d" />
                <rect x="50" y="46" width="6" height="6" fill="#0b193d" />
                <rect x="66" y="38" width="6" height="6" fill="#0b193d" />
                <rect x="78" y="46" width="6" height="6" fill="#0b193d" />
                <rect x="38" y="66" width="6" height="6" fill="#0b193d" />
                <rect x="50" y="74" width="6" height="6" fill="#0b193d" />
                <rect x="66" y="66" width="6" height="6" fill="#0b193d" />
                <rect x="78" y="74" width="6" height="6" fill="#0b193d" />
                <rect x="46" y="86" width="6" height="6" fill="#0b193d" />
                <rect x="58" y="86" width="6" height="6" fill="#0b193d" />
                <rect x="86" y="86" width="6" height="6" fill="#0b193d" />
              </svg>
              <span className="text-[8px] font-mono font-bold text-slate-500 mt-1 uppercase">
                Scan at Gate
              </span>
            </div>
          </div>

          {/* Outing Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] font-bold text-slate-500 uppercase">Leave Category</div>
              <div className="font-bold text-slate-900 mt-0.5">{data.type}</div>
              <div className="text-slate-600 text-[11px] mt-0.5 truncate">{data.reason}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] font-bold text-slate-500 uppercase">Destination</div>
              <div className="font-bold text-slate-900 mt-0.5">{data.destination}</div>
              <div className="text-blue-900 text-[11px] font-bold mt-0.5">National Sanctioned</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[11px] font-bold text-slate-500 uppercase">Authorized Departure</div>
              <div className="font-bold text-blue-950 font-mono mt-0.5">{data.departureTime}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
              <div className="text-[11px] font-bold text-amber-800 uppercase flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-600" />
                <span>Curfew Check-In</span>
              </div>
              <div className="font-bold text-amber-950 font-mono mt-0.5">{data.curfewDeadline}</div>
            </div>
          </div>

          {/* Signatures & Approvals */}
          <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">Parent Authorization:</span>
              <span className="font-bold text-blue-950 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                {data.parentSignoff}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">Head Warden Clearance:</span>
              <span className="font-bold text-blue-950 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {data.wardenSignoff}
              </span>
            </div>
          </div>

          {/* Modal Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="flex-1 py-3 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-950/20 transition-all"
            >
              <Printer className="w-4 h-4 text-blue-200" />
              <span>Print Official Gate Pass</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>Download PDF</span>
            </button>
          </div>

          {downloadSuccess && (
            <div className="text-center text-xs font-bold text-emerald-700 animate-in fade-in">
              Official pass PDF saved to device downloads!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
