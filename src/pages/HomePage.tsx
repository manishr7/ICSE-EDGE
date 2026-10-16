import React from 'react';
import {
  BookOpen,
  FileText,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Compass,
  Award,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { ICSE_SUBJECTS } from '../data/subjects.ts';
import { TipOfTheDay } from '../components/TipOfTheDay.tsx';
import { StudyProgressBar } from '../components/StudyProgressBar.tsx';
import type { PaperStats, ChecklistStats } from '../utils/studyTracker.ts';

interface HomePageProps {
  onNavigate: (path: string) => void;
  paperStats: PaperStats;
  checklistStats: ChecklistStats;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  paperStats,
  checklistStats,
}) => {
  return (
    <div className="space-y-14">
      {/* Hero Section */}
      <section className="pt-6 sm:pt-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-900 text-xs font-mono font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
            <span>Council Examination · ICSE Class 10 Board Companion</span>
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#14213d] tracking-tight leading-[1.15] mb-5">
            You already know the syllabus. <br className="hidden sm:inline" />
            <span className="text-teal-900 italic font-normal">This is how you write it.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#14213d]/80 leading-relaxed font-sans mb-8">
            A working handbook and past paper archive for ICSE Class 10 students. Ten subjects, each with a battle-tested study strategy, an answer-presentation drill, a 3-hour hall clock plan, and verified previous-year papers.
          </p>

          {/* Primary Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/strategies"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/strategies');
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#14213d] hover:bg-teal-800 text-white font-medium text-sm transition-colors shadow-sm"
            >
              <span>Explore 10 Subject Strategies</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/papers"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/papers');
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white hover:bg-[#14213d]/5 text-[#14213d] font-medium text-sm border border-[#14213d]/20 transition-colors"
            >
              <FileText className="w-4 h-4 text-teal-700" />
              <span>Previous Year Papers Bank</span>
            </a>
            <a
              href="/how-to-write"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/how-to-write');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg text-teal-800 hover:text-teal-950 font-medium text-sm hover:underline"
            >
              <span>7 Presentation Rules</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Progress & Daily Tip Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7">
          <StudyProgressBar
            paperStats={paperStats}
            checklistStats={checklistStats}
            onNavigate={onNavigate}
          />
        </div>
        <div className="lg:col-span-5">
          <TipOfTheDay />
        </div>
      </section>

      {/* Section Highlights / 2 Pillar Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#f4f1ea] border border-[#14213d]/15 rounded-xl p-6 relative overflow-hidden group">
          <span className="text-xs font-mono uppercase tracking-wider text-teal-800 font-semibold block mb-2">
            Section 01 · Subject Guides
          </span>
          <h2 className="font-serif font-bold text-2xl text-[#14213d] mb-3">
            Strategy & Answer Presentation
          </h2>
          <p className="text-sm text-[#14213d]/80 leading-relaxed mb-5">
            How to study each subject, how to structure an answer for its marks, what to underline, how to lay out the answer sheet, and how to divide the clock inside the hall.
          </p>
          <a
            href="/strategies"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/strategies');
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-800 group-hover:text-teal-950 group-hover:translate-x-0.5 transition-all"
          >
            <span>All 10 Subject Strategies</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="bg-[#f4f1ea] border border-[#14213d]/15 rounded-xl p-6 relative overflow-hidden group">
          <span className="text-xs font-mono uppercase tracking-wider text-teal-800 font-semibold block mb-2">
            Section 02 · Paper Archive
          </span>
          <h2 className="font-serif font-bold text-2xl text-[#14213d] mb-3">
            Past Papers & Timed Mocks
          </h2>
          <p className="text-sm text-[#14213d]/80 leading-relaxed mb-5">
            Past papers under full exam conditions, the rules for making a mock actually count, official CISCE marking schemes, and high-frequency recurring questions.
          </p>
          <a
            href="/papers"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/papers');
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-800 group-hover:text-teal-950 group-hover:translate-x-0.5 transition-all"
          >
            <span>Go to the Paper Bank</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Subject Explorer Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#14213d]/10 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-teal-800 font-semibold block mb-1">
              Curriculum Explorer
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#14213d]">
              Jump to a Subject
            </h2>
          </div>
          <a
            href="/strategies"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/strategies');
            }}
            className="text-xs font-mono text-teal-800 hover:underline self-start sm:self-auto"
          >
            View all categories →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {ICSE_SUBJECTS.map((subject) => (
            <a
              key={subject.id}
              href={`/strategies/${subject.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`/strategies/${subject.id}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group text-left p-4 rounded-xl bg-white hover:bg-teal-50/50 border border-[#14213d]/10 hover:border-teal-600/40 transition-all shadow-2xs hover:shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#14213d]/50 mb-2">
                  <span className="font-bold text-teal-800">{subject.number}</span>
                  <span className="text-[11px] px-1.5 py-0.2 rounded bg-[#14213d]/5">
                    {subject.marks} Marks
                  </span>
                </div>
                <h3 className="font-serif font-bold text-base text-[#14213d] group-hover:text-teal-900 transition-colors mb-1">
                  {subject.name}
                </h3>
                <p className="text-[11px] text-[#14213d]/65 line-clamp-2 leading-tight">
                  {subject.tagline}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-[#14213d]/5 flex items-center justify-between text-[11px] text-[#14213d]/60 group-hover:text-teal-800">
                <span>{subject.duration}</span>
                <span className="font-semibold group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* The Core Truth Callout */}
      <section className="bg-[#14213d] text-[#faf8f5] rounded-2xl p-7 sm:p-10 relative overflow-hidden shadow-md">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-teal-300 font-semibold block">
            The Fundamental Rule of ICSE Board Exams
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl tracking-tight text-white">
            The one rule that beats every other
          </h2>
          <p className="text-sm sm:text-base text-[#faf8f5]/85 leading-relaxed">
            ICSE does not test how much you know in your head. It tests how much of what you know the examiner can spot on your answer sheet in the ninety seconds spent evaluating your script.
          </p>
          <p className="text-xs sm:text-sm text-[#faf8f5]/75 leading-relaxed">
            Numbering alignment, pencil diagrams, keyword underlining, and units are not cosmetics — they are the marks.
          </p>
          <div className="pt-2">
            <a
              href="/how-to-write"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/how-to-write');
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold tracking-wide transition-colors"
            >
              <span>Read the 7 Answer-Writing Rules</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
