'use client';

import React from 'react';
import { useShop } from '../../lib/context/ShopContext';
import { GitCompare, Trash2, ShoppingCart, Send, ArrowRight } from 'lucide-react';

export const CompareView: React.FC = () => {
  const { compareList, products, toggleCompare, addToCart, addToRfq, formatPrice, setActivePage } = useShop();

  const comparedProducts = products.filter((p) => compareList.includes(p.id));

  if (comparedProducts.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <GitCompare className="w-16 h-16 text-slate-300 mx-auto" />
        <h1 className="text-2xl font-extrabold text-slate-900">No Equipment Selected for Specification Comparison</h1>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Click the compare icon on any product card in our shop to compare technical features side-by-side.
        </p>
        <button
          onClick={() => setActivePage('shop')}
          className="bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors inline-flex items-center gap-2"
        >
          <span>Browse Product Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // Collect all unique specification keys
  const allSpecKeys = Array.from(
    new Set(comparedProducts.flatMap((p) => Object.keys(p.specifications)))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Side-by-Side Technical Comparison ({comparedProducts.length} Items)
        </h1>
      </div>

      <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl shadow-sm">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white divide-x divide-slate-800">
              <th className="p-4 w-48 shrink-0 font-bold uppercase tracking-wider text-[11px]">Feature / Spec</th>
              {comparedProducts.map((p) => (
                <th key={p.id} className="p-4 min-w-[220px] align-top">
                  <div className="space-y-2">
                    <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded border border-slate-800" />
                    <div className="text-[10px] text-cyan-400 font-mono">MPN: {p.partNumber}</div>
                    <div className="font-bold line-clamp-2 text-white">{p.name}</div>
                    <div className="text-base font-extrabold text-white">{formatPrice(p.price)}</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(p, 1)}
                        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-1.5 rounded text-[10px] uppercase"
                      >
                        Buy
                      </button>
                      <button
                        onClick={() => toggleCompare(p.id)}
                        className="bg-slate-800 hover:bg-slate-700 text-red-400 p-1.5 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-800">
            <tr className="divide-x divide-slate-100 bg-slate-50">
              <td className="p-3 font-bold text-slate-900">Brand / OEM</td>
              {comparedProducts.map((p) => (
                <td key={p.id} className="p-3 font-semibold text-blue-700">{p.brandName}</td>
              ))}
            </tr>
            <tr className="divide-x divide-slate-100">
              <td className="p-3 font-bold text-slate-900">Stock Availability</td>
              {comparedProducts.map((p) => (
                <td key={p.id} className="p-3 font-semibold text-emerald-600">{p.stock} units</td>
              ))}
            </tr>
            {allSpecKeys.map((key, idx) => (
              <tr key={idx} className="divide-x divide-slate-100 hover:bg-slate-50 transition-colors">
                <td className="p-3 font-bold text-slate-700 bg-slate-50/50">{key}</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3">
                    {p.specifications[key] || '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
