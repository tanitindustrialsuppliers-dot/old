'use client';

import React from 'react';
import { useLanguage } from '../lib/context/LanguageContext';
import { useShop } from '../lib/context/ShopContext';
import {
  Layers,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
  Globe2,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { setActivePage, categories, brands, navigateToCategory, navigateToBrand } = useShop();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 transition-colors">
      {/* Top Banner: ISO & Corporate Badges */}
      <div className="bg-slate-900 border-b border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div className="text-left">
              <h5 className="text-xs font-bold text-white">ISO 9001:2025</h5>
              <p className="text-[10px] text-slate-400">Certified Quality Management</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <Award className="w-6 h-6 text-cyan-400 shrink-0" />
            <div className="text-left">
              <h5 className="text-xs font-bold text-white">100% Genuine OEM</h5>
              <p className="text-[10px] text-slate-400">Official Factory Warranties</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <Globe2 className="w-6 h-6 text-blue-400 shrink-0" />
            <div className="text-left">
              <h5 className="text-xs font-bold text-white">Global Express Logistics</h5>
              <p className="text-[10px] text-slate-400">DHL, FedEx & Sea Freight</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <CheckCircle className="w-6 h-6 text-amber-400 shrink-0" />
            <div className="text-left">
              <h5 className="text-xs font-bold text-white">24/7 B2B RFQ Response</h5>
              <p className="text-[10px] text-slate-400">Custom Engineering Quotes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Col 1: Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-slate-900 flex items-center justify-center text-white shadow border border-blue-500/30">
              <Layers className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                TANIT METAL INDUSTRY
              </span>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest -mt-1">
                INDUSTRIAL AUTOMATION & FLUID POWER
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            {t('footer.company_desc')}
          </p>

          <div className="space-y-2 pt-2 text-xs">
            <div className="flex items-start gap-2.5 text-slate-300">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>Headquarters & Plants: Egypt (Industrial Zone, Cairo) & Syria (Industrial City, Damascus/Aleppo)</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Tel: +20 1029076509 / +201017681716</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>tanitindustrialsuppliers@gmail.com</span>
            </div>
            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href="https://wa.me/201029076509?text=Hello%20TANIT%20METAL%20INDUSTRY,%20I%20have%20an%20inquiry."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg transition-colors shadow-sm"
              >
                <span>WhatsApp: +20 1029076509</span>
              </a>
              <a
                href="https://wa.me/201017681716?text=Hello%20TANIT%20METAL%20INDUSTRY,%20I%20have%20an%20inquiry."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg transition-colors shadow-sm"
              >
                <span>WhatsApp: +201017681716</span>
              </a>
            </div>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            {t('footer.quick_links')}
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActivePage('shop')} className="hover:text-cyan-400 transition-colors">
                Product Catalog
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('brands')} className="hover:text-cyan-400 transition-colors">
                Brand Directory (A-Z)
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('industries')} className="hover:text-cyan-400 transition-colors">
                Industries & Applications
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('solutions')} className="hover:text-cyan-400 transition-colors">
                Custom Engineering
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('downloads')} className="hover:text-cyan-400 transition-colors">
                3D CAD & PDF Datasheets
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('rfq')} className="hover:text-cyan-400 transition-colors">
                Submit RFQ (Request Quote)
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('order-tracking')} className="hover:text-cyan-400 transition-colors">
                Track Order & PO Status
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Top Categories */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            {t('footer.categories')}
          </h4>
          <ul className="space-y-2 text-xs">
            {categories.slice(0, 7).map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => navigateToCategory(cat.id)}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Top Brands */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            Global Partners
          </h4>
          <ul className="space-y-2 text-xs">
            {brands.slice(0, 7).map((b) => (
              <li key={b.id}>
                <button
                  onClick={() => navigateToBrand(b.id)}
                  className="hover:text-cyan-400 transition-colors text-left"
                >
                  {b.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="bg-slate-900 border-t border-slate-800 py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>{t('footer.rights')}</p>
          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => setActivePage('privacy')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => setActivePage('terms')} className="hover:text-white transition-colors">
              Terms & Conditions
            </button>
            <span>•</span>
            <button onClick={() => setActivePage('shipping')} className="hover:text-white transition-colors">
              Shipping & Export
            </button>
            <span>•</span>
            <button onClick={() => setActivePage('returns')} className="hover:text-white transition-colors">
              Return Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
