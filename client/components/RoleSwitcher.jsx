'use client';

import { Shield, Users, GraduationCap, Award, BookOpen, Activity } from 'lucide-react';

const roles = [
  { id: 'admin', label: 'Admin / Director', icon: Shield, description: 'Admissions Pipeline & KPIs' },
  { id: 'medical', label: 'Sports Medicine / Physio', icon: Activity, description: 'Dr. Maya Lin injury & clearance hub' },
  { id: 'coach', label: 'Coach Portal', icon: Award, description: 'Squad rosters & medical alerts' },
  { id: 'parent', label: 'Parent Portal', icon: Users, description: 'Child 360°, fees & health alerts' },
  { id: 'student', label: 'Student-Athlete', icon: GraduationCap, description: 'Unified conflict-free schedule' },
  { id: 'teacher', label: 'Academic Faculty', icon: BookOpen, description: 'Assignments & gradebook' },
];

export default function RoleSwitcher({ activeRole, onSelectRole, hasMedicalAlert = false }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 mb-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-blue-700 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-wider text-blue-950">
            Interactive MVP Role Simulator (PRD RBAC Matrix)
          </span>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          Switch role below to test individual persona permissions, conflict engines, and alert chains:
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {roles.map((r) => {
          const Icon = r.icon;
          const isSelected = activeRole === r.id;
          const showRoleAlert = hasMedicalAlert && (r.id === 'coach' || r.id === 'parent');

          return (
            <button
              key={r.id}
              onClick={() => onSelectRole(r.id)}
              className={`relative flex flex-col text-left p-3.5 rounded-xl transition-all border ${
                isSelected
                  ? 'bg-blue-900 border-blue-900 text-white shadow-md shadow-blue-950/20'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-blue-950 hover:bg-blue-50/50 hover:border-blue-300'
              }`}
            >
              {showRoleAlert && (
                <span className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
              )}

              <div className="flex items-center gap-2 mb-1.5">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-200' : 'text-blue-700'}`} />
                <span className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {r.label}
                </span>
              </div>
              <span className={`text-[11px] line-clamp-1 ${isSelected ? 'text-blue-200' : 'text-slate-500'}`}>
                {r.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
