import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0b193d] border-t border-blue-950 text-slate-300 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center shadow-md">
                <Image
                  src="/logo.png"
                  alt="AthleteEd Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-black text-white tracking-tight">Athlete<span className="text-blue-400">Ed</span></span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              The premier hybrid residential academy uniting world-class Olympic coaching with accredited academic curricula.
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Accredited Academic Boarding Institution</span>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Athletic Pathways</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/programs" className="hover:text-white transition-colors">Tennis Performance Academy</Link></li>
              <li><Link href="/programs" className="hover:text-white transition-colors">Elite Football Development</Link></li>
              <li><Link href="/programs" className="hover:text-white transition-colors">Basketball Varsity Prep</Link></li>
              <li><Link href="/programs" className="hover:text-white transition-colors">Olympic Swimming Program</Link></li>
              <li><Link href="/programs" className="hover:text-white transition-colors">Middle & Sprint Track Athletics</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Admissions & Portal</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/admissions" className="hover:text-white transition-colors">Online Student Application</Link></li>
              <li><Link href="/portal" className="hover:text-white transition-colors">Parent 360° Dashboard</Link></li>
              <li><Link href="/portal" className="hover:text-white transition-colors">Student Timetable View</Link></li>
              <li><Link href="/portal" className="hover:text-white transition-colors">Admin Admissions Review Pipeline</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Campus & Contact</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Olympus Campus Way, Florida, USA</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>+1 (800) 555-CHAMP</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>admissions@athleteed.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-blue-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 AthleteEd Academy Inc. All rights reserved.</p>
          <div className="flex space-x-6 text-slate-300 font-medium">
            <span className="hover:text-white">Privacy Policy (Minors DPDP Compliant)</span>
            <span className="hover:text-white">Terms of Boarding</span>
            <span className="hover:text-white">Security Audits</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
