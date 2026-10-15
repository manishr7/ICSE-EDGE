import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Trash2,
  FileText,
  Clock,
  TrendingUp,
  Download,
  Upload,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { ICSE_SUBJECTS } from '../data/subjects.ts';
import { QUESTION_PAPERS } from '../data/papers.ts';
import type { QuestionPaper } from '../types/index.ts';
import type { StoredPaperRecord, PaperStats, ChecklistStats } from '../utils/studyTracker.ts';

interface ProgressPageProps {
  completedPapers: Record<string, StoredPaperRecord>;
  checkedTasks: Record<string, boolean>;
  paperStats: PaperStats;
  checklistStats: ChecklistStats;
  onOpenPaperModal: (paper: QuestionPaper) => void;
  onClearAllProgress: () => void;
  onNavigate: (path: string) => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({
  completedPapers,
  checkedTasks,
  paperStats,
  checklistStats,
  onOpenPaperModal,
  onClearAllProgress,
  onNavigate,
}) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Completed papers list
  const completedEntries = Object.entries(completedPapers)
    .map(([paperId, record]) => {
      const paper = QUESTION_PAPERS.find((p) => p.id === paperId);
      return { paperId, record, paper };
    })
    .filter((entry) => !!entry.paper);

  const handleExportData = () => {
    const data = {
      completedPapers,
      checkedTasks,
      exportedAt: new Date().toISOString(),
      app: 'ICSE Edge',
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `icse-edge-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10 pt-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#14213d]/10 pb-6">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-teal-800 font-semibold block">
            Offline & Private · Local Storage
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#14213d] tracking-tight">
            Personal Study Tracker
          </h1>
          <p className="text-xs sm:text-sm text-[#14213d]/75 max-w-2xl leading-relaxed">
            Your solved papers, mock test scores, and revision checklist status are saved automatically in your browser's local storage. No login or email required.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleExportData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#14213d]/15 text-xs font-medium text-[#14213d] hover:bg-[#14213d]/5 transition-colors"
            title="Download JSON backup of your progress"
          >
            <Download className="w-3.5 h-3.5 text-teal-700" />
            <span>Export Backup</span>
          </button>

          {!showClearConfirm ? (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="p-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
              title="Reset all progress"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-1.5 bg-red-50 p-1 rounded-lg border border-red-200">
              <span className="text-[11px] text-red-800 px-1 font-semibold">Confirm?</span>
              <button
                onClick={() => {
                  onClearAllProgress();
                  setShowClearConfirm(false);
                }}
                className="px-2 py-0.5 bg-red-600 text-white rounded text-[11px] font-semibold"
              >
                Yes, Reset
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-2 py-0.5 text-xs text-[#14213d]"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#14213d]/15 rounded-xl p-5 shadow-2xs">
          <span className="text-xs font-mono uppercase text-[#14213d]/60 block mb-1">
            Papers Practiced
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-serif font-bold text-3xl text-[#14213d]">
              {paperStats.completedCount}
            </span>
            <span className="text-xs text-[#14213d]/60 font-mono">
              / {paperStats.totalPapers} available
            </span>
          </div>
          <div className="w-full bg-[#14213d]/10 h-1.5 rounded-full overflow-hidden mt-3">
            <div
              className="bg-teal-700 h-full rounded-full transition-all duration-300"
              style={{ width: `${paperStats.percentage}%` }}
            />
          </div>
          <span className="text-[11px] text-[#14213d]/60 mt-1 block">
            {paperStats.percentage}% past papers completed
          </span>
        </div>

        <div className="bg-white border border-[#14213d]/15 rounded-xl p-5 shadow-2xs">
          <span className="text-xs font-mono uppercase text-[#14213d]/60 block mb-1">
            Average Mock Score
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-serif font-bold text-3xl text-[#14213d]">
              {paperStats.averageScorePercentage !== null
                ? `${paperStats.averageScorePercentage}%`
                : '—'}
            </span>
            <span className="text-xs text-[#14213d]/60 font-mono">
              {paperStats.scoredCount > 0 ? `(${paperStats.scoredCount} tests)` : 'No scores logged'}
            </span>
          </div>
          <div className="w-full bg-[#14213d]/10 h-1.5 rounded-full overflow-hidden mt-3">
            <div
              className="bg-amber-600 h-full rounded-full transition-all duration-300"
              style={{
                width: `${paperStats.averageScorePercentage !== null ? paperStats.averageScorePercentage : 0}%`,
              }}
            />
          </div>
          <span className="text-[11px] text-[#14213d]/60 mt-1 block">
            Target 90%+ across all mock sessions
          </span>
        </div>

        <div className="bg-white border border-[#14213d]/15 rounded-xl p-5 shadow-2xs">
          <span className="text-xs font-mono uppercase text-[#14213d]/60 block mb-1">
            Syllabus Checklists
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-serif font-bold text-3xl text-[#14213d]">
              {checklistStats.completed}
            </span>
            <span className="text-xs text-[#14213d]/60 font-mono">
              / {checklistStats.total} milestones
            </span>
          </div>
          <div className="w-full bg-[#14213d]/10 h-1.5 rounded-full overflow-hidden mt-3">
            <div
              className="bg-teal-800 h-full rounded-full transition-all duration-300"
              style={{ width: `${checklistStats.percentage}%` }}
            />
          </div>
          <span className="text-[11px] text-[#14213d]/60 mt-1 block">
            {checklistStats.percentage}% core chapters revised
          </span>
        </div>
      </div>

      {/* Solved Papers Log */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#14213d]/10 pb-3">
          <h2 className="font-serif font-bold text-2xl text-[#14213d]">
            Completed Question Papers & Mock Log
          </h2>
          <button
            onClick={() => onNavigate('/papers')}
            className="text-xs font-mono text-teal-800 hover:underline"
          >
            Open paper bank →
          </button>
        </div>

        {completedEntries.length > 0 ? (
          <div className="bg-white border border-[#14213d]/15 rounded-xl divide-y divide-[#14213d]/10 overflow-hidden shadow-2xs">
            {completedEntries.map(({ paperId, record, paper }) => {
              if (!paper) return null;
              const hasScore = typeof record.score === 'number' && typeof record.maxScore === 'number';
              const percent = hasScore ? Math.round((record.score! / record.maxScore!) * 100) : null;

              return (
                <div
                  key={paperId}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#faf8f5] transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-100 text-teal-900 font-semibold">
                        {paper.subjectName}
                      </span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#14213d]/5 text-[#14213d]">
                        {paper.year}
                      </span>
                      <span className="text-[11px] text-[#14213d]/50 font-mono">
                        Solved on {record.completedAt}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-base text-[#14213d]">
                      {paper.title}
                    </h3>
                    {record.notes && (
                      <p className="text-xs text-[#14213d]/70 italic">
                        "{record.notes}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4 shrink-0 self-end sm:self-auto">
                    {hasScore && (
                      <div className="text-right">
                        <span className="font-mono font-bold text-base text-[#14213d] block">
                          {record.score} / {record.maxScore}
                        </span>
                        <span className="text-[11px] font-mono text-teal-800 font-semibold">
                          {percent}%
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => onOpenPaperModal(paper)}
                      className="px-3 py-1.5 text-xs rounded-lg border border-[#14213d]/20 hover:bg-[#14213d]/5 text-[#14213d] font-medium transition-colors"
                    >
                      Edit Score
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-xl border border-[#14213d]/10 space-y-2">
            <p className="text-xs text-[#14213d]/70">
              No question papers marked as completed yet.
            </p>
            <button
              onClick={() => onNavigate('/papers')}
              className="text-xs font-semibold text-teal-800 hover:underline"
            >
              Browse Past Papers Bank and start your first timed sitting →
            </button>
          </div>
        )}
      </div>

      {/* Subject-Wise Checklist Progress Breakdown */}
      <div className="space-y-4">
        <div className="border-b border-[#14213d]/10 pb-3">
          <h2 className="font-serif font-bold text-2xl text-[#14213d]">
            Subject-Wise Revision Milestones
          </h2>
          <p className="text-xs text-[#14213d]/70 mt-0.5">
            Track your progress across the high-yield topics of each individual subject.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ICSE_SUBJECTS.map((subject) => {
            const completed = subject.revisionChecklist.filter((item) => checkedTasks[item.id]).length;
            const total = subject.revisionChecklist.length;
            const pct = Math.round((completed / total) * 100);

            return (
              <div
                key={subject.id}
                className="bg-white border border-[#14213d]/12 rounded-xl p-4 sm:p-5 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-900 border border-teal-200">
                      {subject.number}
                    </span>
                    <h3 className="font-serif font-bold text-sm text-[#14213d]">
                      {subject.name}
                    </h3>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#14213d]">
                    {completed} / {total}
                  </span>
                </div>

                <div className="w-full bg-[#14213d]/10 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-teal-700 h-full rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#14213d]/60">
                  <span>{pct}% complete</span>
                  <button
                    onClick={() => onNavigate(`/strategies/${subject.id}`)}
                    className="text-teal-800 hover:underline font-medium"
                  >
                    Open Checklist →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
