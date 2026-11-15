'use client';

import { useState } from 'react';
import {
  Activity,
  HeartPulse,
  Zap,
  TrendingUp,
  Flame,
  ShieldCheck,
  Clock,
  Compass,
  Gauge
} from 'lucide-react';

export default function SportsTelemetry({ studentName = 'Leo Jenkins', sport = 'Tennis' }) {
  const [selectedSession, setSelectedSession] = useState('match');

  const sessionData = {
    match: {
      label: 'Match Play & Tactical Drills (Today, 16:00)',
      totalDistance: '7.82 km',
      highSpeedDistance: '1,420 m',
      topSpeed: '29.4 km/h',
      avgHeartRate: '164 BPM',
      peakHeartRate: '188 BPM',
      acwr: '1.18',
      acwrStatus: 'Optimal Load (Sweet Spot)',
      calories: '840 kcal',
      playerLoad: '482 AU',
      zones: [
        { label: 'Zone 5 (Anaerobic >180 BPM)', pct: 18, color: 'bg-rose-500' },
        { label: 'Zone 4 (Threshold 160-180 BPM)', pct: 44, color: 'bg-amber-500' },
        { label: 'Zone 3 (Aerobic 140-160 BPM)', pct: 26, color: 'bg-blue-600' },
        { label: 'Zone 1-2 (Recovery <140 BPM)', pct: 12, color: 'bg-emerald-500' },
      ],
      speedSurges: [
        { time: '16:18', speed: '27.8 km/h', context: 'Baseline Forehand Recovery' },
        { time: '16:42', speed: '29.4 km/h', context: 'Net Approach Volley Winner' },
        { time: '17:15', speed: '28.1 km/h', context: 'Defensive Drop-Shot Chase' },
      ]
    },
    conditioning: {
      label: 'Morning Strength & Agility (Today, 06:30)',
      totalDistance: '4.15 km',
      highSpeedDistance: '890 m',
      topSpeed: '26.8 km/h',
      avgHeartRate: '148 BPM',
      peakHeartRate: '174 BPM',
      acwr: '1.12',
      acwrStatus: 'Optimal Recovery Response',
      calories: '510 kcal',
      playerLoad: '310 AU',
      zones: [
        { label: 'Zone 5 (Anaerobic >180 BPM)', pct: 6, color: 'bg-rose-500' },
        { label: 'Zone 4 (Threshold 160-180 BPM)', pct: 32, color: 'bg-amber-500' },
        { label: 'Zone 3 (Aerobic 140-160 BPM)', pct: 48, color: 'bg-blue-600' },
        { label: 'Zone 1-2 (Recovery <140 BPM)', pct: 14, color: 'bg-emerald-500' },
      ],
      speedSurges: [
        { time: '06:45', speed: '25.2 km/h', context: 'Cone Agility Lateral Shuffle' },
        { time: '07:12', speed: '26.8 km/h', context: 'Resisted Band Sprint Drill' },
      ]
    },
    weekly: {
      label: '7-Day Rolling Workload Aggregate',
      totalDistance: '38.4 km',
      highSpeedDistance: '6,840 m',
      topSpeed: '30.1 km/h',
      avgHeartRate: '156 BPM',
      peakHeartRate: '191 BPM',
      acwr: '1.15',
      acwrStatus: 'Safe Microcycle Progression',
      calories: '4,620 kcal',
      playerLoad: '2,410 AU',
      zones: [
        { label: 'Zone 5 (Anaerobic >180 BPM)', pct: 14, color: 'bg-rose-500' },
        { label: 'Zone 4 (Threshold 160-180 BPM)', pct: 38, color: 'bg-amber-500' },
        { label: 'Zone 3 (Aerobic 140-160 BPM)', pct: 34, color: 'bg-blue-600' },
        { label: 'Zone 1-2 (Recovery <140 BPM)', pct: 14, color: 'bg-emerald-500' },
      ],
      speedSurges: [
        { time: 'Wed', speed: '30.1 km/h', context: 'Peak Sprint (Match Tiebreak)' },
        { time: 'Fri', speed: '29.7 km/h', context: 'Fast-Break Cross-Court' },
      ]
    }
  };

  const current = sessionData[selectedSession];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm space-y-6">
      {/* Header & Session Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-black text-blue-950">
              Sports Science & GPS Telemetry (US-06)
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-200 font-mono">
              Catapult S7 Live Feed
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Live biomechanical metrics and load monitoring for <strong>{studentName}</strong> ({sport}).
          </p>
        </div>

        {/* Session Switcher Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setSelectedSession('match')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedSession === 'match'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Today's Match
          </button>
          <button
            onClick={() => setSelectedSession('conditioning')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedSession === 'conditioning'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Conditioning
          </button>
          <button
            onClick={() => setSelectedSession('weekly')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedSession === 'weekly'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            7-Day Aggregate
          </button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1 font-semibold">
            <span>Total GPS Distance</span>
            <Compass className="w-3.5 h-3.5 text-blue-800" />
          </div>
          <div className="text-2xl font-black text-blue-950">{current.totalDistance}</div>
          <div className="text-[11px] text-blue-800 mt-0.5 font-bold">
            {current.highSpeedDistance} High-Speed Run
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1 font-semibold">
            <span>Peak Sprint Speed</span>
            <Zap className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-700">{current.topSpeed}</div>
          <div className="text-[11px] text-slate-500 mt-0.5 font-medium">Top 5% in U-16 Division</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1 font-semibold">
            <span>Workload Ratio (ACWR)</span>
            <Gauge className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">{current.acwr}</div>
          <div className="text-[11px] text-emerald-800 mt-0.5 font-bold">{current.acwrStatus}</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1 font-semibold">
            <span>Heart Rate Average</span>
            <HeartPulse className="w-3.5 h-3.5 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-blue-950">{current.avgHeartRate}</div>
          <div className="text-[11px] text-rose-800 mt-0.5 font-bold">Max: {current.peakHeartRate}</div>
        </div>
      </div>

      {/* Heart Rate Zones Distribution Bar & Breakdown */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
          <span className="font-bold text-slate-900 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-blue-800" />
            <span>Cardiovascular Intensity & Aerobic Threshold Distribution</span>
          </span>
          <span className="font-mono text-slate-500 font-semibold">{current.label}</span>
        </div>

        {/* Multi-segment progress bar */}
        <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden flex shadow-inner">
          {current.zones.map((z, idx) => (
            <div
              key={idx}
              style={{ width: `${z.pct}%` }}
              className={`${z.color} transition-all duration-500`}
              title={`${z.label}: ${z.pct}%`}
            />
          ))}
        </div>

        {/* Zone Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
          {current.zones.map((z, idx) => (
            <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <span className={`w-2.5 h-2.5 rounded-full ${z.color} shrink-0`} />
              <div className="truncate">
                <div className="font-bold text-slate-900">{z.pct}%</div>
                <div className="text-slate-500 text-[10px] truncate">{z.label.split(' ')[0]} {z.label.split(' ')[1]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Velocity Surges */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2.5 text-xs font-black uppercase tracking-wider text-slate-500">
          <span>High-Intensity Sprint Bursts (&gt; 25 km/h)</span>
          <span>Optical Radar / GPS Sync</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {current.speedSurges.map((s, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between text-xs"
            >
              <div>
                <div className="font-bold text-slate-900">{s.context}</div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">Timestamp: {s.time}</div>
              </div>
              <span className="font-black text-blue-900 font-mono text-sm bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                {s.speed}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
