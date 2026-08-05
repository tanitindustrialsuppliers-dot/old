'use client';

import React, { useState } from 'react';
import { downloadsData } from '../../lib/data/downloads';
import { Search, Download, FileText, Layers, Award, ShieldCheck } from 'lucide-react';

export const TechnicalDownloadsView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'datasheet' | 'manual' | 'cad' | 'certificate' | 'catalog'>('all');

  const filtered = downloadsData.filter((d) => {
    const matchSearch =
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.brandName.toLowerCase().includes(search.toLowerCase());
    const matchType = activeFilter === 'all' || d.type === activeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg border border-slate-800">
        <h1 className="text-3xl font-extrabold">Technical Resources & 3D CAD Center</h1>
        <p className="text-xs text-slate-300 mt-2 max-w-xl leading-relaxed">
          Download official OEM PDF datasheets, 3D STEP models, user manuals, and ISO certificates directly.
        </p>

        <div className="mt-6 max-w-md relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by part name, brand, or model..."
            className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 rounded-lg py-2.5 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        {[
          { key: 'all', label: 'All Resources' },
          { key: 'datasheet', label: 'PDF Datasheets' },
          { key: 'cad', label: '3D CAD STEP Files' },
          { key: 'manual', label: 'User Manuals' },
          { key: 'certificate', label: 'ISO Certificates' },
          { key: 'catalog', label: 'Master Catalogs' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key as any)}
            className={`px-4 py-2 rounded-lg border transition-colors shrink-0 ${
              activeFilter === tab.key
                ? 'bg-blue-700 text-white border-blue-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Downloads Table / Grid */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm divide-y divide-slate-100">
        {filtered.map((item) => (
          <div key={item.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                {item.fileType === 'STEP' ? <Layers className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                  <span className="font-semibold text-blue-700">{item.brandName}</span>
                  <span>•</span>
                  <span>Format: <strong className="text-slate-800">{item.fileType}</strong></span>
                  <span>•</span>
                  <span>Size: {item.fileSize}</span>
                </div>
              </div>
            </div>

            <a
              href={item.downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Download File</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
