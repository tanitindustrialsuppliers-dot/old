'use client';

import React from 'react';
import { industriesData } from '../../lib/data/industries';
import { useShop } from '../../lib/context/ShopContext';
import { Flame, Car, Fuel, Apple, Zap, HardHat, Droplet, Plane, Box, Building, ArrowRight, CheckCircle2 } from 'lucide-react';

export const IndustriesView: React.FC = () => {
  const { setActivePage } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg border border-slate-800">
        <h1 className="text-3xl font-extrabold">Industries We Serve</h1>
        <p className="text-xs text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Custom engineered fluid power, heavy machinery components, ATEX explosion-proof valves, and automation systems engineered specifically for severe operational environments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {industriesData.map((ind) => (
          <div key={ind.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="relative h-48 overflow-hidden">
              <img src={ind.image} alt={ind.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <h3 className="absolute bottom-4 left-4 right-4 text-lg font-bold text-white">
                {ind.title}
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed">{ind.summary}</p>

              <div>
                <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-2">Key Engineering Solutions</h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {ind.keySolutions.map((sol, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{sol}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setActivePage('shop')}
                className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Browse Recommended Industry Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
