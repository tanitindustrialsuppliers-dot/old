'use client';

import React, { useState } from 'react';
import { useLanguage } from '../lib/context/LanguageContext';
import { useShop } from '../lib/context/ShopContext';
import {
  Menu,
  ChevronDown,
  Cpu,
  Wind,
  Droplets,
  Radio,
  Monitor,
  Zap,
  Sliders,
  ShieldCheck,
  FileDown,
  Layers,
  Flame,
  Gauge,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { t } = useLanguage();
  const { activePage, setActivePage, categories, brands, navigateToCategory, navigateToBrand } = useShop();

  const [isCategoryMegaOpen, setIsCategoryMegaOpen] = useState(false);
  const [isBrandMegaOpen, setIsBrandMegaOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white border-b border-slate-800 relative z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Mega Menu Category Trigger */}
          <div
            className="relative"
            onMouseEnter={() => setIsCategoryMegaOpen(true)}
            onMouseLeave={() => setIsCategoryMegaOpen(false)}
          >
            <button
              onClick={() => setActivePage('shop')}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-3 text-xs uppercase tracking-wider flex items-center gap-2 h-12 transition-colors"
            >
              <Menu className="w-4 h-4" />
              <span>{t('header.all_categories')}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {/* Category Mega Dropdown */}
            {isCategoryMegaOpen && (
              <div className="absolute top-full left-0 w-[720px] bg-white text-slate-900 rounded-b-xl shadow-2xl border border-slate-200 p-6 grid grid-cols-3 gap-6 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {categories.slice(0, 9).map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => {
                      navigateToCategory(cat.id);
                      setIsCategoryMegaOpen(false);
                    }}
                    className="group cursor-pointer p-2.5 rounded-lg hover:bg-blue-50 transition-colors flex items-start gap-3 border border-transparent hover:border-blue-100"
                  >
                    <div className="w-8 h-8 rounded-md bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {cat.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                        {cat.productCount} Items Available
                      </p>
                    </div>
                  </div>
                ))}
                <div
                  onClick={() => {
                    setActivePage('shop');
                    setIsCategoryMegaOpen(false);
                  }}
                  className="col-span-3 bg-slate-900 text-cyan-400 text-xs font-bold p-2.5 rounded-lg text-center cursor-pointer hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Explore All 20 Industrial Categories & Filters</span>
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>

          {/* Main Nav Links */}
          <div className="hidden lg:flex items-center gap-1 font-semibold text-xs text-slate-300">
            <button
              onClick={() => setActivePage('home')}
              className={`px-3 py-3 hover:text-white hover:bg-slate-800 rounded transition-colors ${
                activePage === 'home' ? 'text-cyan-400 bg-slate-800/80 font-bold' : ''
              }`}
            >
              {t('nav.home')}
            </button>

            <button
              onClick={() => setActivePage('shop')}
              className={`px-3 py-3 hover:text-white hover:bg-slate-800 rounded transition-colors ${
                activePage === 'shop' ? 'text-cyan-400 bg-slate-800/80 font-bold' : ''
              }`}
            >
              {t('nav.shop')}
            </button>

            {/* Brands Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsBrandMegaOpen(true)}
              onMouseLeave={() => setIsBrandMegaOpen(false)}
            >
              <button
                onClick={() => setActivePage('brands')}
                className={`px-3 py-3 hover:text-white hover:bg-slate-800 rounded transition-colors flex items-center gap-1 ${
                  activePage === 'brands' ? 'text-cyan-400 bg-slate-800/80 font-bold' : ''
                }`}
              >
                <span>{t('nav.brands')}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isBrandMegaOpen && (
                <div className="absolute top-full left-0 w-80 bg-white text-slate-900 rounded-b-xl shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-1">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
                    Authorized OEMs
                  </div>
                  <div className="space-y-1">
                    {brands.slice(0, 8).map((brand) => (
                      <div
                        key={brand.id}
                        onClick={() => {
                          navigateToBrand(brand.id);
                          setIsBrandMegaOpen(false);
                        }}
                        className="px-2 py-1.5 hover:bg-blue-50 text-xs font-semibold text-slate-800 hover:text-blue-700 rounded cursor-pointer transition-colors flex items-center justify-between"
                      >
                        <span>{brand.name}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                          {brand.country}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setActivePage('brands');
                      setIsBrandMegaOpen(false);
                    }}
                    className="mt-3 w-full bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold py-1.5 rounded transition-colors text-center"
                  >
                    View All 25 Brands (A-Z)
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setActivePage('industries')}
              className={`px-3 py-3 hover:text-white hover:bg-slate-800 rounded transition-colors ${
                activePage === 'industries' ? 'text-cyan-400 bg-slate-800/80 font-bold' : ''
              }`}
            >
              {t('nav.industries')}
            </button>

            <button
              onClick={() => setActivePage('solutions')}
              className={`px-3 py-3 hover:text-white hover:bg-slate-800 rounded transition-colors ${
                activePage === 'solutions' ? 'text-cyan-400 bg-slate-800/80 font-bold' : ''
              }`}
            >
              {t('nav.solutions')}
            </button>

            <button
              onClick={() => setActivePage('downloads')}
              className={`px-3 py-3 hover:text-white hover:bg-slate-800 rounded transition-colors flex items-center gap-1 ${
                activePage === 'downloads' ? 'text-cyan-400 bg-slate-800/80 font-bold' : ''
              }`}
            >
              <FileDown className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t('nav.downloads')}</span>
            </button>

            <button
              onClick={() => setActivePage('blog')}
              className={`px-3 py-3 hover:text-white hover:bg-slate-800 rounded transition-colors ${
                activePage === 'blog' ? 'text-cyan-400 bg-slate-800/80 font-bold' : ''
              }`}
            >
              {t('nav.blog')}
            </button>

            <button
              onClick={() => setActivePage('about')}
              className={`px-3 py-3 hover:text-white hover:bg-slate-800 rounded transition-colors ${
                activePage === 'about' ? 'text-cyan-400 bg-slate-800/80 font-bold' : ''
              }`}
            >
              {t('nav.about')}
            </button>

            <button
              onClick={() => setActivePage('contact')}
              className={`px-3 py-3 hover:text-white hover:bg-slate-800 rounded transition-colors ${
                activePage === 'contact' ? 'text-cyan-400 bg-slate-800/80 font-bold' : ''
              }`}
            >
              {t('nav.contact')}
            </button>
          </div>

          {/* PageSpeed & Order Tracking */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActivePage('order-tracking')}
              className="text-xs font-semibold text-slate-300 hover:text-cyan-400 px-2 py-1 transition-colors"
            >
              {t('nav.order_tracking')}
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => setActivePage('pagespeed')}
              className="bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded flex items-center gap-1 transition-colors"
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>PageSpeed 99</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
