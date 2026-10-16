import React from 'react';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  BookOpen,
  Printer,
  ShieldCheck,
} from 'lucide-react';
import { CORE_ANSWER_RULES, UNDERLINE_GUIDELINES } from '../data/tips.ts';

interface HowToWritePageProps {
  onNavigate: (path: string) => void;
}

export const HowToWritePage: React.FC<HowToWritePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 pt-4">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-mono uppercase tracking-wider text-teal-800 font-semibold block">
          Answer Sheet Mastery
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#14213d] tracking-tight">
          How to Write Your ICSE Paper
        </h1>
        <p className="text-sm sm:text-base text-[#14213d]/80 leading-relaxed font-sans">
          These seven presentation and layout rules apply to every theory subject in the ICSE Class 10 examination. They are worth more than any last-week revision, because they transform what the examiner sees in the ninety seconds spent on your booklet.
        </p>
      </div>

      {/* The 7 Golden Rules */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#14213d]/10 pb-3">
          <h2 className="font-serif font-bold text-2xl text-[#14213d]">
            The 7 Non-Negotiable Presentation Rules
          </h2>
          <span className="text-xs font-mono text-[#14213d]/60">
            Applicable across all 10 subjects
          </span>
        </div>

        <div className="space-y-4">
          {CORE_ANSWER_RULES.map((rule) => (
            <article
              key={rule.id}
              className="bg-white border border-[#14213d]/12 rounded-xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#14213d]/8 pb-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#14213d] text-white">
                    {rule.ruleNumber}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-[#14213d]">
                    {rule.title}
                  </h3>
                </div>
                <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-teal-50 text-teal-900 border border-teal-200/60 self-start sm:self-auto">
                  {rule.category.replace('-', ' ')}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-medium text-[#14213d]/90 leading-relaxed">
                {rule.summary}
              </p>

              <ul className="space-y-1.5 text-xs text-[#14213d]/80 pt-1">
                {rule.content.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-teal-700 font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>

              {rule.examinerInsight && (
                <div className="mt-3 p-3 rounded-lg bg-[#faf8f5] border border-teal-600/15 flex items-start gap-2.5 text-xs text-[#14213d]/85">
                  <Sparkles className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-teal-900 font-serif">Examiner Psychology:</strong>{' '}
                    {rule.examinerInsight}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      {/* What to Underline Table */}
      <div className="space-y-4">
        <div className="border-b border-[#14213d]/10 pb-3">
          <h2 className="font-serif font-bold text-2xl text-[#14213d]">
            What to Underline — Quick Subject Reference
          </h2>
          <p className="text-xs text-[#14213d]/70 mt-1">
            Always underline in the same dark blue or black ink you write with. Highlighters and coloured sketch pens are strictly disallowed by CISCE.
          </p>
        </div>

        <div className="bg-white border border-[#14213d]/15 rounded-xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f4f1ea] border-b border-[#14213d]/10 text-[11px] font-mono uppercase text-[#14213d]/70">
                <tr>
                  <th className="py-3 px-4 font-semibold w-1/4">Subject Group</th>
                  <th className="py-3 px-4 font-semibold w-1/2">Items to Underline</th>
                  <th className="py-3 px-4 font-semibold w-1/4">Mistake to Avoid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#14213d]/10">
                {UNDERLINE_GUIDELINES.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#faf8f5] transition-colors">
                    <td className="py-3 px-4 font-serif font-bold text-[#14213d]">
                      {item.subject}
                    </td>
                    <td className="py-3 px-4 text-[#14213d]/85 leading-relaxed">
                      {item.itemsToUnderline}
                    </td>
                    <td className="py-3 px-4 text-amber-900/80 leading-relaxed font-mono text-[11px]">
                      {item.avoidRule}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Callout action to Subject Strategies */}
      <div className="bg-[#f2efe9] border border-[#14213d]/15 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif font-bold text-lg text-[#14213d] mb-1">
            Now Apply These Rules Subject by Subject
          </h3>
          <p className="text-xs text-[#14213d]/75">
            Every subject has unique blueprints, marking breakdowns, and clock distributions.
          </p>
        </div>
        <a
          href="/strategies"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/strategies');
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#14213d] hover:bg-teal-800 text-white text-xs font-semibold rounded-lg transition-colors shrink-0"
        >
          <span>Open Subject Strategies</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
