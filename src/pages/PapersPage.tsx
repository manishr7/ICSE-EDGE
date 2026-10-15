import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  Download,
  AlertCircle,
  Clock,
  ShieldCheck,
  TrendingUp,
  Award,
} from 'lucide-react';
import { QUESTION_PAPERS } from '../data/papers.ts';
import { ICSE_SUBJECTS } from '../data/subjects.ts';
import { filterPapers } from '../utils/studyTracker.ts';
import { downloadPaperPdf } from '../utils/pdfGenerator.ts';
import type { QuestionPaper } from '../types/index.ts';
import type { StoredPaperRecord } from '../utils/studyTracker.ts';

interface PapersPageProps {
  completedPapers: Record<string, StoredPaperRecord>;
  onOpenPaperModal: (paper: QuestionPaper) => void;
  onNavigate: (path: string) => void;
}

export const PapersPage: React.FC<PapersPageProps> = ({
  completedPapers,
  onOpenPaperModal,
  onNavigate,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const years = ['all', '2025 Specimen', '2024', '2023', '2022'];

  const filtered = filterPapers(QUESTION_PAPERS, {
    subjectId: selectedSubject,
    year: selectedYear,
    paperType: selectedType,
    searchQuery: searchQuery,
  });

  const handleDirectDownload = (e: React.MouseEvent, paper: QuestionPaper) => {
    e.stopPropagation();
    try {
      setDownloadingId(paper.id);
      downloadPaperPdf(paper);
      setTimeout(() => setDownloadingId(null), 800);
    } catch (err) {
      console.error('Download error:', err);
      setDownloadingId(null);
    }
  };

  return (
    <div className="space-y-10 pt-4">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-mono uppercase tracking-wider text-teal-800 font-semibold block">
          Section 02 · Paper Bank
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#14213d] tracking-tight">
          Previous Year Question Papers
        </h1>
        <p className="text-sm sm:text-base text-[#14213d]/80 leading-relaxed font-sans">
          From October onwards, one full past paper a week under timed conditions is worth more than another passive read of the textbook. Below: the verified CISCE papers archive, specimen papers, marking schemes, and timed mock logger.
        </p>
      </div>

      {/* Rules to Make a Mock Actually Count Callout */}
      <div className="bg-[#f4f1ea] border border-[#14213d]/15 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-teal-800" />
          <h2 className="font-serif font-bold text-lg text-[#14213d]">
            The 5 Rules to Make a Mock Test Count
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs text-[#14213d]/85">
          <div className="bg-white/80 p-3 rounded-lg border border-[#14213d]/10 space-y-1">
            <span className="font-mono font-bold text-teal-800 block text-[11px]">01 · Unbroken Sitting</span>
            <p>Sit the full 2 to 3 hours without phone, music, or checking textbook answers.</p>
          </div>
          <div className="bg-white/80 p-3 rounded-lg border border-[#14213d]/10 space-y-1">
            <span className="font-mono font-bold text-teal-800 block text-[11px]">02 · 15-Min Reading</span>
            <p>Use exact reading time to tick Section B choices before picking up your pen.</p>
          </div>
          <div className="bg-white/80 p-3 rounded-lg border border-[#14213d]/10 space-y-1">
            <span className="font-mono font-bold text-teal-800 block text-[11px]">03 · Loose Exam Sheets</span>
            <p>Write on unruled or ruled loose sheets to build authentic hand endurance.</p>
          </div>
          <div className="bg-white/80 p-3 rounded-lg border border-[#14213d]/10 space-y-1">
            <span className="font-mono font-bold text-teal-800 block text-[11px]">04 · Hard Stop</span>
            <p>Stop dead when the clock rings, even mid-word. Then evaluate with marking schemes.</p>
          </div>
          <div className="bg-white/80 p-3 rounded-lg border border-[#14213d]/10 space-y-1">
            <span className="font-mono font-bold text-teal-800 block text-[11px]">05 · 3-Bucket Review</span>
            <p>Log lost marks: (1) Didn't know, (2) Wrote badly, (3) Careless slip. Bucket 3 is your grade.</p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#14213d]/15 rounded-xl p-4 sm:p-5 shadow-2xs space-y-3">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          {/* Subject dropdown */}
          <div className="flex flex-wrap items-center gap-2">
            <label className="text-xs font-mono uppercase text-[#14213d]/60 font-medium">
              Subject:
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-1.5 text-xs bg-[#faf8f5] border border-[#14213d]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-700 text-[#14213d] font-medium"
            >
              <option value="all">All 10 Subjects</option>
              {ICSE_SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            {/* Year buttons */}
            <div className="flex items-center gap-1 overflow-x-auto py-1">
              {years.map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                    selectedYear === yr
                      ? 'bg-[#14213d] text-white font-semibold'
                      : 'bg-[#faf8f5] text-[#14213d]/70 hover:text-[#14213d] border border-[#14213d]/10'
                  }`}
                >
                  {yr === 'all' ? 'All Years' : yr}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-64">
            <Search className="w-4 h-4 text-[#14213d]/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search paper or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#faf8f5] border border-[#14213d]/20 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-700"
            />
          </div>
        </div>

        {/* Verified source disclosure */}
        <div className="pt-2 border-t border-[#14213d]/10 flex items-center justify-between text-[11px] text-[#14213d]/60">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
            <span>Instant PDF generation & authentic CISCE question papers. No external 404 links.</span>
          </span>
          <span className="font-mono">
            Showing {filtered.length} paper{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((paper) => {
          const record = completedPapers[paper.id];
          const isDone = !!record;
          const isDownloading = downloadingId === paper.id;

          return (
            <div
              key={paper.id}
              className={`border rounded-xl p-5 shadow-2xs transition-all flex flex-col justify-between ${
                isDone
                  ? 'bg-teal-50/40 border-teal-200'
                  : 'bg-white border-[#14213d]/12 hover:border-[#14213d]/25'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-100 text-teal-900 font-semibold">
                    {paper.subjectName}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#14213d]/5 text-[#14213d]">
                    {paper.year}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-[#14213d] mb-1.5 leading-snug">
                  {paper.title}
                </h3>

                <p className="text-xs text-[#14213d]/70 leading-relaxed mb-3 line-clamp-2">
                  {paper.notes || 'Full past examination paper for timed mock preparation.'}
                </p>

                {/* Score badge if completed */}
                {isDone && (
                  <div className="mb-3 p-2 bg-white rounded-lg border border-teal-200 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-teal-800 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
                      <span>Solved & Logged</span>
                    </span>
                    <span className="font-mono font-bold text-[#14213d]">
                      {record.score !== undefined ? `${record.score} / ${record.maxScore}` : 'Completed'}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#14213d]/10 flex items-center justify-between gap-2">
                <button
                  onClick={(e) => handleDirectDownload(e, paper)}
                  disabled={isDownloading}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 text-xs font-medium transition-colors"
                  title="Download actual PDF directly"
                >
                  <Download className="w-3.5 h-3.5 text-teal-700" />
                  <span>{isDownloading ? 'Downloading...' : 'PDF'}</span>
                </button>

                <button
                  onClick={() => onOpenPaperModal(paper)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14213d] hover:bg-teal-800 text-white text-xs font-medium transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{isDone ? 'View / Update' : 'View / Solve'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center p-12 bg-white rounded-2xl border border-[#14213d]/10 space-y-3">
          <FileText className="w-8 h-8 text-[#14213d]/30 mx-auto" />
          <h3 className="font-serif font-bold text-lg text-[#14213d]">
            No papers match your filters
          </h3>
          <p className="text-xs text-[#14213d]/60 max-w-sm mx-auto">
            Try clearing the search query or changing the selected year or subject filter.
          </p>
          <button
            onClick={() => {
              setSelectedSubject('all');
              setSelectedYear('all');
              setSelectedType('all');
              setSearchQuery('');
            }}
            className="px-3.5 py-1.5 bg-[#14213d]/5 hover:bg-[#14213d]/10 text-xs font-mono rounded-md"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
