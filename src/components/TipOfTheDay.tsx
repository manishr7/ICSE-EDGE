import React, { useState } from 'react';
import { Lightbulb, ArrowRight, Copy, Check, Sparkles } from 'lucide-react';
import { DAILY_TIPS } from '../data/tips.ts';
import { getDailyTipIndex } from '../utils/studyTracker.ts';

export const TipOfTheDay: React.FC = () => {
  const defaultIdx = getDailyTipIndex(DAILY_TIPS.length);
  const [currentIdx, setCurrentIdx] = useState(defaultIdx);
  const [copied, setCopied] = useState(false);

  const tip = DAILY_TIPS[currentIdx] || DAILY_TIPS[0];

  const handleNextTip = () => {
    setCurrentIdx((prev) => (prev + 1) % DAILY_TIPS.length);
  };

  const handleCopy = () => {
    const textToCopy = `${tip.title}: ${tip.summary}\n${tip.content.join('\n')}`;
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#f2efe9] border border-[#14213d]/15 rounded-xl p-5 md:p-6 shadow-xs relative overflow-hidden">
      {/* Decorative subtle ribbon */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-md bg-teal-700 text-[#faf8f5]">
            <Lightbulb className="w-4 h-4" />
          </span>
          <span className="text-xs font-mono uppercase tracking-wider font-semibold text-teal-900">
            Tip of the Day
          </span>
          <span className="text-xs text-[#14213d]/50 font-mono">
            #{currentIdx + 1} of {DAILY_TIPS.length}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className="p-1 text-[#14213d]/60 hover:text-[#14213d] hover:bg-black/5 rounded text-xs inline-flex items-center gap-1 transition-colors"
            title="Copy tip to clipboard"
            aria-label="Copy tip"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-teal-700" />
                <span className="text-[11px] text-teal-800">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-[11px] hidden sm:inline">Copy</span>
              </>
            )}
          </button>
          <button
            onClick={handleNextTip}
            className="px-2 py-1 text-xs font-medium text-teal-800 hover:text-teal-950 hover:bg-teal-100/60 rounded transition-colors inline-flex items-center gap-1"
          >
            <span>Next Tip</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <h3 className="font-serif font-bold text-lg text-[#14213d] mb-1.5">
        {tip.title}
      </h3>
      <p className="text-sm text-[#14213d]/85 mb-3 leading-relaxed">
        {tip.summary}
      </p>

      {tip.content && tip.content.length > 0 && (
        <ul className="space-y-1.5 text-xs text-[#14213d]/80 bg-[#faf8f5]/80 rounded-lg p-3 border border-[#14213d]/5">
          {tip.content.map((point, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-teal-700 font-bold mt-0.5">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
