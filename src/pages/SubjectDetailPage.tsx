import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Award,
  CheckCircle2,
  FileText,
  AlertCircle,
  Sparkles,
  BookOpen,
  Calendar,
  ExternalLink,
  Download,
} from 'lucide-react';
import { ICSE_SUBJECTS } from '../data/subjects.ts';
import { QUESTION_PAPERS } from '../data/papers.ts';
import { downloadPaperPdf } from '../utils/pdfGenerator.ts';
import type { QuestionPaper } from '../types/index.ts';
import type { StoredPaperRecord } from '../utils/studyTracker.ts';

interface SubjectDetailPageProps {
  subjectId: string;
  onNavigate: (path: string) => void;
  checkedTasks: Record<string, boolean>;
  onToggleTask: (taskId: string) => void;
  completedPapers: Record<string, StoredPaperRecord>;
  onOpenPaperModal: (paper: QuestionPaper) => void;
}

export const SubjectDetailPage: React.FC<SubjectDetailPageProps> = ({
  subjectId,
  onNavigate,
  checkedTasks,
  onToggleTask,
  completedPapers,
  onOpenPaperModal,
}) => {
  const [activeTab, setActiveTab] = useState<'strategy' | 'checklist' | 'papers'>('strategy');

  const subjectIndex = ICSE_SUBJECTS.findIndex((s) => s.id === subjectId);
  const subject = ICSE_SUBJECTS[subjectIndex] || ICSE_SUBJECTS[0];

  const prevSubject = subjectIndex > 0 ? ICSE_SUBJECTS[subjectIndex - 1] : null;
  const nextSubject = subjectIndex < ICSE_SUBJECTS.length - 1 ? ICSE_SUBJECTS[subjectIndex + 1] : null;

  // Filter papers for this subject
  const subjectPapers = QUESTION_PAPERS.filter((p) => p.subjectId === subject.id);

  // Checklist counts
  const completedChecklistCount = subject.revisionChecklist.filter(
    (item) => checkedTasks[item.id]
  ).length;
  const totalChecklistCount = subject.revisionChecklist.length;
  const checklistPercent = Math.round((completedChecklistCount / totalChecklistCount) * 100);

  return (
    <div className="space-y-8 pt-2">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('/strategies')}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#14213d]/70 hover:text-[#14213d] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All 10 Subjects</span>
        </button>

        <div className="flex items-center gap-3">
          {prevSubject && (
            <button
              onClick={() => onNavigate(`/strategies/${prevSubject.id}`)}
              className="text-xs text-[#14213d]/60 hover:text-[#14213d] hover:underline hidden sm:inline"
            >
              ← {prevSubject.name}
            </button>
          )}
          {nextSubject && (
            <button
              onClick={() => onNavigate(`/strategies/${nextSubject.id}`)}
              className="text-xs text-teal-800 hover:text-teal-950 font-medium hover:underline"
            >
              Next: {nextSubject.name} →
            </button>
          )}
        </div>
      </div>

      {/* Subject Header */}
      <div className="bg-white border border-[#14213d]/15 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-teal-100 text-teal-900 border border-teal-200">
            Subject {subject.number}
          </span>
          <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#14213d]/5 text-[#14213d]">
            {subject.paperCode}
          </span>
          <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-[#14213d]/5 text-[#14213d]">
            {subject.duration}
          </span>
          <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold">
            {subject.marks} Marks {subject.internalMarks ? `(+${subject.internalMarks} Int)` : ''}
          </span>
        </div>

        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#14213d] mb-3">
          {subject.name}
        </h1>
        <p className="text-base text-[#14213d]/80 leading-relaxed max-w-3xl mb-6">
          {subject.overview}
        </p>

        {/* Blueprint summary callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#faf8f5] p-4 rounded-xl border border-[#14213d]/10 text-xs">
          <div>
            <span className="font-mono uppercase font-bold text-teal-800 tracking-wider block mb-1">
              Section A (Compulsory):
            </span>
            <p className="text-[#14213d]/85 leading-relaxed">{subject.blueprint.sectionA}</p>
          </div>
          <div>
            <span className="font-mono uppercase font-bold text-teal-800 tracking-wider block mb-1">
              Section B (Choice Patterns):
            </span>
            <p className="text-[#14213d]/85 leading-relaxed">{subject.blueprint.sectionB}</p>
          </div>
        </div>

        {/* Tab selection */}
        <div className="flex items-center gap-2 border-b border-[#14213d]/10 pt-6 -mb-2">
          <button
            onClick={() => setActiveTab('strategy')}
            className={`pb-2.5 text-xs font-semibold px-2 transition-colors border-b-2 ${
              activeTab === 'strategy'
                ? 'border-teal-700 text-teal-900'
                : 'border-transparent text-[#14213d]/60 hover:text-[#14213d]'
            }`}
          >
            Strategy & Clock Plan
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`pb-2.5 text-xs font-semibold px-2 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'checklist'
                ? 'border-teal-700 text-teal-900'
                : 'border-transparent text-[#14213d]/60 hover:text-[#14213d]'
            }`}
          >
            <span>Revision Checklist</span>
            <span className="px-1.5 py-0.2 rounded-full bg-teal-100 text-teal-900 text-[10px] font-mono">
              {completedChecklistCount}/{totalChecklistCount}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('papers')}
            className={`pb-2.5 text-xs font-semibold px-2 transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'papers'
                ? 'border-teal-700 text-teal-900'
                : 'border-transparent text-[#14213d]/60 hover:text-[#14213d]'
            }`}
          >
            <span>Past Papers</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#14213d]/10 text-[#14213d] text-[10px] font-mono">
              {subjectPapers.length}
            </span>
          </button>
        </div>
      </div>

      {/* Tab 1: Strategy, Hall Plan, Writing & Underlining, Important Topics */}
      {activeTab === 'strategy' && (
        <div className="space-y-10 animate-in fade-in duration-150">
          {/* How to prepare */}
          <section className="space-y-4">
            <h2 className="font-serif font-bold text-2xl text-[#14213d]">
              How to Prepare
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subject.preparationSteps.map((step) => (
                <div
                  key={step.step}
                  className="bg-white border border-[#14213d]/12 rounded-xl p-5 shadow-2xs space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[#14213d] text-white flex items-center justify-center font-mono text-xs font-bold">
                      {step.step < 10 ? `0${step.step}` : step.step}
                    </span>
                    <h3 className="font-serif font-bold text-base text-[#14213d]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#14213d]/80 leading-relaxed">
                    {step.details}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Time plan in the hall */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-teal-800 font-semibold block">
                  Clock Division
                </span>
                <h2 className="font-serif font-bold text-2xl text-[#14213d]">
                  Time Plan Inside the Examination Hall
                </h2>
              </div>
              <span className="text-xs font-mono bg-teal-50 text-teal-900 px-2.5 py-1 rounded border border-teal-200">
                Total: {subject.duration} + 15 min reading
              </span>
            </div>

            <div className="bg-white border border-[#14213d]/15 rounded-xl divide-y divide-[#14213d]/10 overflow-hidden shadow-2xs">
              {subject.hallTimePlan.map((segment, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#faf8f5] transition-colors"
                >
                  <div className="space-y-0.5">
                    <h3 className="font-serif font-bold text-sm text-[#14213d]">
                      {segment.section}
                    </h3>
                    <p className="text-xs text-[#14213d]/70 leading-relaxed">
                      {segment.description}
                    </p>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <span className="inline-block px-2.5 py-1 rounded bg-[#14213d]/5 text-[#14213d] font-mono text-xs font-semibold">
                      {segment.durationMinutes} mins
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Writing & Underlining Rules */}
          <section className="space-y-4">
            <h2 className="font-serif font-bold text-2xl text-[#14213d]">
              Writing & Underlining Discipline
            </h2>
            <div className="bg-[#f4f1ea] border border-[#14213d]/15 rounded-xl p-5 sm:p-6 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-900 font-semibold block mb-1">
                Examiner Evaluation Criteria
              </span>
              <ul className="space-y-2 text-xs text-[#14213d]/85">
                {subject.writingRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-teal-700 font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Important Topics with Frequency */}
          <section className="space-y-4">
            <h2 className="font-serif font-bold text-2xl text-[#14213d]">
              High-Frequency Topics & Repeating Concepts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subject.importantTopics.map((topic, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#14213d]/12 rounded-xl p-4 sm:p-5 shadow-2xs space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-serif font-bold text-sm text-[#14213d]">
                      {topic.title}
                    </h3>
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-medium ${
                        topic.frequency === 'very-high'
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-teal-50 text-teal-800 border border-teal-200'
                      }`}
                    >
                      {topic.frequency.replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-[#14213d]/75 leading-relaxed">
                    {topic.note}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Tab 2: Interactive Revision Checklist */}
      {activeTab === 'checklist' && (
        <div className="bg-white border border-[#14213d]/15 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#14213d]/10">
            <div>
              <h2 className="font-serif font-bold text-2xl text-[#14213d]">
                {subject.name} Revision Checklist
              </h2>
              <p className="text-xs text-[#14213d]/70 mt-0.5">
                Check off key conceptual competencies as you complete your syllabus revision. Saved in your browser.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs font-mono font-semibold text-[#14213d] block">
                  {checklistPercent}% Done
                </span>
                <span className="text-[11px] text-[#14213d]/60 font-mono">
                  {completedChecklistCount} of {totalChecklistCount}
                </span>
              </div>
              <div className="w-20 bg-[#14213d]/10 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-teal-700 h-full rounded-full transition-all duration-300"
                  style={{ width: `${checklistPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            {subject.revisionChecklist.map((item) => {
              const isChecked = !!checkedTasks[item.id];
              return (
                <label
                  key={item.id}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                    isChecked
                      ? 'bg-teal-50/60 border-teal-200 text-[#14213d]'
                      : 'bg-[#faf8f5] border-[#14213d]/10 hover:border-[#14213d]/20'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleTask(item.id)}
                    className="mt-0.5 rounded border-[#14213d]/30 text-teal-700 focus:ring-teal-600 w-4 h-4 cursor-pointer"
                  />
                  <div className="space-y-0.5 flex-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-teal-800 font-semibold block">
                      {item.chapterOrTopic}
                    </span>
                    <span
                      className={`text-xs block ${
                        isChecked ? 'line-through text-[#14213d]/60' : 'text-[#14213d]'
                      }`}
                    >
                      {item.text}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Past Papers */}
      {activeTab === 'papers' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-[#14213d]/10">
            <div>
              <h2 className="font-serif font-bold text-2xl text-[#14213d]">
                {subject.name} Past Papers & Specimen Sets
              </h2>
              <p className="text-xs text-[#14213d]/70">
                Official CISCE question papers and marking schemes for timed mock sessions.
              </p>
            </div>
          </div>

          {subjectPapers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subjectPapers.map((paper) => {
                const record = completedPapers[paper.id];
                const isDone = !!record;

                return (
                  <div
                    key={paper.id}
                    className="bg-white border border-[#14213d]/15 rounded-xl p-5 shadow-2xs space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#14213d]/5 text-[#14213d]">
                          {paper.year}
                        </span>
                        {isDone ? (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-100 text-teal-900 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-teal-700" />
                            <span>Solved {record.score !== undefined ? `(${record.score}/${record.maxScore})` : ''}</span>
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono text-[#14213d]/50">
                            Unpracticed
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif font-bold text-base text-[#14213d] mb-1">
                        {paper.title}
                      </h3>
                      <p className="text-xs text-[#14213d]/70 leading-relaxed mb-3">
                        {paper.notes || 'Full past examination paper under timed sitting conditions.'}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#14213d]/10 flex items-center justify-between gap-2">
                      <button
                        onClick={() => downloadPaperPdf(paper)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 text-xs font-medium transition-colors"
                        title="Download PDF directly"
                      >
                        <Download className="w-3.5 h-3.5 text-teal-700" />
                        <span>PDF</span>
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
          ) : (
            <div className="p-8 text-center bg-white rounded-xl border border-[#14213d]/10">
              <p className="text-xs text-[#14213d]/70">No papers listed for this subject yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
