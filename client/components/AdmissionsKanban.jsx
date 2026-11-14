'use client';

import { useState } from 'react';
import { Calendar, User, FileText, CheckCircle, Clock, Plus, Filter, Search, Award } from 'lucide-react';
import { updateApplicationStatus } from '../lib/api';

const stages = ['Submitted', 'Under Review', 'Trial Scheduled', 'Offer Extended', 'Enrolled'];

export default function AdmissionsKanban({ initialApplications = [] }) {
  const [applications, setApplications] = useState(initialApplications);
  const [selectedSport, setSelectedSport] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalApp, setActiveModalApp] = useState(null);
  const [trialDateInput, setTrialDateInput] = useState('');
  const [trialLocationInput, setTrialLocationInput] = useState('Main High-Performance Complex');
  const [isUpdating, setIsUpdating] = useState(false);

  const sports = ['all', 'Tennis', 'Football', 'Basketball', 'Athletics'];

  const filteredApps = applications.filter((app) => {
    const matchesSport = selectedSport === 'all' || app.sport.toLowerCase() === selectedSport.toLowerCase();
    const matchesSearch =
      app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.parentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSport && matchesSearch;
  });

  const handleStatusChange = async (appId, newStatus) => {
    setIsUpdating(true);
    await updateApplicationStatus(appId, { status: newStatus });
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: newStatus } : a));
    setIsUpdating(false);
  };

  const handleScheduleTrial = async (e) => {
    e.preventDefault();
    if (!activeModalApp || !trialDateInput) return;

    setIsUpdating(true);
    await updateApplicationStatus(activeModalApp.id, {
      status: 'Trial Scheduled',
      trialDate: trialDateInput,
      trialLocation: trialLocationInput,
      note: `Official athletic assessment trial scheduled for ${trialDateInput} at ${trialLocationInput}.`
    });

    setApplications(prev =>
      prev.map(a =>
        a.id === activeModalApp.id
          ? { ...a, status: 'Trial Scheduled', trialDate: trialDateInput, trialLocation: trialLocationInput }
          : a
      )
    );

    setIsUpdating(false);
    setActiveModalApp(null);
    setTrialDateInput('');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-sm">
      {/* Header controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-black text-blue-950 flex items-center gap-2">
            <span>Admissions Review Pipeline</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-950 font-bold border border-blue-200">
              {filteredApps.length} Candidates
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Manage applicant intake, evaluation dossiers, and athletic assessment scheduling.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search candidate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:border-blue-700"
            />
          </div>

          {/* Sport Filter */}
          <select
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-slate-900 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-700 font-medium"
          >
            {sports.map(s => (
              <option key={s} value={s}>
                {s === 'all' ? 'All Sports' : s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pipeline Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5 overflow-x-auto">
        {stages.map((stage) => {
          const stageApps = filteredApps.filter(a => a.status.toLowerCase() === stage.toLowerCase());

          return (
            <div key={stage} className="bg-slate-50 border border-slate-200/90 rounded-xl p-3 flex flex-col min-w-[210px]">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                <span className="text-xs font-black text-blue-950 tracking-wide">{stage}</span>
                <span className="w-5 h-5 rounded-full bg-white text-blue-950 border border-slate-200 text-[11px] font-bold flex items-center justify-center shadow-xs">
                  {stageApps.length}
                </span>
              </div>

              <div className="space-y-2.5 flex-1">
                {stageApps.map((app) => (
                  <div
                    key={app.id}
                    className="p-3.5 bg-white hover:border-blue-400 border border-slate-200 rounded-xl transition-all text-xs shadow-xs hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-1 mb-1.5">
                      <span className="font-bold text-slate-950 text-[13px]">{app.studentName}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200">
                        {app.sport}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-600 space-y-0.5 mb-2.5 font-medium">
                      <div>Grade: <span className="text-slate-900 font-semibold">{app.gradeApplying}</span></div>
                      <div className="truncate text-slate-700">Level: {app.currentRating || 'National Prep'}</div>
                      <div className="text-slate-500 text-[10px]">Parent: {app.parentName}</div>
                    </div>

                    {app.trialDate && (
                      <div className="mb-2.5 p-1.5 rounded-lg bg-blue-50 border border-blue-200 text-[10px] text-blue-900 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3 text-blue-700" />
                        <span>Trial: {new Date(app.trialDate).toLocaleDateString()}</span>
                      </div>
                    )}

                    {/* Stage actions */}
                    <div className="flex items-center gap-1 pt-2 border-t border-slate-100">
                      {stage === 'Submitted' && (
                        <button
                          onClick={() => handleStatusChange(app.id, 'Under Review')}
                          className="w-full py-1 text-center bg-slate-100 hover:bg-slate-200 text-blue-950 rounded-lg font-bold text-[11px]"
                        >
                          Review Dossier
                        </button>
                      )}

                      {stage === 'Under Review' && (
                        <button
                          onClick={() => setActiveModalApp(app)}
                          className="w-full py-1 text-center bg-blue-900 hover:bg-blue-950 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 shadow-xs"
                        >
                          <Calendar className="w-3 h-3" />
                          <span>Schedule Trial</span>
                        </button>
                      )}

                      {stage === 'Trial Scheduled' && (
                        <button
                          onClick={() => handleStatusChange(app.id, 'Offer Extended')}
                          className="w-full py-1 text-center bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 shadow-xs"
                        >
                          <Award className="w-3 h-3" />
                          <span>Extend Offer</span>
                        </button>
                      )}

                      {stage === 'Offer Extended' && (
                        <button
                          onClick={() => handleStatusChange(app.id, 'Enrolled')}
                          className="w-full py-1 text-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 shadow-xs"
                        >
                          <CheckCircle className="w-3 h-3" />
                          <span>Finalize Enrol</span>
                        </button>
                      )}

                      {stage === 'Enrolled' && (
                        <div className="w-full py-1 text-center text-emerald-700 font-bold text-[11px] flex items-center justify-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          <span>Active Student</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Schedule Trial Modal */}
      {activeModalApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 text-slate-900 shadow-2xl">
            <h4 className="text-base font-black text-blue-950 mb-1">Schedule Athletic Trial</h4>
            <p className="text-xs text-slate-500 mb-4">
              Candidate: <strong className="text-slate-900">{activeModalApp.studentName}</strong> ({activeModalApp.sport}, {activeModalApp.gradeApplying})
            </p>

            <form onSubmit={handleScheduleTrial} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Trial Date & Time</label>
                <input
                  type="datetime-local"
                  required
                  value={trialDateInput}
                  onChange={(e) => setTrialDateInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-blue-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Assessment Venue / Court</label>
                <input
                  type="text"
                  required
                  value={trialLocationInput}
                  onChange={(e) => setTrialLocationInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-blue-700 font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModalApp(null)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-950 text-white font-bold shadow-md"
                >
                  Confirm & Notify Parents
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
