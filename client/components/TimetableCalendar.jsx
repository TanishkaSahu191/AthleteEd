'use client';

import { useState, useEffect } from 'react';
import {
  Clock,
  MapPin,
  User,
  CheckCircle2,
  Dumbbell,
  BookOpen,
  Utensils,
  AlertTriangle,
  Sparkles,
  RotateCcw,
  ShieldAlert,
  ArrowRight,
  Sliders,
  Check,
  LayoutGrid,
  ListOrdered
} from 'lucide-react';
import { simulateScheduleConflict, resolveScheduleConflict } from '../lib/api';

export default function TimetableCalendar({ entries = [], conflictsDetected = false }) {
  const [localEntries, setLocalEntries] = useState(entries);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('daily'); // 'daily' | 'weekly'

  // Conflict Simulation State
  const [simulationActive, setSimulationActive] = useState(false);
  const [simulationData, setSimulationData] = useState(null);
  const [appliedResolution, setAppliedResolution] = useState(null);
  const [resolvingLoading, setResolvingLoading] = useState(false);

  useEffect(() => {
    if (entries.length > 0 && localEntries.length === 0) {
      setLocalEntries(entries);
    }
  }, [entries]);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const filteredEntries = localEntries.filter((e) => {
    const matchesDay = e.day.toLowerCase() === selectedDay.toLowerCase();
    const matchesType = filterType === 'all' || e.type === filterType;
    return matchesDay && matchesType;
  });

  const getTypeStyle = (type, isConflict, isResolved) => {
    if (isConflict) {
      return {
        badge: 'bg-rose-100 text-rose-900 border-rose-300 font-bold',
        dot: 'bg-rose-600',
        icon: AlertTriangle,
        card: 'border-l-4 border-l-rose-600 bg-rose-50/60 border-rose-200 ring-2 ring-rose-400/30',
      };
    }
    if (isResolved) {
      return {
        badge: 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold',
        dot: 'bg-emerald-600',
        icon: Sparkles,
        card: 'border-l-4 border-l-emerald-600 bg-emerald-50/50 border-emerald-200 ring-2 ring-emerald-400/20',
      };
    }

    switch (type) {
      case 'training':
        return {
          badge: 'bg-blue-100 text-blue-900 border-blue-200 font-bold',
          dot: 'bg-blue-700',
          icon: Dumbbell,
          card: 'border-l-4 border-l-blue-800 bg-blue-50/40 hover:bg-blue-50/80 border-slate-200',
        };
      case 'academic':
        return {
          badge: 'bg-indigo-100 text-indigo-900 border-indigo-200 font-bold',
          dot: 'bg-indigo-700',
          icon: BookOpen,
          card: 'border-l-4 border-l-indigo-700 bg-indigo-50/30 hover:bg-indigo-50/70 border-slate-200',
        };
      case 'boarding':
      default:
        return {
          badge: 'bg-amber-100 text-amber-900 border-amber-200 font-bold',
          dot: 'bg-amber-600',
          icon: Utensils,
          card: 'border-l-4 border-l-amber-600 bg-amber-50/40 hover:bg-amber-50/80 border-slate-200',
        };
    }
  };

  // Trigger interactive conflict simulation
  const handleTriggerConflictSimulation = async () => {
    setSelectedDay('Monday');
    setResolvingLoading(true);
    setAppliedResolution(null);

    const proposed = {
      day: 'Monday',
      startTime: '10:00',
      endTime: '11:30',
      title: 'Tennis High-Intensity Tactical Drills',
      type: 'training',
      targetGroup: 'Grade 10'
    };

    const res = await simulateScheduleConflict(proposed);
    setSimulationData(res);
    setSimulationActive(true);
    setResolvingLoading(false);
  };

  // Apply AI Smart Resolution
  const handleApplyResolution = async (option) => {
    setResolvingLoading(true);
    const res = await resolveScheduleConflict(option);

    if (res && res.entry) {
      setLocalEntries((prev) => {
        // filter out any previous AI slot to avoid spam
        const filtered = prev.filter((e) => !e.isAiResolved);
        return [...filtered, res.entry].sort((a, b) => a.startTime.localeCompare(b.startTime));
      });
      setAppliedResolution(option);
      setSimulationActive(false);
    }
    setResolvingLoading(false);
  };

  // Reset to default schedule
  const handleResetSchedule = () => {
    setLocalEntries(entries);
    setSimulationActive(false);
    setSimulationData(null);
    setAppliedResolution(null);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm space-y-6">
      {/* Header & Conflict status indicator */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="text-lg font-black text-blue-950">Unified Academic & Sports Timetable</h3>
            {simulationActive ? (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-rose-100 text-rose-900 border border-rose-300 flex items-center gap-1.5 animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                1 Schedule Conflict Detected
              </span>
            ) : appliedResolution ? (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                AI Harmonized · 0 Conflicts
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-900 border border-blue-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-blue-700" />
                0 Conflicts Detected
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Strict PRD §4.3 Coexistence Engine: Academic core instruction protected from athletic timetable overlap.
          </p>
        </div>

        {/* Engine Interactive Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {!simulationActive && !appliedResolution && (
            <button
              onClick={handleTriggerConflictSimulation}
              disabled={resolvingLoading}
              className="px-3.5 py-2 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
              <span>Simulate Schedule Conflict (PRD §4.3)</span>
            </button>
          )}

          {(simulationActive || appliedResolution) && (
            <button
              onClick={handleResetSchedule}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Schedule</span>
            </button>
          )}

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('daily')}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'daily'
                  ? 'bg-white text-blue-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>Daily List</span>
            </button>
            <button
              onClick={() => setViewMode('weekly')}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'weekly'
                  ? 'bg-white text-blue-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>5-Day Matrix</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                filterType === 'all' ? 'bg-white text-blue-950 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('academic')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                filterType === 'academic' ? 'bg-indigo-700 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Academics
            </button>
            <button
              onClick={() => setFilterType('training')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                filterType === 'training' ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Training
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          SIMULATION CONFLICT & AI RESOLUTION PANEL
          ======================================================== */}
      {simulationActive && simulationData && (
        <div className="p-5 sm:p-6 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-4 shadow-sm animate-in fade-in duration-300">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-rose-600 text-white shadow-xs">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="text-sm font-black text-rose-950">
                  Timetable Clash Detected: Coach Request Denied by Academic Guard
                </h4>
                <span className="text-[11px] font-mono font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded border border-rose-300">
                  45 Min Overlap
                </span>
              </div>
              <p className="text-xs text-rose-800 mt-1 font-medium leading-relaxed">
                {simulationData.policyRule}
              </p>
            </div>
          </div>

          {/* Clash breakdown comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3.5 rounded-xl bg-white border border-rose-200 shadow-xs">
              <div className="text-[11px] font-bold text-rose-700 uppercase tracking-wider mb-1">
                Attempted Sports Booking (Blocked)
              </div>
              <div className="font-black text-slate-900 text-sm">
                {simulationData.proposedSlot.title}
              </div>
              <div className="text-slate-600 mt-1 flex items-center gap-1 font-mono font-bold">
                <Clock className="w-3.5 h-3.5 text-rose-600" />
                <span>Monday · {simulationData.proposedSlot.startTime} – {simulationData.proposedSlot.endTime}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-indigo-200 shadow-xs">
              <div className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider mb-1">
                Protected Academic Block
              </div>
              <div className="font-black text-slate-900 text-sm">
                {simulationData.conflictingSession.title}
              </div>
              <div className="text-slate-600 mt-1 flex items-center gap-1 font-mono font-bold">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>Monday · {simulationData.conflictingSession.startTime} – {simulationData.conflictingSession.endTime}</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {simulationData.conflictingSession.instructor} · {simulationData.conflictingSession.location}
              </div>
            </div>
          </div>

          {/* AI Resolution Recommendations */}
          <div className="pt-2 border-t border-rose-200/80">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-blue-800" />
              <span className="text-xs font-black uppercase tracking-wider text-blue-950">
                Automated AI Rescheduling Engine (Harmonized Alternatives)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {simulationData.aiRecommendations.map((opt) => (
                <div
                  key={opt.id}
                  className="p-4 rounded-xl bg-white border border-blue-200 shadow-xs flex flex-col justify-between gap-3 hover:border-blue-400 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-blue-950">{opt.label}</span>
                      <span className="text-[11px] font-mono font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {opt.startTime} – {opt.endTime}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-800 mt-1">{opt.title}</div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-normal font-medium">
                      {opt.rationale}
                    </p>
                  </div>

                  <button
                    onClick={() => handleApplyResolution(opt)}
                    disabled={resolvingLoading}
                    className="w-full py-2 rounded-lg bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
                  >
                    <span>Apply Resolution</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          RESOLUTION CONFIRMATION BANNER
          ======================================================== */}
      {appliedResolution && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-950 shadow-xs">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold">Schedule Harmonized: </span>
              <span>
                Added <strong>{appliedResolution.title}</strong> ({appliedResolution.startTime} – {appliedResolution.endTime}) without any academic overlap.
              </span>
            </div>
          </div>
          <button
            onClick={handleResetSchedule}
            className="text-emerald-800 underline font-bold self-start sm:self-auto hover:text-emerald-950"
          >
            Reset Timetable
          </button>
        </div>
      )}

      {/* ========================================================
          DAILY LIST VIEW MODE
          ======================================================== */}
      {viewMode === 'daily' && (
        <>
          {/* Day tabs */}
          <div className="flex space-x-2 border-b border-slate-100 pb-2 overflow-x-auto">
            {days.map((day) => {
              const isSelected = selectedDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-blue-950 text-white shadow-sm'
                      : 'text-slate-600 hover:text-blue-950 hover:bg-slate-100'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Timeline items */}
          <div className="space-y-3">
            {filteredEntries.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                No schedule blocks found for {selectedDay} under current filter.
              </div>
            ) : (
              filteredEntries.map((entry) => {
                const isClashing =
                  simulationActive &&
                  simulationData &&
                  entry.id === simulationData.conflictingSession.id;

                const isResolved = entry.isAiResolved;
                const style = getTypeStyle(entry.type, isClashing, isResolved);
                const Icon = style.icon;

                return (
                  <div
                    key={entry.id}
                    className={`p-4 rounded-xl border transition-all ${style.card} flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-blue-950 mt-0.5 shadow-xs">
                        <Icon className="w-4 h-4 text-blue-800" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-black text-slate-900">{entry.title}</span>
                          <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full border ${style.badge}`}>
                            {entry.type}
                          </span>
                          {isClashing && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-900 border border-rose-300">
                              Academic Priority Protected
                            </span>
                          )}
                          {isResolved && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                              AI Resolved
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-1.5 font-medium">
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-slate-400" />
                            {entry.instructor}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {entry.location}
                          </span>
                          {entry.category && (
                            <span className="text-slate-400">· {entry.category}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-950 bg-white px-3 py-1.5 rounded-lg border border-slate-200 self-start md:self-auto shadow-xs">
                      <Clock className="w-3.5 h-3.5 text-blue-700" />
                      <span>{entry.startTime} – {entry.endTime}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}

      {/* ========================================================
          WEEKLY 5-DAY MATRIX VIEW MODE
          ======================================================== */}
      {viewMode === 'weekly' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {days.map((day) => {
              const daySlots = localEntries
                .filter(
                  (e) =>
                    e.day.toLowerCase() === day.toLowerCase() &&
                    (filterType === 'all' || e.type === filterType)
                )
                .sort((a, b) => a.startTime.localeCompare(b.startTime));

              return (
                <div
                  key={day}
                  className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-3 flex flex-col space-y-2.5 shadow-2xs"
                >
                  {/* Day Column Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 px-1">
                    <div>
                      <div className="text-xs font-black text-blue-950 uppercase tracking-wide">
                        {day}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium">Full Schedule</div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-blue-900 bg-white px-2 py-0.5 rounded-full border border-slate-200 shadow-2xs">
                      {daySlots.length} Slots
                    </span>
                  </div>

                  {/* Day Slot Cards */}
                  <div className="space-y-2 flex-1">
                    {daySlots.length === 0 ? (
                      <div className="text-[11px] text-slate-400 text-center py-8">
                        No sessions matching filter
                      </div>
                    ) : (
                      daySlots.map((entry) => {
                        const isClashing =
                          simulationActive &&
                          simulationData &&
                          entry.id === simulationData.conflictingSession.id;
                        const isResolved = entry.isAiResolved;
                        const style = getTypeStyle(entry.type, isClashing, isResolved);
                        const Icon = style.icon;

                        return (
                          <div
                            key={entry.id}
                            className={`p-2.5 rounded-xl border text-xs space-y-1.5 transition-all shadow-2xs ${style.card}`}
                          >
                            <div className="flex items-center justify-between gap-1 flex-wrap">
                              <span className="font-mono text-[10px] font-bold text-blue-950 bg-white/95 px-1.5 py-0.5 rounded border border-slate-200 shadow-2xs flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5 text-blue-700" />
                                <span>{entry.startTime} – {entry.endTime}</span>
                              </span>
                              <span
                                className={`text-[9px] uppercase px-1.5 py-0.2 rounded-full font-bold border ${style.badge}`}
                              >
                                {entry.type}
                              </span>
                            </div>

                            <div className="font-black text-slate-900 text-xs leading-snug">
                              {entry.title}
                            </div>

                            <div className="text-[10px] text-slate-500 flex items-center gap-1 font-medium truncate">
                              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                              <span className="truncate">{entry.location}</span>
                            </div>

                            {isClashing && (
                              <div className="text-[9px] font-bold text-rose-900 bg-rose-100 px-1.5 py-0.5 rounded border border-rose-300">
                                Protected Academic Block
                              </div>
                            )}
                            {isResolved && (
                              <div className="text-[9px] font-bold text-emerald-900 bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-300">
                                AI Harmonized Slot
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
          THREE-PILLAR HARMONIZED LEGEND
          ======================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100 text-xs text-slate-600 font-medium">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-700" />
            <span className="text-slate-800 font-bold">Elite Athletic Training</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-700" />
            <span className="text-slate-800 font-bold">Accredited Academic Core (AP/STEM)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
            <span className="text-slate-800 font-bold">Boarding, Chef Nutrition & Recovery</span>
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-400 font-medium">
          PRD §4.3 Non-Conflicting Academic Guarantee
        </span>
      </div>
    </div>
  );
}
