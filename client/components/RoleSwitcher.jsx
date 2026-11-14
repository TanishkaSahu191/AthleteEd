'use client';

import { Shield, Users, GraduationCap, Award, BookOpen, Hotel, Stethoscope } from 'lucide-react';

const roles = [
  { id: 'admin', label: 'Admin / Director', icon: Shield, description: 'Admissions Pipeline, KPI metrics & staff' },
  { id: 'parent', label: 'Parent Portal', icon: Users, description: 'Child 360°, fee statements & leave approval' },
  { id: 'student', label: 'Student-Athlete', icon: GraduationCap, description: 'Unified conflict-free schedule & attendance' },
  { id: 'coach', label: 'Coach Portal', icon: Award, description: 'Squad evaluations & training readiness' },
  { id: 'teacher', label: 'Academic Faculty', icon: BookOpen, description: 'Flexible assignments & gradebook' },
];

export default function RoleSwitcher({ activeRole, onSelectRole }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 sm:p-4 mb-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Interactive MVP Role Simulator (PRD RBAC)
          </span>
        </div>
        <span className="text-xs text-slate-400">
          Switch role below to test individual persona permissions and dashboards:
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {roles.map((r) => {
          const Icon = r.icon;
          const isSelected = activeRole === r.id;

          return (
            <button
              key={r.id}
              onClick={() => onSelectRole(r.id)}
              className={`flex flex-col text-left p-3 rounded-xl transition-all border ${
                isSelected
                  ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-md shadow-emerald-500/10'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {r.label}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 line-clamp-1">{r.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
