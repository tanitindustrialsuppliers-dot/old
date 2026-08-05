'use client';

import React, { useState } from 'react';
import { useShop } from '../../lib/context/ShopContext';
import { Search, Globe, ChevronRight } from 'lucide-react';

export const BrandsView: React.FC = () => {
  const { brands, navigateToBrand } = useShop();
  const [search, setSearch] = useState('');

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const filteredBrands = brands.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg border border-slate-800">
        <h1 className="text-3xl font-extrabold">Authorized Global Brand Directory (A-Z)</h1>
        <p className="text-xs text-slate-300 mt-1 max-w-xl">
          TANIT METAL INDUSTRY is an official partner and stocking distributor for world-renowned automation, fluid power, and heavy equipment manufacturers.
        </p>

        <div className="mt-6 max-w-md relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search brand by name or country..."
            className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 rounded-lg py-2.5 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBrands.map((b) => (
          <div
            key={b.id}
            onClick={() => navigateToBrand(b.id)}
            className="bg-white border border-slate-200 hover:border-blue-600 rounded-xl p-5 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-extrabold text-lg text-slate-900 group-hover:text-blue-700 transition-colors">
                  {b.name}
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded uppercase">
                  {b.country}
                </span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                {b.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700 group-hover:translate-x-1 transition-transform">
              <span>View Product Line</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
