'use client';

import React from 'react';
import { useLanguage } from '../lib/context/LanguageContext';
import { useShop, Currency } from '../lib/context/ShopContext';
import { Phone, FileText, Send, Globe, DollarSign, ShieldCheck } from 'lucide-react';

export const TopBar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { currency, setCurrency, setActivePage } = useShop();

  return (
    <div className="bg-slate-900 text-slate-300 text-xs py-1.5 border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Tagline & Hotline */}
        <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
          <div className="flex items-center gap-1.5 font-medium text-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t('topbar.tagline')}</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-slate-400 border-l border-slate-700 pl-4 rtl:border-r rtl:border-l-0 rtl:pr-4 rtl:pl-0">
            <Phone className="w-3.5 h-3.5 text-blue-400" />
            <span>{t('topbar.hotline')}: <strong className="text-white">+20 1029076509 / +201017681716</strong></span>
          </div>
        </div>

        {/* Right: Quick Links, Language & Currency */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
          <button
            onClick={() => setActivePage('downloads')}
            className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('topbar.cad_center')}</span>
          </button>

          <button
            onClick={() => setActivePage('rfq')}
            className="flex items-center gap-1 text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t('topbar.rfq')}</span>
          </button>

          {/* Currency Switcher */}
          <div className="flex items-center gap-1 bg-slate-800 rounded px-2 py-0.5 border border-slate-700">
            <DollarSign className="w-3 h-3 text-slate-400" />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="bg-transparent text-slate-200 text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="USD" className="bg-slate-900 text-white">USD ($)</option>
              <option value="EUR" className="bg-slate-900 text-white">EUR (€)</option>
              <option value="TND" className="bg-slate-900 text-white">TND (د.ت)</option>
              <option value="AED" className="bg-slate-900 text-white">AED (د.إ)</option>
            </select>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 bg-blue-950/80 rounded px-2 py-0.5 border border-blue-800/60">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="font-bold text-blue-300 hover:text-white transition-colors uppercase tracking-wider text-xs"
            >
              {language === 'en' ? 'العربية (AR)' : 'English (EN)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
