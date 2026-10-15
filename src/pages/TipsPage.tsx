import React, { useState } from 'react';
import {
  Lightbulb,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  AlertCircle,
} from 'lucide-react';
import { DAILY_TIPS, CORE_ANSWER_RULES } from '../data/tips.ts';
import { TipOfTheDay } from '../components/TipOfTheDay.tsx';
import type { Tip } from '../types/index.ts';

interface TipsPageProps {
  onNavigate: (path: string) => void;
}

export const TipsPage: React.FC<TipsPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Combine daily tips and core rules into a searchable repository
  const allTips: Tip[] = [
    ...CORE_ANSWER_RULES,
    ...DAILY_TIPS,
  ];

  const categories = [
    { id: 'all', label: 'All Tips' },
    { id: 'hall-strategy', label: 'Hall & Reading Time' },
    { id: 'answer-presentation', label: 'Answer Presentation' },
    { id: 'underlining', label: 'Underlining & Keywords' },
    { id: 'time-management', label: 'Time Management' },
    { id: 'mistake-prevention', label: 'Mistake Prevention' },
  ];

  const filteredTips = allTips.filter((tip) => {
    if (selectedCategory !== 'all' && tip.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = tip.title.toLowerCase().includes(q);
      const matchSummary = tip.summary.toLowerCase().includes(q);
      const matchContent = tip.content.some((c) => c.toLowerCase().includes(q));
      if (!matchTitle && !matchSummary && !matchContent) return false;
    }
    return true;
  });

  return (
    <div className="space-y-10 pt-4">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-mono uppercase tracking-wider text-teal-800 font-semibold block">
          Knowledge Base · Study Edge
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#14213d] tracking-tight">
          High-Yield ICSE Study Tips
        </h1>
        <p className="text-sm sm:text-base text-[#14213d]/80 leading-relaxed font-sans">
          Proven techniques, exam-morning protocols, handwriting advice, and error-prevention habits designed specifically for the ICSE Class 10 board exam format.
        </p>
      </div>

      {/* Featured Tip of the Day */}
      <TipOfTheDay />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between border-b border-[#14213d]/10 pb-5">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#14213d] text-white font-semibold'
                  : 'bg-white text-[#14213d]/70 hover:text-[#14213d] border border-[#14213d]/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#14213d]/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search study tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#14213d]/15 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-700"
          />
        </div>
      </div>

      {/* Tips Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTips.map((tip) => (
          <div
            key={tip.id}
            className="bg-white border border-[#14213d]/12 rounded-xl p-5 shadow-2xs space-y-2.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-teal-50 text-teal-900 border border-teal-200/60 font-semibold">
                  {tip.category.replace('-', ' ')}
                </span>
                {tip.ruleNumber && (
                  <span className="text-xs font-mono font-bold text-[#14213d]">
                    {tip.ruleNumber}
                  </span>
                )}
              </div>

              <h2 className="font-serif font-bold text-base text-[#14213d] mb-1">
                {tip.title}
              </h2>
              <p className="text-xs text-[#14213d]/80 leading-relaxed mb-3">
                {tip.summary}
              </p>

              <ul className="space-y-1.5 text-xs text-[#14213d]/75 bg-[#faf8f5] p-3 rounded-lg border border-[#14213d]/5">
                {tip.content.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-teal-700 font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {tip.examinerInsight && (
              <div className="pt-2 text-[11px] text-teal-900 font-serif italic border-t border-[#14213d]/5">
                Examiner insight: {tip.examinerInsight}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
