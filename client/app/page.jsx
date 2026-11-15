'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Trophy,
  BookOpen,
  HeartPulse,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
  ChevronDown,
  Dumbbell,
  GraduationCap,
  Activity,
  ShieldCheck,
  Target,
  Compass,
  TrendingUp,
  Clock,
  Radio,
  Building,
  Users
} from 'lucide-react';

export default function HomePage() {
  const [activeHour, setActiveHour] = useState(0);

  const sports = [
    {
      title: 'Tennis Academy',
      level: 'ITF / UTR / ATP Pathway',
      desc: '12 clay & hard courts, PlaySight video biomechanics, and former ATP/WTA coaching staff.',
      icon: Activity,
      badge: 'Championship Track',
      stats: '48 Resident Athletes · 14 National Titles',
      image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&auto=format&fit=crop&q=80'
    },
    {
      title: 'Elite Football (Soccer)',
      level: 'UEFA Licensed Curriculum',
      desc: 'FIFA Quality Pro turf, positional intelligence, match play against international youth academies.',
      icon: ShieldCheck,
      badge: 'Pro Scout Network',
      stats: '52 Resident Athletes · 6 Pro Signings',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80'
    },
    {
      title: 'Basketball Prep',
      level: 'FIBA / NCAA Prep',
      desc: 'High-speed parquet courts, strength conditioning, tactical analytics, and shooting labs.',
      icon: Zap,
      badge: 'NCAA Division I Prep',
      stats: '36 Athletes · 100% College Placed',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=80'
    },
    {
      title: 'Olympic Swimming',
      level: '50m Olympic Complex',
      desc: 'Biomechanical underwater stroke capture, physiological lactate profiling, and mental prep.',
      icon: Compass,
      badge: 'National Qualifying',
      stats: '28 Athletes · 3 Olympic Trials',
      image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&auto=format&fit=crop&q=80'
    },
    {
      title: 'Track & Field Athletics',
      level: 'IAAF Certified Mondotrack',
      desc: 'Sprint mechanics, middle distance endurance, and injury-preventative loading protocols.',
      icon: TrendingUp,
      badge: 'Peak Velocity',
      stats: '24 Athletes · 8 State Records',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=80'
    },
    {
      title: 'Golf Performance',
      level: 'TrackMan & PGA Coaches',
      desc: '18-hole championship access, swing speed optimization, and course strategy training.',
      icon: Target,
      badge: 'Junior Tour',
      stats: '16 Athletes · AJGA Exemptions',
      image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&auto=format&fit=crop&q=80'
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
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-200'
    },
    {
      time: '09:15 – 12:30 PM',
      phase: 'Phase 02',
      title: 'Accredited STEM & Advanced Academic Classes',
      detail: 'AP Physics (biomechanics in motion), Calculus, and World History in small cohorts tailored for athletes.',
      category: 'Academics',
      icon: BookOpen,
      badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-200'
    },
    {
      time: '12:30 – 02:00 PM',
      phase: 'Phase 03',
      title: 'Chef-Curated Sports Nutrition & Hyperbaric Recovery',
      detail: 'Macro-balanced hot lunches, cold plunge hydrotherapy, and mental visualization resetting.',
      category: 'Wellness & Boarding',
      icon: HeartPulse,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200'
    },
    {
      time: '03:30 – 06:30 PM',
      phase: 'Phase 04',
      title: 'Sport-Specific Tactical Mastery & Match Play',
      detail: 'Center court match simulations, video feedback reviews with head coaches, and live scoring pressure drills.',
      category: 'Sports Training',
      icon: Trophy,
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-200'
    },
    {
      time: '08:00 – 09:30 PM',
      phase: 'Phase 05',
      title: 'Supervised Evening Study Hall & Peer Tutoring',
      detail: 'Dedicated faculty tutoring, homework grading, and college recruiting portfolio updates in Olympus Hall.',
      category: 'Academic Support',
      icon: GraduationCap,
      badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-200'
    }
  ];

  return (
    <div className="space-y-24 pb-24 text-slate-900">
      {/* 1. HERO SECTION WITH SCROLL-DRIVEN PARALLAX (LIGHT WHITE & NAVY BLUE) */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-8 pb-16 bg-gradient-to-b from-white/70 via-blue-50/10 to-transparent">
        {/* Soft navy radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,_rgba(30,58,138,0.04),transparent_65%)] pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-blue-200 text-blue-900 text-xs font-bold tracking-wide shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-700" />
              <span>Admissions Open · 2026-2027 Academic Year</span>
            </div>

            {/* Main Heading in Deep Navy Blue */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-blue-950 tracking-tight leading-[1.08] drop-shadow-xs">
              Where Future <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-700 bg-clip-text text-transparent">Champions</span> Excel in Sport & Academics
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium max-w-2xl mx-auto">
              A hybrid residential institution where students receive world-class coaching alongside accredited, flexible academics. Explore our live scroll-driven operations ecosystem.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/admissions"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold bg-blue-900 hover:bg-blue-950 text-white transition-all shadow-xl shadow-blue-950/20 text-sm hover:scale-105 active:scale-95 duration-200"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-4 h-4 text-blue-200" />
              </Link>

              <Link
                href="/portal"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold bg-white/90 hover:bg-white text-blue-950 border border-slate-300 transition-all text-sm shadow-sm hover:border-blue-500/50 backdrop-blur-sm"
              >
                <Zap className="w-4 h-4 text-blue-700" />
                <span>Launch Interactive MVP Portal</span>
              </Link>
            </div>

            {/* KPI Badges with Dark Mode Hover */}
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/90 shadow-sm hover:shadow-2xl hover:shadow-blue-950/40 hover:bg-[#071330] hover:border-blue-500/80 hover:-translate-y-1 transition-all duration-300 group">
                <div className="text-3xl font-black text-blue-950 group-hover:text-white transition-colors duration-300">98%</div>
                <div className="text-xs text-slate-500 group-hover:text-slate-300 font-semibold mt-1 transition-colors duration-300">Collegiate Placement</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/90 shadow-sm hover:shadow-2xl hover:shadow-blue-950/40 hover:bg-[#071330] hover:border-blue-500/80 hover:-translate-y-1 transition-all duration-300 group">
                <div className="text-3xl font-black text-blue-700 group-hover:text-blue-400 transition-colors duration-300">1 : 8</div>
                <div className="text-xs text-slate-500 group-hover:text-slate-300 font-semibold mt-1 transition-colors duration-300">Coach-to-Athlete Ratio</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/90 shadow-sm hover:shadow-2xl hover:shadow-blue-950/40 hover:bg-[#071330] hover:border-blue-500/80 hover:-translate-y-1 transition-all duration-300 group">
                <div className="text-3xl font-black text-blue-950 group-hover:text-white transition-colors duration-300">3.85</div>
                <div className="text-xs text-slate-500 group-hover:text-slate-300 font-semibold mt-1 transition-colors duration-300">Average Student GPA</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/90 shadow-sm hover:shadow-2xl hover:shadow-blue-950/40 hover:bg-[#071330] hover:border-blue-500/80 hover:-translate-y-1 transition-all duration-300 group">
                <div className="text-3xl font-black text-blue-700 group-hover:text-emerald-400 transition-colors duration-300">0</div>
                <div className="text-xs text-slate-500 group-hover:text-slate-300 font-semibold mt-1 transition-colors duration-300">Schedule Conflicts</div>
              </div>
            </div>

            {/* Scroll Indicator Prompt */}
            <div className="pt-8 flex flex-col items-center justify-center text-slate-400 text-xs animate-bounce font-medium">
              <span>Scroll down to explore daily schedule & sport pathways</span>
              <ChevronDown className="w-4 h-4 mt-1 text-blue-700" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. SCROLLYTELLING SECTION: A DAY IN THE LIFE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-blue-800">
            Harmonized Daily Rhythm
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950 mt-2">
            A Day in the Life of a Student-Athlete
          </h2>
          <p className="text-sm text-slate-600 mt-2 font-medium">
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
                      ? 'bg-white border-2 border-blue-900 shadow-lg shadow-blue-950/10 scale-[1.01]'
                      : 'bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900">
                        <Icon className="w-5 h-5 text-blue-800" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          {slot.phase} · {slot.category}
                        </span>
                        <h3 className="text-base sm:text-lg font-black text-slate-900">{slot.title}</h3>
                      </div>
                    </div>

                    <div className="font-mono text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-950 self-start sm:self-auto">
                      {slot.time}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 pl-0 sm:pl-12 leading-relaxed font-medium">
                    {slot.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Live Schedule Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs uppercase font-black tracking-wider text-blue-950 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-700 animate-ping" />
                  Active Routine Sync
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">Olympus Campus</span>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-500 font-semibold">Selected Window:</span>
                <div className="text-lg font-black text-blue-950 mt-0.5">{athleteDaySchedule[activeHour].time}</div>
                <div className="text-sm font-bold text-blue-700 mt-1">{athleteDaySchedule[activeHour].title}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs font-medium">
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Group:</span>
                  <span className="text-slate-900 font-bold">Elite Squad & Grade 10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Conflict Engine:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% Conflict-Free</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Parent Portal:</span>
                  <span className="text-blue-700 font-bold flex items-center gap-1">
                    <Radio className="w-3.5 h-3.5 text-blue-600" />
                    <span>Real-Time Sync</span>
                  </span>
                </div>
              </div>

              <Link
                href="/portal"
                className="w-full py-3.5 rounded-xl bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-950/20"
              >
                <span>View Full Timetable in Portal</span>
                <ArrowRight className="w-4 h-4 text-blue-200" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SPORT DISCIPLINES WITH REFERENCE PHOTOGRAPHY & SCROLL REVEAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-slate-200 gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-blue-800">
              Olympic & Pro Pathways
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-blue-950 mt-1">
              Six Elite Sports Academies
            </h2>
          </div>
          <Link
            href="/programs"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 hover:text-blue-950"
          >
            <span>Explore All Academic Programs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sports.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="scroll-card-reveal bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1.5 shadow-sm hover:shadow-2xl hover:shadow-blue-950/40 hover:bg-[#071330] hover:border-blue-500/80"
              >
                <div>
                  {/* Reference Image with Zoom Hover */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-blue-950 shadow-sm group-hover:bg-blue-900/90 group-hover:text-blue-100 group-hover:border group-hover:border-blue-500 transition-colors duration-300">
                      {s.badge}
                    </span>
                    <div className="absolute bottom-3 left-3 p-2 rounded-xl bg-white/95 backdrop-blur-md text-blue-900 shadow-md group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5 text-blue-800 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-black text-blue-950 mb-1 group-hover:text-white transition-colors duration-300">
                      {s.title}
                    </h3>
                    <div className="text-xs font-bold text-blue-700 mb-2 group-hover:text-blue-400 transition-colors duration-300">
                      {s.level}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4 font-medium group-hover:text-slate-300 transition-colors duration-300">
                      {s.desc}
                    </p>
                    <div className="text-[11px] text-slate-500 border-t border-slate-100 group-hover:border-slate-800/80 pt-3 font-semibold group-hover:text-slate-400 transition-colors duration-300">
                      Track Record: <span className="text-slate-800 font-bold group-hover:text-white transition-colors duration-300">{s.stats}</span>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs">
                  <span className="text-slate-500 group-hover:text-slate-400 transition-colors duration-300 font-medium">
                    Residential Boarding
                  </span>
                  <Link
                    href="/admissions"
                    className="font-bold text-blue-900 group-hover:text-blue-400 inline-flex items-center gap-1.5 group-hover:translate-x-1.5 transition-all"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. BOARDING & RESIDENCE WITH REFERENCE PHOTOGRAPHY */}
      <section id="boarding" className="bg-blue-50/40 border-y border-slate-200 py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="scroll-slide-in-left space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-blue-800">
                24/7 Residential Care & Safety
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-blue-950 leading-tight">
                Olympus Residence Hall: A Home Away From Home
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                Parents enjoy total peace of mind. Our boarding ecosystem tracks biometric daily attendance, curfew check-ins, dietary allergy tracking, and automated outing sign-offs directly inside the Parent Portal.
              </p>

              {/* Reference Campus Image Thumbnail Card */}
              <div className="relative h-48 w-full rounded-2xl overflow-hidden shadow-md border border-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80"
                  alt="Olympus Campus Grounds"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-blue-300" />
                    <span>Olympus Academic & Residential Campus</span>
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">Biometric & digital hostel roll calls with real-time push alerts to parents.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">Digital Leave & Outing Request workflow with 1-click parent approval.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">Dedicated sports medicine clinic & physiotherapists on duty 24 hours.</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/portal"
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-800 hover:text-blue-950 underline"
                >
                  <span>Test Parent Leave Approval in Live Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Card: Live Parent Portal Simulation */}
            <div className="scroll-slide-in-right p-6 rounded-2xl bg-white border border-slate-200 shadow-xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
                  Parent Portal Live Feed
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-950 border border-blue-200">
                  Leo Jenkins · Active
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900">Daily Hostel Roll-Call</div>
                    <div className="text-[11px] text-slate-500">Olympus Hall 204-B · 08:30 PM Check-in</div>
                  </div>
                  <span className="text-blue-900 font-bold bg-blue-100 px-2.5 py-1 rounded text-[10px] border border-blue-200 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-blue-700" />
                    <span>Present</span>
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900">Tournament Outing Gate Pass</div>
                    <div className="text-[11px] text-slate-500">ITF Orlando Invitational · Nov 27-29</div>
                  </div>
                  <span className="text-amber-900 font-bold bg-amber-100 px-2.5 py-1 rounded text-[10px] border border-amber-200">
                    Signed by Parent
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900">Physio Fitness Clearance</div>
                    <div className="text-[11px] text-slate-500">Ankle rehab complete · Full load authorized</div>
                  </div>
                  <span className="text-emerald-900 font-bold bg-emerald-100 px-2.5 py-1 rounded text-[10px] border border-emerald-200 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-700" />
                    <span>Cleared</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="scroll-card-reveal bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 border border-blue-900 rounded-3xl p-8 sm:p-14 shadow-2xl space-y-6 text-white">
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Ready to Begin Your Championship Journey?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto font-medium">
            Submit your student profile today. Our admissions and athletic coaching committee will review your video dossiers and invite qualified candidates for campus assessment trials.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/admissions"
              className="px-7 py-4 rounded-xl font-bold bg-white hover:bg-slate-100 text-blue-950 transition-all text-sm shadow-xl shadow-black/20 hover:scale-105"
            >
              Start Online Application
            </Link>
            <Link
              href="/portal"
              className="px-7 py-4 rounded-xl font-bold bg-blue-900/60 hover:bg-blue-800 text-white border border-blue-400/40 transition-all text-sm"
            >
              Test Live Portal (All Roles)
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
