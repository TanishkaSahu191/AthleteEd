'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Trophy,
  BookOpen,
  ShieldCheck,
  Activity,
  HeartPulse,
  CalendarCheck,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Users,
  Compass,
  Award,
  Zap,
  Clock,
  ChevronDown,
  Dumbbell,
  GraduationCap
} from 'lucide-react';

export default function HomePage() {
  const [activeHour, setActiveHour] = useState(0);

  const sports = [
    {
      title: 'Tennis Academy',
      level: 'ITF / UTR / ATP Pathway',
      desc: '12 clay & hard courts, PlaySight video biomechanics, and former tour coaching staff.',
      icon: '🎾',
      badge: 'Championship Track',
      stats: '48 Resident Athletes · 14 National Titles'
    },
    {
      title: 'Elite Football (Soccer)',
      level: 'UEFA Licensed Curriculum',
      desc: 'FIFA Quality Pro turf, positional intelligence, match play against international youth academies.',
      icon: '⚽',
      badge: 'Pro Scout Network',
      stats: '52 Resident Athletes · 6 Pro Signings'
    },
    {
      title: 'Basketball Prep',
      level: 'FIBA / NCAA Prep',
      desc: 'High-speed parquet courts, strength conditioning, tactical analytics, and shooting labs.',
      icon: '🏀',
      badge: 'NCAA Division I Prep',
      stats: '36 Athletes · 100% College Placed'
    },
    {
      title: 'Olympic Swimming',
      level: '50m Olympic Complex',
      desc: 'Biomechanical underwater stroke capture, physiological lactate profiling, and mental prep.',
      icon: '🏊',
      badge: 'National Qualifying',
      stats: '28 Athletes · 3 Olympic Trials'
    },
    {
      title: 'Track & Field Athletics',
      level: 'IAAF Certified Mondotrack',
      desc: 'Sprint mechanics, middle distance endurance, and injury-preventative loading protocols.',
      icon: '🏃',
      badge: 'Peak Velocity',
      stats: '24 Athletes · 8 State Records'
    },
    {
      title: 'Golf Performance',
      level: 'TrackMan & PGA Coaches',
      desc: '18-hole championship access, swing speed optimization, and course strategy training.',
      icon: '⛳',
      badge: 'Junior Tour',
      stats: '16 Athletes · AJGA Exemptions'
    }
  ];

  const athleteDaySchedule = [
    {
      time: '06:30 – 08:00 AM',
      phase: 'Phase 01',
      title: 'Morning Athletic Conditioning & Speed Work',
      detail: 'High-performance gym, reactive agility drills, and individualized aerobic VO2 max training before class.',
      category: 'Sports Training',
      icon: Dumbbell,
      color: 'emerald'
    },
    {
      time: '09:15 – 12:30 PM',
      phase: 'Phase 02',
      title: 'Accredited STEM & Advanced Academic Classes',
      detail: 'AP Physics (biomechanics in motion), Calculus, and World History in small cohorts tailored for athletes.',
      category: 'Academics',
      icon: BookOpen,
      color: 'blue'
    },
    {
      time: '12:30 – 02:00 PM',
      phase: 'Phase 03',
      title: 'Chef-Curated Sports Nutrition & Hyperbaric Recovery',
      detail: 'Macro-balanced hot lunches, cold plunge hydrotherapy, and mental visualization resetting.',
      category: 'Wellness & Boarding',
      icon: HeartPulse,
      color: 'amber'
    },
    {
      time: '03:30 – 06:30 PM',
      phase: 'Phase 04',
      title: 'Sport-Specific Tactical Mastery & Match Play',
      detail: 'Center court match simulations, video feedback reviews with head coaches, and live scoring pressure drills.',
      category: 'Sports Training',
      icon: Trophy,
      color: 'emerald'
    },
    {
      time: '08:00 – 09:30 PM',
      phase: 'Phase 05',
      title: 'Supervised Evening Study Hall & Peer Tutoring',
      detail: 'Dedicated faculty tutoring, homework grading, and college recruiting portfolio updates in Olympus Hall.',
      category: 'Academic Support',
      icon: GraduationCap,
      color: 'blue'
    }
  ];

  return (
    <div className="space-y-24 pb-24">
      {/* 1. HERO SECTION WITH SCROLL-DRIVEN PARALLAX FEEL */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-8 pb-16 bg-radial-gradient">
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,_rgba(16,185,129,0.14),transparent_60%)] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Admissions Open · 2026-2027 Academic Year</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
              Where Future <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Champions</span> Excel in Sport & Academics
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
              A hybrid residential institution where students receive world-class sport coaching alongside accredited, flexible academics. Explore our live scroll-driven operations ecosystem.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/admissions"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-xl shadow-emerald-500/25 text-sm hover:scale-105 active:scale-95 duration-200"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/portal"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700/80 transition-all text-sm shadow-xl backdrop-blur-sm hover:border-emerald-500/40"
              >
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Launch Interactive MVP Portal</span>
              </Link>
            </div>

            {/* Floating Live KPI Badges */}
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md hover:border-emerald-500/40 transition-all">
                <div className="text-3xl font-black text-white">98%</div>
                <div className="text-xs text-slate-400 font-medium mt-1">Collegiate Placement</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md hover:border-emerald-500/40 transition-all">
                <div className="text-3xl font-black text-emerald-400">1 : 8</div>
                <div className="text-xs text-slate-400 font-medium mt-1">Coach-to-Athlete Ratio</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md hover:border-emerald-500/40 transition-all">
                <div className="text-3xl font-black text-white">3.85</div>
                <div className="text-xs text-slate-400 font-medium mt-1">Average Student GPA</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md hover:border-emerald-500/40 transition-all">
                <div className="text-3xl font-black text-emerald-400">0</div>
                <div className="text-xs text-slate-400 font-medium mt-1">Schedule Conflicts</div>
              </div>
            </div>

            {/* Scroll Indicator Prompt */}
            <div className="pt-8 flex flex-col items-center justify-center text-slate-500 text-xs animate-bounce">
              <span>Scroll down to explore daily schedule & sport pathways</span>
              <ChevronDown className="w-4 h-4 mt-1" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. SCROLLYTELLING SECTION: A DAY IN THE LIFE (PRD GOAL 2 COEXISTENCE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Harmonized Daily Rhythm
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            A Day in the Life of a Student-Athlete
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            See how high-intensity training, rigorous academics, and restorative recovery coexist seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Schedule Timeline */}
          <div className="lg:col-span-8 space-y-4">
            {athleteDaySchedule.map((slot, index) => {
              const Icon = slot.icon;
              const isSelected = activeHour === index;

              return (
                <div
                  key={index}
                  onClick={() => setActiveHour(index)}
                  className={`scroll-card-reveal cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500 shadow-xl shadow-emerald-500/10 scale-[1.01]'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl border ${
                        slot.color === 'emerald'
                          ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                          : slot.color === 'blue'
                          ? 'bg-blue-500/15 border-blue-500/30 text-blue-400'
                          : 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          {slot.phase} · {slot.category}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white">{slot.title}</h3>
                      </div>
                    </div>

                    <div className="font-mono text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 self-start sm:self-auto">
                      {slot.time}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 pl-0 sm:pl-12 leading-relaxed">
                    {slot.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Live Schedule Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-emerald-500/30 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Active Routine Sync
                </span>
                <span className="text-[11px] text-slate-400">Olympus Campus</span>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-400">Selected Window:</span>
                <div className="text-lg font-bold text-white mt-0.5">{athleteDaySchedule[activeHour].time}</div>
                <div className="text-sm font-semibold text-emerald-400 mt-1">{athleteDaySchedule[activeHour].title}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Group:</span>
                  <span className="text-white font-semibold">Elite Squad & Grade 10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Conflict Engine:</span>
                  <span className="text-emerald-400 font-bold">100% Conflict-Free ✅</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Parent Portal:</span>
                  <span className="text-blue-400 font-medium">Real-Time Sync 📡</span>
                </div>
              </div>

              <Link
                href="/portal"
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
              >
                <span>View Full Timetable in Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SPORT DISCIPLINES WITH SCROLL REVEAL CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-slate-800 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Olympic & Pro Pathways
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Six Elite Sports Academies
            </h2>
          </div>
          <Link
            href="/programs"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
          >
            <span>Explore All Academic Programs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sports.map((s, idx) => (
            <div
              key={idx}
              className="scroll-card-reveal bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-3 rounded-2xl bg-slate-950 border border-slate-800 group-hover:scale-110 group-hover:border-emerald-500/40 transition-all duration-300">
                    {s.icon}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {s.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                  {s.title}
                </h3>
                <div className="text-xs font-semibold text-emerald-400/90 mb-2">{s.level}</div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{s.desc}</p>
                <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-3">
                  <strong>Track Record:</strong> {s.stats}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Residential Boarding</span>
                <Link
                  href="/admissions"
                  className="font-bold text-emerald-400 group-hover:text-emerald-300 inline-flex items-center gap-1.5"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BOARDING & RESIDENCE WITH SCROLL GLOW */}
      <section className="bg-slate-900/40 border-y border-slate-800 py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="scroll-slide-in-left space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                24/7 Residential Care & Safety
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Olympus Residence Hall: A Home Away From Home
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Parents enjoy total peace of mind. Our boarding ecosystem tracks biometric daily attendance, curfew check-ins, dietary allergy tracking, and automated outing sign-offs directly inside the Parent Portal.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-300">Biometric & digital hostel roll calls with real-time push alerts to parents.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-300">Digital Leave & Outing Request workflow with 1-click parent approval.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-300">Dedicated sports medicine clinic & physiotherapists on duty 24 hours.</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/portal"
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 underline"
                >
                  <span>Test Parent Leave Approval in Live Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Card: Live Parent Portal Simulation */}
            <div className="scroll-slide-in-right p-6 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  Parent Portal Live Feed
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Leo Jenkins · Active
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Daily Hostel Roll-Call</div>
                    <div className="text-[11px] text-slate-400">Olympus Hall 204-B · 08:30 PM Check-in</div>
                  </div>
                  <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded text-[10px]">
                    Present ✅
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Tournament Outing Gate Pass</div>
                    <div className="text-[11px] text-slate-400">ITF Orlando Invitational · Nov 27-29</div>
                  </div>
                  <span className="text-amber-400 font-bold bg-amber-500/10 px-2 py-1 rounded text-[10px]">
                    Signed by Parent
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">Physio Fitness Clearance</div>
                    <div className="text-[11px] text-slate-400">Ankle rehab complete · Full load authorized</div>
                  </div>
                  <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded text-[10px]">
                    Cleared
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="scroll-card-reveal bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/80 border border-emerald-500/30 rounded-3xl p-8 sm:p-14 shadow-2xl space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Ready to Begin Your Championship Journey?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Submit your student profile today. Our admissions and athletic coaching committee will review your video dossiers and invite qualified candidates for campus assessment trials.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/admissions"
              className="px-7 py-4 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all text-sm shadow-xl shadow-emerald-500/20 hover:scale-105"
            >
              Start Online Application
            </Link>
            <Link
              href="/portal"
              className="px-7 py-4 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all text-sm"
            >
              Test Live Portal (All Roles)
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
