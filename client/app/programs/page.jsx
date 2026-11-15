import Link from 'next/link';
import { Trophy, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ProgramsPage() {
  const sports = [
    {
      name: 'Tennis Academy',
      director: 'Coach David Miller (Ex-ATP)',
      facilities: '12 Clay Courts, 8 Hard Courts, Indoor Arena',
      trainingHours: '22 hrs / week',
      pathway: 'ITF Juniors, UTR, NCAA Division I, ATP/WTA Tour',
      features: [
        'High-speed video biomechanics (PlaySight)',
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-slate-900">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-black uppercase tracking-wider text-blue-800">Integrated Curriculum</span>
        <h1 className="text-3xl sm:text-5xl font-black text-blue-950">Programs & Academic Pathways</h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          At AthleteEd, students do not compromise between championship sports training and college-preparatory academics. Our curriculum model flexes dynamically around athlete training cycles.
        </p>
      </div>

      {/* Dual Excellence Model */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-800">
            <Trophy className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-blue-950">Elite Athletic Development</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Sport-specific training delivered by certified coaches. Focus on technical mastery, biomechanical efficiency, tactical IQ, mental toughness, and injury reduction.
          </p>
          <ul className="text-xs text-slate-600 space-y-2 pt-2 font-medium">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
              <span>Small squad sizes (1:8 coach ratio)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
              <span>Tournament travel accompaniment & coaching</span>
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-800">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-blue-950">Accredited Academic College Prep</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Rigorous college preparatory curriculum (Grades 8–12) with Honors, Advanced Placement (AP), and dual-enrollment college credits. NCAA-approved core course catalog.
          </p>
          <ul className="text-xs text-slate-600 space-y-2 pt-2 font-medium">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-700 shrink-0" />
              <span>Asynchronous hybrid study for students traveling for tournaments</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-700 shrink-0" />
              <span>Supervised evening tutoring & study halls</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Sports Detail */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-blue-950">Specialized Academy Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sports.map((sp, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-blue-300 transition-all">
              <div>
                <h3 className="text-lg font-black text-blue-950">{sp.name}</h3>
                <div className="text-xs text-blue-700 font-bold mb-3">{sp.director}</div>

                <div className="text-xs text-slate-600 space-y-1.5 mb-4 pb-4 border-b border-slate-100 font-medium">
                  <div><strong>Facilities:</strong> {sp.facilities}</div>
                  <div><strong>Volume:</strong> {sp.trainingHours}</div>
                  <div><strong>Pathway:</strong> {sp.pathway}</div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                  {sp.features.map((feat, fi) => (
                    <div key={fi} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  href="/admissions"
                  className="w-full py-2.5 rounded-lg bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs inline-flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Apply for {sp.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-200" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
