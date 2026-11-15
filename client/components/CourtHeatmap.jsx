'use client';

import { useState } from 'react';
import { Target, Zap, Activity, Eye, Compass, Info, CheckCircle2 } from 'lucide-react';

export default function CourtHeatmap({ athleteName = 'Leo Jenkins', sport = 'Tennis' }) {
  const [viewMode, setViewMode] = useState('serves'); // 'serves' | 'groundstrokes' | 'net'
  const [activeShot, setActiveShot] = useState(null);

  const serveShots = [
    { id: 1, x: 38, y: 38, speed: '118 MPH', type: 'Flat Ace', result: 'Winner', zone: 'Deuce Court (T)' },
    { id: 2, x: 42, y: 41, speed: '114 MPH', type: 'Slice Out-Wide', result: 'Unreturned', zone: 'Deuce Wide' },
    { id: 3, x: 40, y: 32, speed: '116 MPH', type: 'Kick Serve', result: 'Weak Return', zone: 'Deuce Body' },
    { id: 4, x: 62, y: 38, speed: '119 MPH', type: 'Flat Down-The-T', result: 'Winner', zone: 'Ad Court (T)' },
    { id: 5, x: 58, y: 42, speed: '112 MPH', type: 'Heavy Topspin Kick', result: 'Forced Error', zone: 'Ad Wide' },
    { id: 6, x: 60, y: 34, speed: '115 MPH', type: 'Slice Body Jam', result: 'In Play', zone: 'Ad Body' },
  ];

  const groundstrokeShots = [
    { id: 7, x: 30, y: 15, speed: '86 MPH', type: 'Forehand Cross-Court Inside-Out', result: 'Winner', zone: 'Deep Baseline' },
    { id: 8, x: 72, y: 18, speed: '82 MPH', type: 'Backhand Down-The-Line', result: 'Winner', zone: 'Baseline Corner' },
    { id: 9, x: 48, y: 22, speed: '79 MPH', type: 'Topspin Heavy Loop', result: 'Deep Defense', zone: 'Center Deep' },
    { id: 10, x: 34, y: 25, speed: '88 MPH', type: 'Inside-In Forehand', result: 'Winner', zone: 'Mid-Court Kill' },
  ];

  const currentShots = viewMode === 'serves' ? serveShots : groundstrokeShots;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-black text-blue-950">
              PlaySight Biomechanical Court Visualizer
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-200 font-mono">
              4K 120 FPS Optical Tracking
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Shot trajectory & landing zone distribution for <strong>{athleteName}</strong>.
          </p>
        </div>

        {/* View Mode Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => { setViewMode('serves'); setActiveShot(null); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'serves'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Serves (118 MPH)
          </button>
          <button
            onClick={() => { setViewMode('groundstrokes'); setActiveShot(null); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'groundstrokes'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Groundstrokes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Interactive SVG Tennis Court */}
        <div className="lg:col-span-2 relative bg-[#0b193d] rounded-2xl p-4 sm:p-6 shadow-inner border border-blue-900/50 overflow-hidden">
          <div className="text-center mb-2 flex items-center justify-between text-[11px] text-blue-300 font-mono">
            <span>FAR BASELINE (OPPONENT)</span>
            <span className="text-xs text-amber-300 font-bold">Hover dot for ball telemetry</span>
            <span>NEAR BASELINE (LEO JENKINS)</span>
          </div>

          <div className="relative aspect-[16/9] w-full bg-[#1e3a8a] rounded-xl border-2 border-white/90 overflow-hidden shadow-2xl">
            {/* Court Markings */}
            <svg viewBox="0 0 100 60" className="w-full h-full">
              {/* Outer boundary */}
              <rect x="0" y="0" width="100" height="60" fill="#1e3a8a" />
              {/* Inner singles lines */}
              <line x1="0" y1="8" x2="100" y2="8" stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" />
              <line x1="0" y1="52" x2="100" y2="52" stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" />
              {/* Baseline center marks */}
              <line x1="0" y1="30" x2="3" y2="30" stroke="white" strokeWidth="0.8" />
              <line x1="97" y1="30" x2="100" y2="30" stroke="white" strokeWidth="0.8" />
              {/* Center Net */}
              <line x1="50" y1="0" x2="50" y2="60" stroke="#f8fafc" strokeWidth="1.4" strokeDasharray="1.5,1" />
              {/* Service boxes */}
              <line x1="28" y1="8" x2="28" y2="52" stroke="white" strokeWidth="0.8" />
              <line x1="72" y1="8" x2="72" y2="52" stroke="white" strokeWidth="0.8" />
              <line x1="28" y1="30" x2="72" y2="30" stroke="white" strokeWidth="0.8" />

              {/* Service Box Heat Zone Glows */}
              {viewMode === 'serves' && (
                <>
                  {/* Deuce T Glow */}
                  <circle cx="38" cy="38" r="8" fill="rgba(59, 130, 246, 0.35)" filter="blur(3px)" />
                  {/* Ad T Glow */}
                  <circle cx="62" cy="38" r="8" fill="rgba(59, 130, 246, 0.35)" filter="blur(3px)" />
                  {/* Out Wide Glows */}
                  <circle cx="42" cy="48" r="6" fill="rgba(14, 165, 233, 0.3)" filter="blur(2px)" />
                  <circle cx="58" cy="48" r="6" fill="rgba(14, 165, 233, 0.3)" filter="blur(2px)" />
                </>
              )}

              {/* Interactive Ball Placement Pins */}
              {currentShots.map((shot) => {
                const isSelected = activeShot?.id === shot.id;
                return (
                  <g
                    key={shot.id}
                    className="cursor-pointer transition-transform hover:scale-125"
                    onClick={() => setActiveShot(shot)}
                    onMouseEnter={() => setActiveShot(shot)}
                  >
                    <circle
                      cx={shot.x}
                      cy={shot.y}
                      r={isSelected ? 2.5 : 1.6}
                      fill={isSelected ? '#facc15' : '#38bdf8'}
                      stroke="#ffffff"
                      strokeWidth="0.6"
                      className="animate-pulse"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Hover Tooltip Overlay */}
            {activeShot && (
              <div
                className="absolute bg-slate-950/95 backdrop-blur-md border border-blue-400 text-white p-2.5 rounded-xl shadow-xl text-xs pointer-events-none transform -translate-x-1/2 -translate-y-full z-20"
                style={{ left: `${activeShot.x}%`, top: `${activeShot.y - 4}%` }}
              >
                <div className="font-black text-amber-300 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>{activeShot.speed} · {activeShot.type}</span>
                </div>
                <div className="text-[10px] text-slate-300 mt-0.5">
                  Result: <span className="font-bold text-emerald-400">{activeShot.result}</span> ({activeShot.zone})
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Biomechanical Summary Panel */}
        <div className="space-y-3.5 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase">First Serve Velocity</span>
            <div className="text-2xl font-black text-blue-950 mt-1">118 MPH <span className="text-xs font-semibold text-emerald-600">(Peak)</span></div>
            <div className="text-slate-600 mt-0.5 font-medium">Average 1st Serve: 111.4 MPH</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase">Accuracy & Placement Rate</span>
            <div className="text-2xl font-black text-blue-700 mt-1">68.4% In</div>
            <div className="text-slate-600 mt-0.5 font-medium">Points Won on 1st Serve: 78.2%</div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-blue-950 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-700" />
              <span>Coaching Takeaway</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-700 font-medium">
              Excellent disguise on the Deuce T kick serve. Opponents forced out of position on 82% of wide slice attempts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
