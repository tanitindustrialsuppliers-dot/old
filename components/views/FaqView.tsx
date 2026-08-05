'use client';

import React, { useState } from 'react';
import { faqsData } from '../../lib/data/faqs';
import { Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FaqView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<string | null>(faqsData[0]?.id || null);

  const filtered = faqsData.filter((f) =>
    f.question.toLowerCase().includes(search.toLowerCase()) ||
    f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg border border-slate-800 text-center">
        <HelpCircle className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
        <h1 className="text-3xl font-extrabold">Frequently Asked Questions</h1>
        <p className="text-xs text-slate-300 mt-1 max-w-lg mx-auto">
          Find answers regarding ordering, international export shipping, ISO certifications, custom engineering, and warranty policies.
        </p>

        <div className="mt-6 max-w-md mx-auto relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 rounded-lg py-2.5 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <span>{faq.question}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-blue-700 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
              </button>

              {isOpen && (
                <div className="p-4 pt-0 text-xs text-slate-600 border-t border-slate-100 leading-relaxed bg-slate-50/50">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
