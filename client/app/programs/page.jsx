import Link from 'next/link';
import { Trophy, BookOpen, Clock, Award, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ProgramsPage() {
  const sports = [
    {
      name: 'Tennis Academy',
      director: 'Coach David Miller (Ex-ATP)',
      facilities: '12 Clay Courts, 8 Hard Courts, Indoor Arena',
      trainingHours: '22 hrs / week',
      pathway: 'ITF Juniors, UTR, NCAA Division I, ATP/WTA Tour',
      features: [
        'High-speed video biomechanics (Dartfish & PlaySight)',
        'Customized racket stringing & equipment lab',
        'Tactical match psychology & tournament travel coaching'
      ]
    },
    {
      name: 'Elite Football (Soccer)',
      director: 'Coach Marcus Vance (UEFA Pro License)',
      facilities: '3 FIFA Quality Pro Turf pitches, 2 Natural Grass',
      trainingHours: '20 hrs / week',
      pathway: 'MLS Next, European Academy Showcases, NCAA',
      features: [
        'GPS load monitoring (Catapult sports tracking)',
        'Positional tactical analysis & set-piece mastery',
        'Goalkeeping specialist squad training'
      ]
    },
    {
      name: 'Basketball Varsity Prep',
      director: 'Coach Jamal Harris (Former D1 Coach)',
      facilities: '4 NCAA Regulation Hardwood Courts',
      trainingHours: '20 hrs / week',
      pathway: 'Nike EYBL Circuit, National Prep Championship, NCAA D1',
      features: [
        'Dr. Dish shooting machines with real-time arc analytics',
        'Plyometric vertical jump enhancement program',
        'Film breakdown & defensive schemes'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Integrated Curriculum</span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">Programs & Academic Pathways</h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          At AthleteEd, students do not compromise between championship sports training and college-preparatory academics. Our curriculum model flexes dynamically around athlete training cycles.
        </p>
      </div>

      {/* Dual Excellence Model */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Trophy className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Elite Athletic Development</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Sport-specific training delivered by world-class certified coaches. Focus on technical mastery, biomechanical efficiency, tactical IQ, mental toughness, and injury reduction.
          </p>
          <ul className="text-xs text-slate-400 space-y-2 pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Small squad sizes (1:8 coach ratio)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Tournament travel accompaniment & coaching</span>
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Accredited Academic College Prep</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Rigorous college preparatory curriculum (Grades 8–12) with Honors, Advanced Placement (AP), and dual-enrollment college credits. NCAA-approved core course catalog.
          </p>
          <ul className="text-xs text-slate-400 space-y-2 pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Asynchronous hybrid study for students traveling for tournaments</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Supervised evening tutoring & study halls</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Sports Detail */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Specialized Academy Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sports.map((sp, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{sp.name}</h3>
                <div className="text-xs text-emerald-400 font-semibold mb-3">{sp.director}</div>

                <div className="text-xs text-slate-400 space-y-1.5 mb-4 pb-4 border-b border-slate-800">
                  <div><strong>Facilities:</strong> {sp.facilities}</div>
                  <div><strong>Volume:</strong> {sp.trainingHours}</div>
                  <div><strong>Pathway:</strong> {sp.pathway}</div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  {sp.features.map((feat, fi) => (
                    <div key={fi} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800">
                <Link
                  href="/admissions"
                  className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs inline-flex items-center justify-center gap-2"
                >
                  <span>Apply for {sp.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
