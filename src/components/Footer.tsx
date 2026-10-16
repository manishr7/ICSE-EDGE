import React from 'react';
import { ExternalLink, ShieldCheck, BookOpen } from 'lucide-react';
import { ICSE_SUBJECTS } from '../data/subjects.ts';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[#14213d]/10 bg-[#f4f1ea] text-[#14213d] mt-20 pt-12 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: About */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-[#14213d] text-[#faf8f5] flex items-center justify-center font-serif font-bold text-xs">
                IE
              </span>
              <span className="font-serif font-bold text-lg text-[#14213d]">ICSE Edge</span>
            </div>
            <p className="text-xs text-[#14213d]/70 leading-relaxed">
              A clean, focused revision companion and paper archive engineered specifically for ICSE Class 10 students in India.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-xs text-teal-800">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              <span>Zero-fluff, syllabus-aligned MVP</span>
            </div>
          </div>

          {/* Col 2: Subjects Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#14213d]/60 font-semibold">
              Subject Strategies
            </h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
              {ICSE_SUBJECTS.map((sub) => (
                <a
                  key={sub.id}
                  href={`/strategies/${sub.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/strategies/${sub.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left text-[#14213d]/80 hover:text-teal-800 hover:underline truncate py-0.5 block"
                >
                  {sub.name}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Key Resources */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#14213d]/60 font-semibold">
              Essential Resources
            </h4>
            <ul className="space-y-1.5 text-xs text-[#14213d]/80">
              <li>
                <a
                  href="/papers"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/papers');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-teal-800 hover:underline inline-block"
                >
                  Previous Year Papers (2022–2025)
                </a>
              </li>
              <li>
                <a
                  href="/how-to-write"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/how-to-write');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-teal-800 hover:underline inline-block"
                >
                  7 Golden Answer Writing Rules
                </a>
              </li>
              <li>
                <a
                  href="/tips"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/tips');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-teal-800 hover:underline inline-block"
                >
                  Hall Time Management & Underlining
                </a>
              </li>
              <li>
                <a
                  href="/progress"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/progress');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-teal-800 hover:underline inline-block"
                >
                  Offline Study & Score Tracker
                </a>
              </li>
              <li>
                <a
                  href="https://cisce.org"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-teal-800 hover:underline"
                >
                  Official CISCE Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Project Architecture */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#14213d]/60 font-semibold">
              Project Architecture
            </h4>
            <p className="text-xs text-[#14213d]/70 leading-relaxed">
              Built as a lightweight, static-first portfolio project with local-storage progress persistence, instant client-side PDF generation, and zero third-party dependencies.
            </p>
          </div>
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="border-t border-[#14213d]/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#14213d]/60">
          <p>
            Educational portfolio project. All syllabi, past questions, and regulations belong to the Council for the Indian School Certificate Examinations (CISCE).
          </p>
          <div className="flex items-center gap-4">
            <span>Local Storage Active</span>
            <span>·</span>
            <span>Fast & Private</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
