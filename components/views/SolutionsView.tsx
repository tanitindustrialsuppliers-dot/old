'use client';

import React from 'react';
import { useShop } from '../../lib/context/ShopContext';
import { Layers, Settings, Wrench, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const SolutionsView: React.FC = () => {
  const { setActivePage } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-2xl shadow-lg border border-slate-800 text-center max-w-3xl mx-auto">
        <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest">TANIT Pro-Series Engineering</span>
        <h1 className="text-3xl font-extrabold mt-1">Custom Industrial Solutions & Assembly</h1>
        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
          From 250-bar custom hydraulic power packs to IP66 stainless steel valve manifolds and PLC cabinet wiring, TANIT delivers turnkey manufacturing support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Custom Hydraulic Power Units (HPU)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Design, machining, manifold block drilling, and bench-testing of high-pressure hydraulic power packs up to 350 bar.
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Steel or Stainless Reservoirs (10L - 1000L)</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> CETOP 3 & CETOP 5 Proportional Manifolds</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Air & Water Heat Exchangers</li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold">
            <Settings className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Pneumatic Valve & FRL Assemblies</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Pre-assembled, leak-tested Festo & SMC pneumatic valve terminals integrated with IO-Link fieldbus nodes.
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> PROFINET, Modbus & EtherNet/IP Nodes</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> ATEX Zone 1/21 Explosion-Proof Options</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Push-in Stainless Fittings & Tubing</li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Wrench className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Control Panel & PLC Cabinet Wiring</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Turnkey Rittal control cabinets fitted with Siemens S7-1200 / S7-1500 PLCs, Schneider VFDs, and Phoenix Contact power units.
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Full Electrical CAD Wiring Diagrams</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> IP66 Wall-mount or Free-standing</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Factory Acceptance Testing (FAT)</li>
          </ul>
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={() => setActivePage('rfq')}
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl shadow-lg inline-flex items-center gap-2"
        >
          <span>Submit Custom Engineering Request</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
