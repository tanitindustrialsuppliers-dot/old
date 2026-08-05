'use client';

import React, { useState } from 'react';
import { useShop } from '../../lib/context/ShopContext';
import { User, Building, ShieldCheck, Key, FileText, ShoppingBag, LogOut } from 'lucide-react';

export const AccountView: React.FC = () => {
  const { orders, formatPrice } = useShop();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-700 text-white font-extrabold text-xl rounded-full flex items-center justify-center border-2 border-blue-400">
            TM
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">Ing. Slim Triki (TANIT Heavy Metal S.A.)</h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Approved Corporate B2B Account | Tax ID: MF-00098765/B
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-4 py-2 rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{isLoggedIn ? 'Sign Out' : 'Sign In'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-1 text-xs font-bold">
          <div className="p-3 bg-blue-50 text-blue-800 rounded-lg flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>Corporate Account Overview</span>
          </div>
          <div className="p-3 hover:bg-slate-50 text-slate-700 rounded-lg flex items-center gap-2 cursor-pointer">
            <ShoppingBag className="w-4 h-4 text-slate-400" />
            <span>Past Orders & Invoices</span>
          </div>
          <div className="p-3 hover:bg-slate-50 text-slate-700 rounded-lg flex items-center gap-2 cursor-pointer">
            <FileText className="w-4 h-4 text-slate-400" />
            <span>RFQ Quotes Archive</span>
          </div>
          <div className="p-3 hover:bg-slate-50 text-slate-700 rounded-lg flex items-center gap-2 cursor-pointer">
            <Building className="w-4 h-4 text-slate-400" />
            <span>Plant Addresses & Tax Info</span>
          </div>
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
            Corporate Purchase Orders History
          </h3>

          <div className="space-y-3 divide-y divide-slate-100 text-xs">
            {orders.map((o) => (
              <div key={o.id} className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-slate-900 text-sm">{o.orderNumber}</div>
                  <div className="text-slate-500 text-[11px]">PO Reference: {o.poNumber} | Date: {o.createdAt}</div>
                  <div className="text-slate-400 text-[10px]">{o.items.length} line items</div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="font-extrabold text-blue-700 text-sm">{formatPrice(o.totalAmount)}</div>
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded text-[10px] inline-block mt-0.5">
                    {o.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
