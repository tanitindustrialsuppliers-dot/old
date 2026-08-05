'use client';

import React, { useState } from 'react';
import { useShop } from '../../lib/context/ShopContext';
import {
  Layers,
  ShoppingBag,
  FileText,
  Settings,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  LayoutDashboard,
  Box,
  TrendingUp,
  Award,
  Sparkles,
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const { products, orders, quoteRequests, formatPrice } = useShop();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'quotes' | 'elementor' | 'seo'>('overview');

  const [newProdName, setNewProdName] = useState('');
  const [newProdMpn, setNewProdMpn] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('350');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* WordPress Top Admin Bar Simulation */}
      <div className="bg-slate-900 text-white p-4 rounded-xl shadow border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-extrabold text-white text-sm">
            WP
          </div>
          <div>
            <h1 className="text-sm font-bold">WordPress 6.7 + WooCommerce B2B Admin Panel</h1>
            <p className="text-[10px] text-slate-400">TANIT METAL INDUSTRY Site Management Suite</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
          <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-0.5 rounded-full text-[10px]">
            Elementor Pro Active
          </span>
          <span className="bg-blue-950 text-cyan-400 border border-blue-800 px-2.5 py-0.5 rounded-full text-[10px]">
            Rank Math SEO 100/100
          </span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        {[
          { key: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
          { key: 'products', label: 'WooCommerce Products (' + products.length + ')', icon: Box },
          { key: 'orders', label: 'B2B PO Orders (' + orders.length + ')', icon: ShoppingBag },
          { key: 'quotes', label: 'RFQ Quotes (' + quoteRequests.length + ')', icon: FileText },
          { key: 'elementor', label: 'Elementor Pro Builder', icon: Layers },
          { key: 'seo', label: 'SEO & Schema Audit', icon: TrendingUp },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2.5 rounded-xl border flex items-center gap-1.5 transition-colors shrink-0 ${
                activeTab === tab.key
                  ? 'bg-blue-700 text-white border-blue-700 shadow'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dashboard Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Total Catalog Items</span>
              <div className="text-2xl font-black text-slate-900 mt-1">{products.length} Products</div>
            </div>
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Commercial PO Orders</span>
              <div className="text-2xl font-black text-blue-700 mt-1">{orders.length} Active</div>
            </div>
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Pending RFQ Quotes</span>
              <div className="text-2xl font-black text-cyan-600 mt-1">{quoteRequests.length} Submitted</div>
            </div>
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">PageSpeed Performance</span>
              <div className="text-2xl font-black text-emerald-600 mt-1">99 / 100</div>
            </div>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Manage WooCommerce Equipment Catalog
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold">
                  <th className="p-2.5">Image</th>
                  <th className="p-2.5">Product Name</th>
                  <th className="p-2.5">MPN / SKU</th>
                  <th className="p-2.5">Brand</th>
                  <th className="p-2.5">Price</th>
                  <th className="p-2.5">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.slice(0, 10).map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-2.5">
                      <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded border border-slate-200" />
                    </td>
                    <td className="p-2.5 font-bold text-slate-900 line-clamp-1">{p.name}</td>
                    <td className="p-2.5 font-mono text-slate-600">{p.partNumber}</td>
                    <td className="p-2.5 text-blue-700 font-semibold">{p.brandName}</td>
                    <td className="p-2.5 font-bold text-slate-900">{formatPrice(p.price)}</td>
                    <td className="p-2.5 text-emerald-600 font-semibold">{p.stock} units</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
            WooCommerce B2B Orders & Purchase Orders
          </h3>
          <div className="space-y-3 divide-y divide-slate-100 text-xs">
            {orders.map((o) => (
              <div key={o.id} className="pt-3 first:pt-0 flex justify-between items-center">
                <div>
                  <div className="font-bold text-slate-900">{o.orderNumber} ({o.poNumber})</div>
                  <div className="text-slate-500">{o.companyName} - {o.customerName}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-700">{formatPrice(o.totalAmount)}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">{o.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
