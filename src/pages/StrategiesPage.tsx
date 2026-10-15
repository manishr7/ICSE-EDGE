import React, { useState } from 'react';
import { Search, ArrowRight, BookOpen, Clock, Award, CheckCircle2 } from 'lucide-react';
import { ICSE_SUBJECTS } from '../data/subjects.ts';
import type { SubjectCategory } from '../types/index.ts';

interface StrategiesPageProps {
  onNavigate: (path: string) => void;
  checkedTasks: Record<string, boolean>;
}

export const StrategiesPage: React.FC<StrategiesPageProps> = ({
  onNavigate,
  checkedTasks,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Subjects' },
    { id: 'languages', label: 'Languages' },
    { id: 'sciences', label: 'Sciences' },
    { id: 'mathematics', label: 'Mathematics' },
    { id: 'humanities', label: 'Social Studies' },
    { id: 'applied', label: 'Applied & Tech' },
  ];

  const filteredSubjects = ICSE_SUBJECTS.filter((sub) => {
    if (selectedCategory !== 'all' && sub.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = sub.name.toLowerCase().includes(q);
      const matchTag = sub.tagline.toLowerCase().includes(q);
      const matchTopics = sub.importantTopics.some((t) => t.title.toLowerCase().includes(q));
      if (!matchName && !matchTag && !matchTopics) return false;
    }
    return true;
  });

  return (
    <div className="space-y-10 pt-4">
      {/* Header */}
      <div className="max-w-2xl space-y-3">
        <span className="text-xs font-mono uppercase tracking-wider text-teal-800 font-semibold block">
          Section 01 · Subject Strategies
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#14213d] tracking-tight">
          Subject Strategy Room
        </h1>
        <p className="text-sm sm:text-base text-[#14213d]/80 leading-relaxed font-sans">
          How to prepare, key topics with highest repetition, the 3-hour hall clock division, and specific answer-sheet presentation rules for all ten ICSE Class 10 subjects.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between border-b border-[#14213d]/10 pb-5">
        {/* Category Tabs */}
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

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#14213d]/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search subject or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#14213d]/15 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-700"
          />
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSubjects.map((sub) => {
          // Calculate checklist completion for this subject
          const completedCount = sub.revisionChecklist.filter((item) => checkedTasks[item.id]).length;
          const totalTasks = sub.revisionChecklist.length;

          return (
            <div
              key={sub.id}
              className="bg-white border border-[#14213d]/12 rounded-xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200/60">
                      {sub.number}
                    </span>
                    <span className="text-xs font-mono text-[#14213d]/60">
                      {sub.paperCode}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#14213d]/70">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-teal-700" />
                      <span>{sub.duration}</span>
                    </span>
                    <span>·</span>
                    <span className="font-semibold">{sub.marks} Marks</span>
                  </div>
                </div>

                <h2 className="font-serif font-bold text-xl text-[#14213d] mb-1.5">
                  {sub.name}
                </h2>
                <p className="text-xs text-[#14213d]/80 leading-relaxed mb-4">
                  {sub.tagline}
                </p>

                {/* Blueprint snippet */}
                <div className="bg-[#faf8f5] p-3 rounded-lg border border-[#14213d]/8 text-xs space-y-1 mb-4">
                  <p className="text-[#14213d]/90 font-medium">
                    <span className="font-mono text-[11px] text-teal-800 uppercase mr-1">Section A:</span>
                    {sub.blueprint.sectionA}
                  </p>
                  <p className="text-[#14213d]/90 font-medium">
                    <span className="font-mono text-[11px] text-teal-800 uppercase mr-1">Section B:</span>
                    {sub.blueprint.sectionB}
                  </p>
                </div>

                {/* Important Topics Preview */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#14213d]/60 font-semibold block">
                    High-Frequency Recurring Topics:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {sub.importantTopics.slice(0, 3).map((topic, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded bg-[#14213d]/5 text-[#14213d]/80 font-sans"
                      >
                        {topic.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer bar */}
              <div className="pt-4 border-t border-[#14213d]/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-[#14213d]/70">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
                  <span>
                    {completedCount} of {totalTasks} checklist milestones
                  </span>
                </div>
                <button
                  onClick={() => {
                    onNavigate(`/strategies/${sub.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 hover:text-teal-950 px-3 py-1.5 rounded bg-teal-50 hover:bg-teal-100 transition-colors"
                >
                  <span>Open Full Strategy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
