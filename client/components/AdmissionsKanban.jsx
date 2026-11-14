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
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
      {/* Header controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Admissions Review Pipeline</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-normal">
              {filteredApps.length} Candidates
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Manage applicant intake, evaluation dossiers, and athletic assessment scheduling.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search candidate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Sport Filter */}
          <select
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 overflow-x-auto">
        {stages.map((stage) => {
          const stageApps = filteredApps.filter(a => a.status.toLowerCase() === stage.toLowerCase());

          return (
            <div key={stage} className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 flex flex-col min-w-[200px]">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-300 tracking-wide">{stage}</span>
                <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 text-[11px] font-bold flex items-center justify-center">
                  {stageApps.length}
                </span>
              </div>

              <div className="space-y-2.5 flex-1">
                {stageApps.map((app) => (
                  <div
                    key={app.id}
                    className="p-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-lg transition-all text-xs"
                  >
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <span className="font-bold text-white text-[13px]">{app.studentName}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {app.sport}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 space-y-0.5 mb-2.5">
                      <div>Grade: {app.gradeApplying}</div>
                      <div className="truncate text-slate-300">Level: {app.currentRating || 'National Prep'}</div>
                      <div className="text-slate-400 text-[10px]">Parent: {app.parentName}</div>
                    </div>

                    {app.trialDate && (
                      <div className="mb-2 p-1.5 rounded bg-emerald-950/40 border border-emerald-800/40 text-[10px] text-emerald-300 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-400" />
                        <span>Trial: {new Date(app.trialDate).toLocaleDateString()}</span>
                      </div>
                    )}

                    {/* Stage actions */}
                    <div className="flex items-center gap-1 pt-2 border-t border-slate-800/80">
                      {stage === 'Submitted' && (
                        <button
                          onClick={() => handleStatusChange(app.id, 'Under Review')}
                          className="w-full py-1 text-center bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-medium text-[11px]"
                        >
                          Review Dossier
                        </button>
                      )}

                      {stage === 'Under Review' && (
                        <button
                          onClick={() => setActiveModalApp(app)}
                          className="w-full py-1 text-center bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium text-[11px] flex items-center justify-center gap-1"
                        >
                          <Calendar className="w-3 h-3" />
                          <span>Schedule Trial</span>
                        </button>
                      )}

                      {stage === 'Trial Scheduled' && (
                        <button
                          onClick={() => handleStatusChange(app.id, 'Offer Extended')}
                          className="w-full py-1 text-center bg-blue-600 hover:bg-blue-500 text-white rounded font-medium text-[11px] flex items-center justify-center gap-1"
                        >
                          <Award className="w-3 h-3" />
                          <span>Extend Offer</span>
                        </button>
                      )}

                      {stage === 'Offer Extended' && (
                        <button
                          onClick={() => handleStatusChange(app.id, 'Enrolled')}
                          className="w-full py-1 text-center bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium text-[11px] flex items-center justify-center gap-1"
                        >
                          <CheckCircle className="w-3 h-3" />
                          <span>Finalize Enrol</span>
                        </button>
                      )}

                      {stage === 'Enrolled' && (
                        <div className="w-full py-1 text-center text-emerald-400 font-semibold text-[11px] flex items-center justify-center gap-1">
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
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl">
            <h4 className="text-base font-bold mb-1">Schedule Athletic Trial</h4>
            <p className="text-xs text-slate-400 mb-4">
              Candidate: <strong className="text-white">{activeModalApp.studentName}</strong> ({activeModalApp.sport}, {activeModalApp.gradeApplying})
            </p>

            <form onSubmit={handleScheduleTrial} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Trial Date & Time</label>
                <input
                  type="datetime-local"
                  required
                  value={trialDateInput}
                  onChange={(e) => setTrialDateInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Assessment Venue / Court</label>
                <input
                  type="text"
                  required
                  value={trialLocationInput}
                  onChange={(e) => setTrialLocationInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModalApp(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
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
