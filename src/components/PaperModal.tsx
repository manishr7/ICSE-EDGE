import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Printer,
  CheckCircle,
  ShieldCheck,
  Clock,
  Award,
  FileText,
  BookOpen,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { QuestionPaper } from '../types/index.ts';
import type { StoredPaperRecord } from '../utils/studyTracker.ts';
import { downloadPaperPdf } from '../utils/pdfGenerator.ts';

interface PaperModalProps {
  paper: QuestionPaper | null;
  storedRecord?: StoredPaperRecord;
  isOpen: boolean;
  onClose: () => void;
  onSaveRecord: (paperId: string, record: StoredPaperRecord | null) => void;
}

export const PaperModal: React.FC<PaperModalProps> = ({
  paper,
  storedRecord,
  isOpen,
  onClose,
  onSaveRecord,
}) => {
  const [activeTab, setActiveTab] = useState<'read' | 'marking' | 'log'>('read');
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState<string>('');
  const [maxScore, setMaxScore] = useState<number>(80);
  const [timeTaken, setTimeTaken] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (paper) {
      setMaxScore(paper.maxMarks || 80);
      if (storedRecord) {
        setIsCompleted(true);
        setScore(storedRecord.score !== undefined ? String(storedRecord.score) : '');
        setMaxScore(storedRecord.maxScore || paper.maxMarks || 80);
        setTimeTaken(storedRecord.timeTakenMinutes !== undefined ? String(storedRecord.timeTakenMinutes) : '');
        setNotes(storedRecord.notes || '');
      } else {
        setIsCompleted(false);
        setScore('');
        setTimeTaken('');
        setNotes('');
      }
    }
  }, [paper, storedRecord]);

  if (!isOpen || !paper) return null;

  const handleDownload = () => {
    try {
      setDownloading(true);
      downloadPaperPdf(paper);
      setTimeout(() => setDownloading(false), 800);
    } catch (e) {
      console.error('Error generating PDF:', e);
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCompleted) {
      onSaveRecord(paper.id, null);
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 700);
      return;
    }

    const numScore = score.trim() !== '' ? Number(score) : undefined;
    const numTime = timeTaken.trim() !== '' ? Number(timeTaken) : undefined;

    const record: StoredPaperRecord = {
      completedAt: storedRecord?.completedAt || new Date().toISOString().split('T')[0],
      score: numScore,
      maxScore: maxScore,
      timeTakenMinutes: numTime,
      notes: notes.trim() || undefined,
    };

    onSaveRecord(paper.id, record);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 700);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="paper-modal-title"
    >
      <div className="bg-[#faf8f5] border border-[#14213d]/20 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#14213d]/10 flex items-start justify-between gap-4 bg-[#faf8f5] shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-teal-100 text-teal-900 font-semibold">
                {paper.subjectName}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#14213d]/10 text-[#14213d]">
                Year {paper.year}
              </span>
              {paper.hasMarkingScheme && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-medium">
                  Marking Scheme Included
                </span>
              )}
            </div>
            <h2 id="paper-modal-title" className="font-serif font-bold text-xl sm:text-2xl text-[#14213d]">
              {paper.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#14213d]/60 hover:text-[#14213d] hover:bg-black/5"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Action Buttons Bar */}
        <div className="bg-white px-5 py-3 border-b border-[#14213d]/10 flex flex-wrap items-center justify-between gap-2.5 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-medium text-xs transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloading ? 'Generating PDF...' : 'Download PDF (.pdf)'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#faf8f5] hover:bg-[#14213d]/5 text-[#14213d] border border-[#14213d]/15 rounded-lg text-xs font-medium transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-teal-800" />
              <span>Print Paper</span>
            </button>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1 bg-[#faf8f5] p-1 rounded-lg border border-[#14213d]/10 text-xs">
            <button
              onClick={() => setActiveTab('read')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                activeTab === 'read'
                  ? 'bg-[#14213d] text-white'
                  : 'text-[#14213d]/70 hover:text-[#14213d]'
              }`}
            >
              Question Paper
            </button>
            <button
              onClick={() => setActiveTab('marking')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                activeTab === 'marking'
                  ? 'bg-[#14213d] text-white'
                  : 'text-[#14213d]/70 hover:text-[#14213d]'
              }`}
            >
              Marking Scheme
            </button>
            <button
              onClick={() => setActiveTab('log')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                activeTab === 'log'
                  ? 'bg-[#14213d] text-white'
                  : 'text-[#14213d]/70 hover:text-[#14213d]'
              }`}
            >
              Log Mock Score
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: READ QUESTION PAPER */}
          {activeTab === 'read' && (
            <div className="space-y-6">
              {/* Paper metadata overview */}
              <div className="bg-white border border-[#14213d]/10 rounded-xl p-4 sm:p-5 shadow-2xs space-y-3">
                <div className="text-center space-y-1 pb-3 border-b border-[#14213d]/10">
                  <p className="text-[11px] font-mono uppercase text-[#14213d]/60 tracking-wider">
                    Council for the Indian School Certificate Examinations, New Delhi
                  </p>
                  <h3 className="font-serif font-bold text-lg text-[#14213d]">
                    {paper.subjectName.toUpperCase()}
                  </h3>
                  <div className="flex items-center justify-center gap-4 text-xs font-mono text-[#14213d]/75">
                    <span>Time Allowed: <strong>{paper.duration}</strong></span>
                    <span>·</span>
                    <span>Maximum Marks: <strong>{paper.maxMarks}</strong></span>
                  </div>
                </div>

                {/* Instructions block */}
                <div className="bg-[#faf8f5] p-3.5 rounded-lg border border-[#14213d]/8 text-xs text-[#14213d]/80 space-y-1.5 italic">
                  <span className="font-mono font-bold not-italic text-teal-800 uppercase block text-[10px]">
                    Instructions to Candidates:
                  </span>
                  <ul className="space-y-1 pl-4 list-disc text-[11px]">
                    <li>Answers to this Paper must be written on the paper provided separately.</li>
                    <li>You will not be allowed to write during the first 15 minutes. This time is to be spent in reading the question paper.</li>
                    <li>The time given at the head of this Paper is the time allowed for writing the answers.</li>
                    <li>Section A is compulsory. Attempt any four questions from Section B.</li>
                    <li>The intended marks for questions or parts of questions are given in brackets [ ].</li>
                  </ul>
                </div>
              </div>

              {/* Structured Sections and Questions */}
              {paper.sections && paper.sections.length > 0 ? (
                <div className="space-y-6">
                  {paper.sections.map((section, sIdx) => (
                    <div key={sIdx} className="space-y-4">
                      <div className="border-b-2 border-teal-800 pb-1.5">
                        <h4 className="font-serif font-bold text-lg text-teal-900">
                          {section.name}
                        </h4>
                        <p className="text-xs text-[#14213d]/70 italic">
                          ({section.instruction})
                        </p>
                      </div>

                      <div className="space-y-4">
                        {section.questions.map((q, qIdx) => (
                          <div
                            key={qIdx}
                            className="bg-white border border-[#14213d]/10 rounded-xl p-4 sm:p-5 shadow-2xs space-y-3"
                          >
                            <div className="flex items-center justify-between border-b border-[#14213d]/8 pb-2">
                              <span className="font-serif font-bold text-sm text-[#14213d]">
                                {q.questionNumber}
                              </span>
                              {q.marks && (
                                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-900 border border-teal-200">
                                  [{q.marks} Marks]
                                </span>
                              )}
                            </div>

                            {q.instruction && (
                              <p className="text-xs font-medium text-[#14213d]/85">
                                {q.instruction}
                              </p>
                            )}

                            {q.subQuestions && q.subQuestions.length > 0 && (
                              <div className="space-y-2.5 pt-1">
                                {q.subQuestions.map((sub, subIdx) => (
                                  <div
                                    key={subIdx}
                                    className="p-2.5 rounded-lg bg-[#faf8f5] border border-[#14213d]/5 text-xs space-y-1.5"
                                  >
                                    <div className="flex items-start justify-between gap-2">
                                      <p className="text-[#14213d]/90 leading-relaxed font-sans">
                                        <strong className="font-mono text-teal-900 mr-1.5">
                                          {sub.subNumber}
                                        </strong>
                                        {sub.text}
                                      </p>
                                      <span className="font-mono text-[11px] font-bold text-teal-900 shrink-0">
                                        [{sub.marks}]
                                      </span>
                                    </div>

                                    {sub.options && (
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-4 pt-1 font-sans text-[11px] text-[#14213d]/80">
                                        {sub.options.map((opt, oIdx) => (
                                          <div key={oIdx} className="p-1 rounded bg-white border border-[#14213d]/10">
                                            {opt}
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Fallback blueprint preview */
                <div className="bg-white border border-[#14213d]/10 rounded-xl p-5 shadow-2xs space-y-4">
                  <h4 className="font-serif font-bold text-base text-[#14213d]">
                    Full Paper Architecture
                  </h4>
                  <p className="text-xs text-[#14213d]/80 leading-relaxed">
                    This official past examination paper is pre-formatted for direct practice and offline revision. Click the <strong>Download PDF (.pdf)</strong> button above to download the complete multi-page document formatted to CISCE standards.
                  </p>
                  <div className="p-3 bg-teal-50/60 rounded-lg border border-teal-200/80 text-xs text-teal-950 space-y-1">
                    <p className="font-semibold">Paper Breakdown:</p>
                    <p>• <strong>Section A (40 Marks):</strong> Compulsory objective MCQs, conceptual definitions, and short problems.</p>
                    <p>• <strong>Section B (40 Marks):</strong> Attempt any four 10-mark multi-part structured questions.</p>
                  </div>
                </div>
              )}

              {/* Direct CISCE Specimen Portal notice */}
              <div className="p-4 bg-[#f4f1ea] rounded-xl border border-[#14213d]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#14213d]/70">
                <span>Verified educational archive · Generated directly on device</span>
                <a
                  href="https://cisce.org/examinations/icse/specimen-question-papers/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-800 hover:underline font-medium inline-flex items-center gap-1"
                >
                  CISCE Official Specimen Portal <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: MARKING SCHEME & RUBRICS */}
          {activeTab === 'marking' && (
            <div className="space-y-4">
              <div className="bg-white border border-[#14213d]/10 rounded-xl p-5 shadow-2xs space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-800 font-semibold block">
                  Official CISCE Evaluation Criteria
                </span>
                <h3 className="font-serif font-bold text-lg text-[#14213d]">
                  Step-by-Step Marking Rules
                </h3>
                <p className="text-xs text-[#14213d]/80 leading-relaxed">
                  Council evaluators follow strict marking keys. Use this guide to grade your own timed mock tests accurately.
                </p>

                <div className="space-y-2.5 pt-2">
                  {(paper.markingSchemeSummary || [
                    'Step-marking: Every correct formula or setup earns 1 mark, even if the final calculation is incorrect.',
                    'Units penalty: A correct final answer without appropriate physical units (e.g. cm², Joules, Ω, ₹) loses 1 mark.',
                    'Keywords: Underlined technical terms corresponding to council rubrics are awarded immediate marks.',
                    'Diagrams: Must be drawn in sharp pencil with directional arrows (Physics light rays/circuits) or label lines (Biology).',
                    'Multiple choices: In Section A MCQs, both the option letter (a/b/c/d) and option text must be written.',
                  ]).map((point, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-[#faf8f5] border border-[#14213d]/8 text-xs text-[#14213d]/85 flex items-start gap-2.5"
                    >
                      <CheckCircle className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LOG MOCK TEST */}
          {activeTab === 'log' && (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="bg-white border border-[#14213d]/10 rounded-xl p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#14213d]/10">
                  <span className="font-serif font-bold text-base text-[#14213d]">
                    Record Your Mock Sitting
                  </span>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isCompleted}
                      onChange={(e) => setIsCompleted(e.target.checked)}
                      className="rounded border-[#14213d]/30 text-teal-700 focus:ring-teal-600 w-4 h-4"
                    />
                    <span className="text-xs font-semibold text-[#14213d]">
                      Mark as Solved / Practiced
                    </span>
                  </label>
                </div>

                {isCompleted ? (
                  <div className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[#14213d]/70 mb-1">
                          Marks Scored
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            max={maxScore}
                            step="0.5"
                            placeholder="e.g. 74"
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/20 bg-[#faf8f5] focus:outline-none focus:ring-2 focus:ring-teal-700"
                          />
                          <span className="text-xs font-mono text-[#14213d]/60 whitespace-nowrap">
                            / {maxScore}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-[#14213d]/70 mb-1">
                          Time Taken (Minutes)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="300"
                          placeholder="e.g. 115"
                          value={timeTaken}
                          onChange={(e) => setTimeTaken(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/20 bg-[#faf8f5] focus:outline-none focus:ring-2 focus:ring-teal-700"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[#14213d]/70 mb-1">
                        Revision Notes & Careless Errors Log
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Lost 3 marks in question 4(b) due to forgetting the unit. Need to review trigonometric identities."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-[#14213d]/20 bg-[#faf8f5] focus:outline-none focus:ring-2 focus:ring-teal-700 resize-none"
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-[#14213d]/60 italic py-2">
                    Check the box above once you have sat this paper under timed conditions to record your score in the offline tracker.
                  </p>
                )}

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#14213d] hover:bg-teal-800 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    {savedSuccess ? 'Saved to Tracker!' : 'Save Progress'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 border-t border-[#14213d]/10 bg-[#f4f1ea] flex items-center justify-between text-xs text-[#14213d]/70 shrink-0">
          <span className="truncate">Council for the Indian School Certificate Examinations</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-medium text-[#14213d] hover:bg-black/5 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
