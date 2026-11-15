'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { UserCheck, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Programs', href: '/programs' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'Campus Life', href: '/#boarding' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 relative flex items-center justify-center group-hover:scale-105 transition-transform">
              <Image
                src="/logo.png"
                alt="AthleteEd Logo"
                width={48}
                height={48}
                className="w-11 h-11 object-contain drop-shadow-sm"
                priority
              />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-blue-950 flex items-center gap-1">
                Athlete<span className="text-blue-700">Ed</span>
              </span>
              <span className="block text-[10px] tracking-wider uppercase text-slate-500 font-bold">
                Sports Academy & Boarding
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-900 font-bold border border-blue-200/60'
                      : 'text-slate-600 hover:text-blue-950 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3">
            <Link
              href="/portal"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-blue-900 hover:bg-blue-950 text-white transition-all shadow-md shadow-blue-900/20"
            >
              <UserCheck className="w-3.5 h-3.5 text-blue-200" />
              <span>Launch Portal</span>
            </Link>
            <Link
              href="/admissions"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold border border-slate-300 hover:border-slate-500 text-slate-800 hover:bg-slate-50 transition-colors"
            >
              <span>Apply for 2026</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-700" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
