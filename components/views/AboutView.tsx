'use client';

import React from 'react';
import { Layers, Award, ShieldCheck, Globe, CheckCircle2, Building, Users } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <div className="bg-slate-900 text-white p-8 sm:p-12 rounded-2xl shadow-lg border border-slate-800 text-center max-w-3xl mx-auto">
        <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest">ABOUT US</span>
        <h1 className="text-3xl font-extrabold mt-1">TANIT METAL INDUSTRY</h1>
        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
          Premier manufacturer, authorized distributor, and solutions integrator for heavy metallurgy, industrial automation, fluid power, and precision hydraulic systems since 1998.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm text-center">
          <ShieldCheck className="w-10 h-10 text-blue-700 mx-auto" />
          <h3 className="font-bold text-slate-900 text-base">ISO 9001:2025 Certified</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every valve, pump, and sensor undergoes strict factory pressure calibration and insulation testing before dispatch.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm text-center">
          <Award className="w-10 h-10 text-cyan-600 mx-auto" />
          <h3 className="font-bold text-slate-900 text-base">Official OEM Partnerships</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Authorized distributor for Siemens, Festo, Rexroth Bosch, Parker Hannifin, SMC, Danfoss, and Schneider Electric.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm text-center">
          <Globe className="w-10 h-10 text-emerald-600 mx-auto" />
          <h3 className="font-bold text-slate-900 text-base">Regional Hubs (Egypt & Syria)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            State-of-the-art metal fabrication and warehouse facilities in Egypt (Cairo & Alexandria) and Syria (Damascus & Aleppo), serving heavy industries across the Middle East and Africa.
          </p>
          <div className="pt-2 text-[11px] font-bold text-slate-700">
            Tel: +20 1029076509 / +201017681716
          </div>
        </div>
      </div>
    </div>
  );
};
