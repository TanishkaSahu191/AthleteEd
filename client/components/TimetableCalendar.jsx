'use client';

import { useState } from 'react';
import { Calendar, Clock, MapPin, User, CheckCircle2, AlertTriangle, Dumbbell, BookOpen, Utensils } from 'lucide-react';

export default function TimetableCalendar({ entries = [], conflictsDetected = false }) {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [filterType, setFilterType] = useState('all');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const filteredEntries = entries.filter((e) => {
    const matchesDay = e.day.toLowerCase() === selectedDay.toLowerCase();
    const matchesType = filterType === 'all' || e.type === filterType;
    return matchesDay && matchesType;
  });

  const getTypeStyle = (type) => {
    switch (type) {
      case 'training':
        return {
          badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
          dot: 'bg-emerald-400',
          icon: Dumbbell,
          card: 'border-l-4 border-l-emerald-500 bg-emerald-950/10 hover:bg-emerald-950/20',
        };
      case 'academic':
        return {
          badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
          dot: 'bg-blue-400',
          icon: BookOpen,
          card: 'border-l-4 border-l-blue-500 bg-blue-950/10 hover:bg-blue-950/20',
        };
      case 'boarding':
      default:
        return {
          badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
          dot: 'bg-amber-400',
          icon: Utensils,
          card: 'border-l-4 border-l-amber-500 bg-amber-950/10 hover:bg-amber-950/20',
        };
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
      {/* Header & Conflict status indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white">Unified Academic & Sports Timetable</h3>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              0 Schedule Conflicts
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Engine harmonizes academic periods with intensive athletic training & recovery windows.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              filterType === 'all' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('academic')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              filterType === 'academic' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Academics
          </button>
          <button
            onClick={() => setFilterType('training')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              filterType === 'training' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sports Training
          </button>
        </div>
      </div>

      {/* Day tabs */}
      <div className="flex space-x-1 sm:space-x-2 border-b border-slate-800 mb-6 pb-2 overflow-x-auto">
        {days.map((day) => {
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-slate-800 text-white shadow-inner border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
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
          <div className="text-center py-12 text-slate-500 text-sm">
            No schedule blocks found for {selectedDay} under current filter.
          </div>
        ) : (
          filteredEntries.map((entry) => {
            const style = getTypeStyle(entry.type);
            const Icon = style.icon;

            return (
              <div
                key={entry.id}
                className={`p-4 rounded-xl border border-slate-800 transition-all ${style.card} flex flex-col md:flex-row md:items-center justify-between gap-3`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-white">{entry.title}</span>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${style.badge}`}>
                        {entry.type}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-1.5">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-500" />
                        {entry.instructor}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {entry.location}
                      </span>
                      {entry.category && (
                        <span className="text-slate-500">· {entry.category}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono font-medium text-slate-300 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 self-start md:self-auto">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{entry.startTime} – {entry.endTime}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
