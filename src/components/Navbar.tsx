import React, { useState } from 'react';
import { CheckCircle2, Menu, X } from 'lucide-react';
import type { PaperStats, ChecklistStats } from '../utils/studyTracker.ts';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  paperStats: PaperStats;
  checklistStats: ChecklistStats;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  paperStats,
  checklistStats,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/strategies', label: 'Strategies' },
    { path: '/papers', label: 'Past Papers' },
    { path: '/how-to-write', label: 'How to Write' },
    { path: '/tips', label: 'Study Tips' },
    { path: '/progress', label: 'My Progress' },
  ];

  const handleNav = (path: string) => {
    onNavigate(path);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#14213d]/10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => handleNav('/')}
          className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-sm"
          aria-label="ICSE Edge Home"
        >
          <div className="w-8 h-8 rounded bg-[#14213d] text-[#faf8f5] flex items-center justify-center font-serif font-bold text-sm tracking-tighter group-hover:bg-teal-700 transition-colors">
            IE
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-lg text-[#14213d] tracking-tight group-hover:text-teal-800 transition-colors">
                ICSE Edge
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 font-medium">
                Class 10
              </span>
            </div>
            <p className="text-[11px] text-[#14213d]/60 font-sans leading-none -mt-0.5 hidden sm:block">
              Strategy Room & Paper Bank
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive =
              currentPath === link.path ||
              (link.path === '/strategies' && currentPath.startsWith('/strategies/'));
            return (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors rounded-md ${
                  isActive
                    ? 'text-teal-800 bg-teal-50/80 font-semibold border-b-2 border-teal-700'
                    : 'text-[#14213d]/80 hover:text-[#14213d] hover:bg-black/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action / Progress Summary Pill */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={() => handleNav('/progress')}
            className="flex items-center gap-2 px-2.5 py-1 text-xs font-mono bg-[#14213d]/5 hover:bg-teal-50 hover:text-teal-900 border border-[#14213d]/15 rounded-md transition-colors"
            title="View personal study progress"
            aria-label="Study progress summary"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
            <span>
              {paperStats.completedCount} papers · {checklistStats.completed} tasks
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => handleNav('/progress')}
            className="p-1.5 text-xs font-mono bg-[#14213d]/5 rounded text-teal-800 border border-[#14213d]/10"
            aria-label="Quick progress"
          >
            {paperStats.completedCount}P/{checklistStats.completed}T
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#14213d] hover:bg-black/5 rounded-md focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-[#14213d]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-[#14213d]/10 bg-[#faf8f5] px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const isActive =
              currentPath === link.path ||
              (link.path === '/strategies' && currentPath.startsWith('/strategies/'));
            return (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
                  isActive
                    ? 'bg-teal-50 text-teal-900 font-semibold border-l-4 border-teal-700'
                    : 'text-[#14213d]/80 hover:bg-black/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
