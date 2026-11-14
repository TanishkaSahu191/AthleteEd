'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  User,
  Trophy,
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { submitApplication } from '../../lib/api';

export default function AdmissionsPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState(null);

  const [formData, setFormData] = useState({
    // Step 1: Student
    studentName: '',
    dob: '',
    gender: 'Male',
    gradeApplying: 'Grade 10',
    previousSchool: '',

    // Step 2: Sport
    sport: 'Tennis',
    primaryPosition: '',
    currentRating: '',
    videoLink: '',

    // Step 3: Guardian
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    boardingPreference: 'Full 7-Day Residential Boarding',

    // Step 4: Files (mock file list)
    uploadedFiles: ['Academic_Transcript_LastTwoYears.pdf', 'Medical_Fitness_Clearance.pdf']
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await submitApplication(formData);
      setSubmittedApp(res.application || {
        id: `app_${Date.now()}`,
        ...formData,
        status: 'Submitted',
        submittedAt: new Date().toISOString()
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-900">
      {/* Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-700" />
          <span>Official Admissions Portal 2026-2027</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-blue-950">Student-Athlete Application</h1>
        <p className="text-sm text-slate-600 mt-2 font-medium">
          Step-by-step admissions dossier for academic boarding and elite sports training.
        </p>
      </div>

      {/* If already submitted */}
      {submittedApp ? (
        <div className="bg-white border border-blue-200 rounded-2xl p-8 sm:p-10 shadow-lg text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-200 text-blue-900 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-blue-700" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider font-black text-blue-900">Application Received</span>
            <h2 className="text-2xl font-black text-slate-900">Congratulations, {submittedApp.studentName}!</h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-medium">
              Your application dossier has been securely recorded. The admissions committee and coaching staff have begun reviewing your profile.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2.5 font-medium">
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Reference ID:</span>
              <span className="font-mono font-bold text-blue-900">{submittedApp.id}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Sport & Grade:</span>
              <span className="font-bold text-slate-900">{submittedApp.sport} · {submittedApp.gradeApplying}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-500">Current Status:</span>
              <span className="font-bold text-blue-800">Submitted (Under Initial Review)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Contact Email:</span>
              <span className="text-slate-800">{submittedApp.parentEmail}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/portal"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs shadow-md shadow-blue-950/20"
            >
              Go to Admin & Parent Review Portal
            </Link>
            <button
              onClick={() => { setSubmittedApp(null); setStep(1); }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          {/* Progress step indicators */}
          <div className="grid grid-cols-4 gap-2 mb-8 pb-4 border-b border-slate-100 text-center text-xs">
            <div className={`p-2.5 rounded-xl ${step >= 1 ? 'bg-blue-900 text-white font-bold shadow-xs' : 'bg-slate-100 text-slate-400 font-medium'}`}>
              1. Student
            </div>
            <div className={`p-2.5 rounded-xl ${step >= 2 ? 'bg-blue-900 text-white font-bold shadow-xs' : 'bg-slate-100 text-slate-400 font-medium'}`}>
              2. Sport
            </div>
            <div className={`p-2.5 rounded-xl ${step >= 3 ? 'bg-blue-900 text-white font-bold shadow-xs' : 'bg-slate-100 text-slate-400 font-medium'}`}>
              3. Guardian
            </div>
            <div className={`p-2.5 rounded-xl ${step >= 4 ? 'bg-blue-900 text-white font-bold shadow-xs' : 'bg-slate-100 text-slate-400 font-medium'}`}>
              4. Review
            </div>
          </div>

          {/* Step 1: Student Information */}
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-4 text-xs">
              <h3 className="text-sm font-black text-blue-950 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-700" />
                <span>Student-Athlete Personal Profile</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Full Student Name *</label>
                  <input
                    type="text"
                    required
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    placeholder="e.g. Leo Jenkins"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-blue-700 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-blue-700 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Grade Level Applying For *</label>
                  <select
                    name="gradeApplying"
                    value={formData.gradeApplying}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-blue-700 font-medium"
                  >
                    <option value="Grade 8">Grade 8 (Middle Prep)</option>
                    <option value="Grade 9">Grade 9 (Freshman)</option>
                    <option value="Grade 10">Grade 10 (Sophomore)</option>
                    <option value="Grade 11">Grade 11 (Junior)</option>
                    <option value="Grade 12">Grade 12 (Senior & Post-Grad)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-blue-700 font-medium"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other / Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Previous / Current School</label>
                <input
                  type="text"
                  name="previousSchool"
                  value={formData.previousSchool}
                  onChange={handleChange}
                  placeholder="e.g. St. Jude International School"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-blue-700 font-medium"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-950 text-white font-bold inline-flex items-center gap-2 shadow-md shadow-blue-950/20"
                >
                  <span>Continue to Sport Profile</span>
                  <ArrowRight className="w-4 h-4 text-blue-200" />
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Athletic Profile */}
          {step === 2 && (
            <form onSubmit={handleNext} className="space-y-4 text-xs">
              <h3 className="text-sm font-black text-blue-950 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-blue-700" />
                <span>Athletic Training & Competition Profile</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Primary Sport Program *</label>
                  <select
                    name="sport"
                    value={formData.sport}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-blue-700 font-medium"
                  >
                    <option value="Tennis">Tennis Academy</option>
                    <option value="Football">Football (Soccer)</option>
                    <option value="Basketball">Basketball Prep</option>
                    <option value="Swimming">Olympic Swimming</option>
                    <option value="Athletics">Track & Field Athletics</option>
                    <option value="Golf">Golf Performance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Position / Specialty</label>
                  <input
                    type="text"
                    name="primaryPosition"
                    value={formData.primaryPosition}
                    onChange={handleChange}
                    placeholder="e.g. Singles Aggressive / Point Guard / 400m"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-blue-700 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Current Ranking / UTR / League Level</label>
                <input
                  type="text"
                  name="currentRating"
                  value={formData.currentRating}
                  onChange={handleChange}
                  placeholder="e.g. UTR 10.2, ITF Junior Rank #450, State Champion U-16"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-blue-700 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Match Video / Highlight Reel URL</label>
                <input
                  type="url"
                  name="videoLink"
                  value={formData.videoLink}
                  onChange={handleChange}
                  placeholder="https://youtube.com/... or Hudl link"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-blue-700 font-medium"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2.5 rounded-lg bg-slate-100 text-slate-800 font-bold inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-950 text-white font-bold inline-flex items-center gap-2 shadow-md shadow-blue-950/20"
                >
                  <span>Continue to Guardian Info</span>
                  <ArrowRight className="w-4 h-4 text-blue-200" />
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Guardian Details */}
          {step === 3 && (
            <form onSubmit={handleNext} className="space-y-4 text-xs">
              <h3 className="text-sm font-black text-blue-950 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-700" />
                <span>Parent / Legal Guardian Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Guardian Full Name *</label>
                  <input
                    type="text"
                    required
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-blue-700 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Guardian Email Address *</label>
                  <input
                    type="email"
                    required
                    name="parentEmail"
                    value={formData.parentEmail}
                    onChange={handleChange}
                    placeholder="parent@example.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-blue-700 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    name="parentPhone"
                    value={formData.parentPhone}
                    onChange={handleChange}
                    placeholder="+1 (555) 019-2831"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-blue-700 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Boarding Preference</label>
                  <select
                    name="boardingPreference"
                    value={formData.boardingPreference}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-slate-900 focus:outline-none focus:border-blue-700 font-medium"
                  >
                    <option value="Full 7-Day Residential Boarding">Full 7-Day Residential Boarding</option>
                    <option value="5-Day Boarding (Weekdays Only)">5-Day Boarding (Weekdays Only)</option>
                    <option value="Day Student (Commuter)">Day Student (Commuter)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2.5 rounded-lg bg-slate-100 text-slate-800 font-bold inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-950 text-white font-bold inline-flex items-center gap-2 shadow-md shadow-blue-950/20"
                >
                  <span>Review & Submit</span>
                  <ArrowRight className="w-4 h-4 text-blue-200" />
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Review & Upload */}
          {step === 4 && (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              <h3 className="text-sm font-black text-blue-950 flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-blue-700" />
                <span>Review & Document Verification</span>
              </h3>

              {/* Summary box */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="font-bold text-blue-950 border-b border-slate-200 pb-1">Application Summary</div>
                <div className="grid grid-cols-2 gap-2 text-slate-600 font-medium">
                  <div>Student: <strong className="text-slate-900">{formData.studentName || 'Not specified'}</strong></div>
                  <div>Sport: <strong className="text-blue-900">{formData.sport}</strong></div>
                  <div>Grade: <strong className="text-slate-900">{formData.gradeApplying}</strong></div>
                  <div>Guardian: <strong className="text-slate-900">{formData.parentName} ({formData.parentEmail})</strong></div>
                  <div>Boarding: <strong className="text-slate-900">{formData.boardingPreference}</strong></div>
                </div>
              </div>

              {/* Uploaded documents mock preview */}
              <div>
                <label className="block text-slate-700 font-bold mb-2">Attached Support Documents</label>
                <div className="space-y-2">
                  {formData.uploadedFiles.map((f, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-700" />
                        <span className="text-slate-800">{f}</span>
                      </div>
                      <span className="text-[10px] text-blue-950 bg-blue-100 border border-blue-200 px-2 py-0.5 rounded-full font-bold">
                        Ready
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-[11px] text-blue-950 font-medium flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <span>By submitting, you certify that all academic transcripts and athletic records are accurate. Our committee will notify you regarding trial scheduling.</span>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2.5 rounded-lg bg-slate-100 text-slate-800 font-bold inline-flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs inline-flex items-center gap-2 shadow-lg shadow-blue-950/20"
                >
                  {isSubmitting ? (
                    <span>Registering Application...</span>
                  ) : (
                    <>
                      <span>Submit Official Dossier</span>
                      <CheckCircle2 className="w-4 h-4 text-blue-200" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
