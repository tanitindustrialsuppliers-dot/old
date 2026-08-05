'use client';

import React from 'react';
import { useShop } from '../../lib/context/ShopContext';
import { ArrowLeft, Globe, CheckCircle2 } from 'lucide-react';

export const BrandDetailView: React.FC = () => {
  const { brands, selectedBrandId, products, setActivePage, navigateToProduct, formatPrice } = useShop();

  const brand = brands.find((b) => b.id === selectedBrandId) || brands[0];
  const brandProducts = products.filter((p) => p.brandId === brand.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <button
        onClick={() => setActivePage('brands')}
        className="text-xs font-bold text-slate-600 hover:text-blue-700 flex items-center gap-1"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Brand Directory</span>
      </button>

      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold">{brand.name}</h1>
            <span className="bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs font-bold px-3 py-0.5 rounded-full uppercase">
              {brand.country}
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-2 max-w-2xl leading-relaxed">
            {brand.description}
          </p>
        </div>

        {brand.website && (
          <a
            href={brand.website}
            target="_blank"
            rel="noreferrer"
            className="bg-blue-700 hover:bg-blue-600 text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 shrink-0"
          >
            <Globe className="w-4 h-4" />
            <span>Official OEM Portal</span>
          </a>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          Available {brand.name} Catalog Equipment ({brandProducts.length} items)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brandProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => navigateToProduct(p.id)}
              className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-500 cursor-pointer shadow-sm hover:shadow-md transition-all"
            >
              <img src={p.image} alt={p.name} className="w-full h-36 object-cover rounded-lg mb-3" />
              <div className="text-[10px] text-slate-400 font-mono">MPN: {p.partNumber}</div>
              <h3 className="text-xs font-bold text-slate-900 line-clamp-2">{p.name}</h3>
              <div className="text-sm font-extrabold text-slate-900 mt-2">{formatPrice(p.price)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
