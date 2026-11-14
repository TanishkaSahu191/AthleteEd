'use client';

import { useState } from 'react';
import { Clock, MapPin, User, CheckCircle2, Dumbbell, BookOpen, Utensils } from 'lucide-react';

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

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm">
      {/* Header & Conflict status indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-black text-blue-950">Unified Academic & Sports Timetable</h3>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-900 border border-blue-200 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-blue-700" />
              0 Conflicts Detected
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Harmonizes academic periods with intensive athletic training & recovery windows.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
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

      {/* Day tabs */}
      <div className="flex space-x-2 border-b border-slate-100 mb-6 pb-2 overflow-x-auto">
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
            const style = getTypeStyle(entry.type);
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
    </div>
  );
}
