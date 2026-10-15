import React from 'react';
import { Award, CheckCircle2, TrendingUp, ArrowRight, FileCheck } from 'lucide-react';
import type { PaperStats, ChecklistStats } from '../utils/studyTracker.ts';

interface StudyProgressBarProps {
  paperStats: PaperStats;
  checklistStats: ChecklistStats;
  onNavigate: (path: string) => void;
  className?: string;
}

export const StudyProgressBar: React.FC<StudyProgressBarProps> = ({
  paperStats,
  checklistStats,
  onNavigate,
  className = '',
}) => {
  return (
    <div className={`bg-white border border-[#14213d]/15 rounded-xl p-5 shadow-xs ${className}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#14213d]/10">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-teal-800 font-semibold block mb-0.5">
            Your Revision Meter
          </span>
          <h3 className="font-serif font-bold text-lg text-[#14213d]">
            Class 10 Board Readiness
          </h3>
        </div>
        <button
          onClick={() => onNavigate('/progress')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-teal-800 hover:text-teal-950 hover:underline"
        >
          <span>Detailed Study Log</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        {/* Metric 1: Past Papers Completed */}
        <div className="bg-[#faf8f5] p-3.5 rounded-lg border border-[#14213d]/10">
          <div className="flex items-center justify-between text-xs text-[#14213d]/70 mb-1">
            <span className="flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-teal-700" />
              <span>Past Papers</span>
            </span>
            <span className="font-mono font-semibold text-[#14213d]">
              {paperStats.completedCount} / {paperStats.totalPapers}
            </span>
          </div>
          <div className="w-full bg-[#14213d]/10 h-2 rounded-full overflow-hidden">
            <div
              className="bg-teal-700 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(paperStats.percentage, 0))}%` }}
            />
          </div>
          <p className="text-[11px] text-[#14213d]/60 mt-1.5">
            {paperStats.percentage}% papers timed & solved
          </p>
        </div>

        {/* Metric 2: Average Mock Score */}
        <div className="bg-[#faf8f5] p-3.5 rounded-lg border border-[#14213d]/10">
          <div className="flex items-center justify-between text-xs text-[#14213d]/70 mb-1">
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-teal-700" />
              <span>Mock Average</span>
            </span>
            <span className="font-mono font-semibold text-[#14213d]">
              {paperStats.averageScorePercentage !== null
                ? `${paperStats.averageScorePercentage}%`
                : 'No tests yet'}
            </span>
          </div>
          <div className="w-full bg-[#14213d]/10 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-600 h-full rounded-full transition-all duration-500"
              style={{
                width: `${paperStats.averageScorePercentage !== null ? paperStats.averageScorePercentage : 0}%`,
              }}
            />
          </div>
          <p className="text-[11px] text-[#14213d]/60 mt-1.5">
            {paperStats.scoredCount > 0
              ? `Across ${paperStats.scoredCount} evaluated papers`
              : 'Record scores on the Past Papers page'}
          </p>
        </div>

        {/* Metric 3: Syllabus Checklist Tasks */}
        <div className="bg-[#faf8f5] p-3.5 rounded-lg border border-[#14213d]/10">
          <div className="flex items-center justify-between text-xs text-[#14213d]/70 mb-1">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
              <span>Syllabus Checklists</span>
            </span>
            <span className="font-mono font-semibold text-[#14213d]">
              {checklistStats.completed} / {checklistStats.total}
            </span>
          </div>
          <div className="w-full bg-[#14213d]/10 h-2 rounded-full overflow-hidden">
            <div
              className="bg-teal-800 h-full rounded-full transition-all duration-500"
              style={{ width: `${checklistStats.percentage}%` }}
            />
          </div>
          <p className="text-[11px] text-[#14213d]/60 mt-1.5">
            {checklistStats.percentage}% key concepts checked off
          </p>
        </div>
      </div>
    </div>
  );
};
