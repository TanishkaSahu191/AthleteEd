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
  Zap
} from 'lucide-react';

export default function HomePage() {
  const sports = [
    {
      title: 'Tennis Academy',
      level: 'ITF / UTR / ATP Pathway',
      desc: '12 clay & hard courts, Dartfish video biomechanics, and ex-tour coaching staff.',
      icon: '🎾',
      badge: 'Championship Track'
    },
    {
      title: 'Elite Football (Soccer)',
      level: 'UEFA Licensed Curriculum',
      desc: 'FIFA Quality Pro turf, positional intelligence, match play against international academies.',
      icon: '⚽',
      badge: 'Pro Scout Network'
    },
    {
      title: 'Basketball Prep',
      level: 'FIBA / NCAA Prep',
      desc: 'High-speed parquet courts, strength conditioning, tactical analytics, and shooting labs.',
      icon: '🏀',
      badge: 'NCAA Division I Prep'
    },
    {
      title: 'Olympic Swimming',
      level: '50m Olympic Complex',
      desc: 'Biomechanical underwater stroke capture, physiological lactate profiling, and mental prep.',
      icon: '🏊',
      badge: 'National Qualifying'
    },
    {
      title: 'Track & Field Athletics',
      level: 'IAAF Certified Mondotrack',
      desc: 'Sprint mechanics, middle distance endurance, and injury-preventative loading protocols.',
      icon: '🏃',
      badge: 'Peak Velocity'
    },
    {
      title: 'Golf Performance',
      level: 'TrackMan & PGA Coaches',
      desc: '18-hole championship access, swing speed optimization, and course strategy training.',
      icon: '⛳',
      badge: 'Junior Tour'
    }
  ];

  const differentiators = [
    {
      title: 'Harmonized Daily Schedule',
      desc: 'Zero academic vs. athletic scheduling conflicts. Class timings flex seamlessly around morning conditioning and tournament travel.',
      icon: CalendarCheck
    },
    {
      title: 'Accredited Rigorous Academics',
      desc: 'Dual-enrollment, AP courses, and STEM tracks ensuring athletes graduate ready for top Ivy League & NCAA collegiate programs.',
      icon: BookOpen
    },
    {
      title: 'Parent 360° Real-Time Portal',
      desc: 'Live insight into academic grades, athletic VO2 max tests, daily hostel roll-calls, and direct leave approval workflows.',
      icon: Users
    },
    {
      title: 'Elite Sports Medicine & Physio',
      desc: 'On-site licensed physiotherapists, injury rehab tracking, and automated coach fitness clearance integration.',
      icon: HeartPulse
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Admissions Open for 2026-2027 Academic Year</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Where Future <span className="text-emerald-400 underline decoration-emerald-500/40 decoration-wavy">Champions</span> Excel in Sport & Academics
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              A hybrid residential institution offering world-class sport-specific training alongside accredited, flexible academics. The all-in-one platform powering student-athletes, parents, coaches, and faculty.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/admissions"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/20 text-sm"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/portal"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all text-sm shadow-md"
              >
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Explore Live MVP Portal</span>
              </Link>
            </div>

            {/* Quick stats strip */}
            <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center border-t border-slate-800/80">
              <div className="p-3">
                <div className="text-2xl font-black text-white">98%</div>
                <div className="text-xs text-slate-400 font-medium">College Scholarship Rate</div>
              </div>
              <div className="p-3">
                <div className="text-2xl font-black text-emerald-400">1 : 8</div>
                <div className="text-xs text-slate-400 font-medium">Coach-to-Athlete Ratio</div>
              </div>
              <div className="p-3">
                <div className="text-2xl font-black text-white">3.78</div>
                <div className="text-xs text-slate-400 font-medium">Average Student GPA</div>
              </div>
              <div className="p-3">
                <div className="text-2xl font-black text-emerald-400">100%</div>
                <div className="text-xs text-slate-400 font-medium">Accredited Curricula</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">The AthleteEd Advantage</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            Built from the Ground Up for Student-Athletes
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            No more choosing between rigorous schooling and elite athletic development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((d, idx) => {
            const Icon = d.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{d.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{d.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sport Programs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-slate-800 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">World-Class Athletic Disciplines</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              High-Performance Sport Pathways
            </h2>
          </div>
          <Link
            href="/programs"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
          >
            <span>View Detailed Curricula</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sports.map((s, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-6 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-2 rounded-xl bg-slate-950 border border-slate-800 group-hover:scale-110 transition-transform">
                    {s.icon}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {s.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                  {s.title}
                </h3>
                <div className="text-xs font-semibold text-emerald-400/90 mb-2">{s.level}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Residential & Day Boarding</span>
                <Link href="/admissions" className="font-semibold text-white group-hover:text-emerald-400 inline-flex items-center gap-1">
                  <span>Apply</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities & Boarding Overview */}
      <section className="bg-slate-900/40 border-y border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Residential Life & Wellness</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Olympus Boarding Residence: Safe, Structured & Nourishing
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Living on campus instills independence, discipline, and lifelong camaraderie. With 24/7 dedicated residential wardens, executive chef-curated sports nutrition plans, and supervised evening study halls, student-athletes flourish both on and off the field.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300">Biometric and digital roll-call check-ins with automated parent notifications.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300">Custom macro-balanced meal regimens designed by certified sports dietitians.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300">On-site cold plunge hydrotherapy, recovery compression suites, and physio rooms.</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/portal"
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 underline"
                >
                  <span>See How the Parent Portal Tracks Boarding & Leave Approvals</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Quick Mock Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-800 flex items-center justify-between">
                <span>Student Life at a Glance</span>
                <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full text-[10px]">Live Campus Sync</span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-white">Morning Training: Strength & Agility</div>
                    <div className="text-[11px] text-slate-400">06:30 – 08:00 AM · Coach Miller</div>
                  </div>
                  <span className="text-emerald-400 font-bold text-[11px]">Completed ✅</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-white">AP Physics & Advanced Math</div>
                    <div className="text-[11px] text-slate-400">09:15 – 12:30 PM · Academic Lab</div>
                  </div>
                  <span className="text-blue-400 font-bold text-[11px]">In Progress 📚</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-white">Tactical Match Simulation</div>
                    <div className="text-[11px] text-slate-400">16:00 – 18:30 PM · Center Courts</div>
                  </div>
                  <span className="text-slate-400 text-[11px]">Scheduled ⏰</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-emerald-950/60 border border-emerald-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Ready to Begin Your Championship Journey?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Submit your student profile today. Our admissions and athletic coaching committee will review your video dossiers and invite qualified candidates for campus assessment trials.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/admissions"
              className="px-6 py-3.5 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all text-sm shadow-lg shadow-emerald-500/20"
            >
              Start Online Application
            </Link>
            <Link
              href="/portal"
              className="px-6 py-3.5 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all text-sm"
            >
              Test Live Portal (All Roles)
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
