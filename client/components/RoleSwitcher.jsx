'use client';

import { Shield, Users, GraduationCap, Award, BookOpen } from 'lucide-react';

const roles = [
  { id: 'admin', label: 'Admin / Director', icon: Shield, description: 'Admissions Pipeline, KPI metrics & staff' },
  { id: 'parent', label: 'Parent Portal', icon: Users, description: 'Child 360°, fee statements & leave approval' },
  { id: 'student', label: 'Student-Athlete', icon: GraduationCap, description: 'Unified conflict-free schedule & attendance' },
  { id: 'coach', label: 'Coach Portal', icon: Award, description: 'Squad evaluations & training readiness' },
  { id: 'teacher', label: 'Academic Faculty', icon: BookOpen, description: 'Flexible assignments & gradebook' },
];

export default function RoleSwitcher({ activeRole, onSelectRole }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 mb-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-blue-700 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-wider text-blue-950">
            Interactive MVP Role Simulator (PRD RBAC)
          </span>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          Switch role below to test individual persona permissions and dashboards:
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {roles.map((r) => {
          const Icon = r.icon;
          const isSelected = activeRole === r.id;

          return (
            <button
              key={r.id}
              onClick={() => onSelectRole(r.id)}
              className={`flex flex-col text-left p-3.5 rounded-xl transition-all border ${
                isSelected
                  ? 'bg-blue-900 border-blue-900 text-white shadow-md shadow-blue-950/20'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-blue-950 hover:bg-blue-50/50 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-200' : 'text-blue-700'}`} />
                <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
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
