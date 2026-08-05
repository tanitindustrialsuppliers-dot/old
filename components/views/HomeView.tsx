'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../lib/context/LanguageContext';
import { useShop } from '../../lib/context/ShopContext';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Download,
  FileText,
  Cpu,
  Layers,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Phone,
  Send,
  Star,
  Zap,
  Building,
  Flame,
  Droplet,
  Settings,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { t } = useLanguage();
  const {
    setActivePage,
    products,
    categories,
    brands,
    navigateToProduct,
    navigateToCategory,
    navigateToBrand,
    addToCart,
    addToRfq,
    formatPrice,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'featured' | 'bestsellers' | 'new'>('featured');

  const displayedProducts = products
    .filter((p) => {
      if (activeTab === 'featured') return p.featured;
      if (activeTab === 'bestsellers') return p.bestSeller;
      return p.newArrival;
    })
    .slice(0, 8);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section with High-Impact Industrial Canvas */}
      <section className="relative bg-slate-950 text-white overflow-hidden border-b border-slate-800">
        {/* Background gradient & grid pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950/80 z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(#0056b3_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-900/60 border border-blue-500/40 text-cyan-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t('hero.badge')}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              {t('hero.title')}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {t('hero.subtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActivePage('shop')}
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-blue-700/30 transition-all hover:scale-105"
              >
                <span>{t('hero.cta_shop')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActivePage('rfq')}
                className="bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-700 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-all hover:border-cyan-400"
              >
                <Send className="w-4 h-4" />
                <span>{t('hero.cta_rfq')}</span>
              </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-cyan-400">{t('hero.stat1_val')}</div>
                <div className="text-xs text-slate-400 font-medium">{t('hero.stat1_lbl')}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">{t('hero.stat2_val')}</div>
                <div className="text-xs text-slate-400 font-medium">{t('hero.stat2_lbl')}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">{t('hero.stat3_val')}</div>
                <div className="text-xs text-slate-400 font-medium">{t('hero.stat3_lbl')}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400">{t('hero.stat4_val')}</div>
                <div className="text-xs text-slate-400 font-medium">{t('hero.stat4_lbl')}</div>
              </div>
            </div>
          </div>

          {/* Right Hero Product Card / Interactive Highlight */}
          <div className="lg:col-span-5 relative">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-transparent w-32 h-1 text-[1px]" />
              <div className="flex items-center justify-between mb-4">
                <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  Flagship Product
                </span>
                <span className="text-xs text-slate-400">Siemens S7-1200</span>
              </div>

              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80"
                alt="Featured Machinery"
                className="w-full h-56 object-cover rounded-xl border border-slate-800 mb-4 group-hover:scale-105 transition-transform duration-500"
              />

              <h3 className="text-lg font-bold text-white line-clamp-1">
                Siemens SIMATIC S7-1200 Compact CPU 1214C DC/DC/DC
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                Integrated PROFINET port, 14 DI / 10 DO / 2 AI channels with high-speed counter functions.
              </p>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">In-Stock Catalog Price</span>
                  <span className="text-xl font-extrabold text-white">$485.00</span>
                </div>
                <button
                  onClick={() => navigateToProduct('prod-001')}
                  className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                >
                  <span>View Specs</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {t('home.categories_title')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t('home.categories_subtitle')}
            </p>
          </div>
          <button
            onClick={() => setActivePage('shop')}
            className="text-blue-700 hover:text-blue-900 font-bold text-xs uppercase tracking-wider flex items-center gap-1 shrink-0"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.slice(0, 8).map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateToCategory(cat.id)}
              className="bg-white border border-slate-200 hover:border-blue-500 rounded-xl p-5 cursor-pointer shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-50 group-hover:bg-blue-700 text-blue-700 group-hover:text-white flex items-center justify-center transition-colors mb-3">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {cat.description}
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-slate-400 border-t border-slate-100 pt-2">
                <span>{cat.productCount} Products</span>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-700 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Authorized Global Brands Banner */}
      <section className="bg-slate-100 py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900">
              {t('home.brands_title')}
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              {t('home.brands_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {brands.slice(0, 8).map((b) => (
              <div
                key={b.id}
                onClick={() => navigateToBrand(b.id)}
                className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-500 hover:shadow-md transition-all group h-24"
              >
                <span className="font-black text-sm text-slate-800 group-hover:text-blue-700 transition-colors">
                  {b.name}
                </span>
                <span className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">
                  {b.country}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Tabs & Catalog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 border-b border-slate-200 pb-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Industrial Equipment Catalog
          </h2>

          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveTab('featured')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'featured' ? 'bg-blue-700 text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('home.featured_products')}
            </button>
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'bestsellers' ? 'bg-blue-700 text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('home.best_sellers')}
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'new' ? 'bg-blue-700 text-white shadow' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('home.new_arrivals')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-slate-200 hover:border-blue-500 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col group"
            >
              <div className="relative bg-slate-100 h-48 overflow-hidden cursor-pointer" onClick={() => navigateToProduct(p.id)}>
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {p.brandName}
                </div>
                {p.featured && (
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    Featured
                  </div>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] text-slate-400 font-mono mb-1">
                    MPN: <strong className="text-slate-700">{p.partNumber}</strong>
                  </div>
                  <h3
                    onClick={() => navigateToProduct(p.id)}
                    className="text-xs font-bold text-slate-900 hover:text-blue-700 cursor-pointer line-clamp-2 transition-colors"
                  >
                    {p.name}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-base font-extrabold text-slate-900">
                      {formatPrice(p.price)}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      In Stock ({p.stock})
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => addToCart(p, 1)}
                      className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-2 rounded-lg text-[11px] text-center transition-colors"
                    >
                      {t('product.add_to_cart')}
                    </button>
                    <button
                      onClick={() => addToRfq(p, 1)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 px-2 rounded-lg text-[11px] text-center border border-slate-300 transition-colors"
                    >
                      {t('product.add_to_quote')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Industries We Serve Section */}
      <section className="bg-slate-900 text-white py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest block mb-1">
                SECTOR EXPERTISE
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                {t('home.industries_title')}
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                {t('home.industries_subtitle')}
              </p>
            </div>
            <button
              onClick={() => setActivePage('industries')}
              className="bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2 self-start md:self-auto"
            >
              <span>Explore All 10 Industry Solutions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 hover:border-cyan-400 transition-all">
              <div className="w-12 h-12 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-400 flex items-center justify-center mb-4">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Metallurgy & Heavy Steel Production</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                High-temperature proportional hydraulic valves, blast furnace sensors, and robust linear actuators designed for extreme thermal stress.
              </p>
              <button
                onClick={() => setActivePage('industries')}
                className="text-cyan-400 text-xs font-bold hover:underline flex items-center gap-1"
              >
                View Steel Industry Solutions <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 hover:border-cyan-400 transition-all">
              <div className="w-12 h-12 rounded-lg bg-blue-950 border border-blue-700 text-blue-400 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Automotive Robotics & Assembly</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                High-speed pneumatic indexing tables, PROFINET robotic end-effectors, servo press drives, and Type 4 safety curtains.
              </p>
              <button
                onClick={() => setActivePage('industries')}
                className="text-cyan-400 text-xs font-bold hover:underline flex items-center gap-1"
              >
                View Automotive Line Specs <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6 hover:border-cyan-400 transition-all">
              <div className="w-12 h-12 rounded-lg bg-emerald-950 border border-emerald-700 text-emerald-400 flex items-center justify-center mb-4">
                <Droplet className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Oil & Gas / Petrochemical Plants</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                ATEX/IECEx explosion-proof solenoid valves, intrinsically safe fieldbus barriers, and corrosion-resistant 316L stainless tubing.
              </p>
              <button
                onClick={() => setActivePage('industries')}
                className="text-cyan-400 text-xs font-bold hover:underline flex items-center gap-1"
              >
                View Explosion-Proof Catalog <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 rounded-2xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-blue-700/50">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-extrabold">{t('home.newsletter_title')}</h3>
            <p className="text-xs text-blue-200 max-w-xl">
              {t('home.newsletter_desc')}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto max-w-md">
            <input
              type="email"
              placeholder={t('home.newsletter_placeholder')}
              className="bg-white/10 border border-white/20 text-white placeholder-blue-200 text-xs rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full"
            />
            <button className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-wider shrink-0 transition-colors">
              {t('home.newsletter_btn')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
