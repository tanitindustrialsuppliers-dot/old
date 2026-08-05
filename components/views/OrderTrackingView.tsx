'use client';

import React, { useState } from 'react';
import { useShop } from '../../lib/context/ShopContext';
import { Search, Package, CheckCircle2, Clock, Truck, ShieldCheck } from 'lucide-react';

export const OrderTrackingView: React.FC = () => {
  const { orders, formatPrice } = useShop();
  const [searchNum, setSearchNum] = useState('');
  const [foundOrder, setFoundOrder] = useState<any | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const match = orders.find(
      (o) =>
        o.orderNumber.toLowerCase() === searchNum.trim().toLowerCase() ||
        (o.poNumber && o.poNumber.toLowerCase() === searchNum.trim().toLowerCase())
    );
    setFoundOrder(match || null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg border border-slate-800 text-center">
        <Package className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
        <h1 className="text-3xl font-extrabold">B2B Order & PO Shipment Tracker</h1>
        <p className="text-xs text-slate-300 mt-1 max-w-lg mx-auto">
          Track warehouse processing, factory testing, customs clearance, and DHL/FedEx air freight tracking numbers.
        </p>

        <form onSubmit={handleSearch} className="mt-6 max-w-md mx-auto flex gap-2">
          <input
            type="text"
            required
            value={searchNum}
            onChange={(e) => setSearchNum(e.target.value)}
            placeholder="Enter Order # (e.g. TMI-PO-100201) or PO #"
            className="flex-1 bg-slate-800 border border-slate-700 text-white placeholder-slate-400 rounded-lg py-2.5 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Search className="w-4 h-4" />
            <span>Track Order</span>
          </button>
        </form>
      </div>

      {/* Result Display */}
      {hasSearched && (
        foundOrder ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Order #{foundOrder.orderNumber}
                </h3>
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  PO Reference: <strong>{foundOrder.poNumber}</strong> | Date: {foundOrder.createdAt}
                </div>
              </div>
              <span className="bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold px-3 py-1 rounded-full self-start sm:self-auto">
                Status: {foundOrder.status}
              </span>
            </div>

            {/* Shipment Progress Bar */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs pt-2">
              <div className="space-y-1">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto font-bold">1</div>
                <div className="font-bold text-slate-900 text-[11px]">PO Verified</div>
              </div>
              <div className="space-y-1">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto font-bold">2</div>
                <div className="font-bold text-slate-900 text-[11px]">Factory QA Test</div>
              </div>
              <div className="space-y-1">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto font-bold animate-pulse">3</div>
                <div className="font-bold text-blue-700 text-[11px]">Dispatched (Transit)</div>
              </div>
              <div className="space-y-1">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto font-bold">4</div>
                <div className="font-bold text-slate-400 text-[11px]">Delivered to Site</div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl text-xs space-y-2 border border-slate-200">
              <div className="flex justify-between"><span>Company:</span> <strong className="text-slate-900">{foundOrder.companyName}</strong></div>
              <div className="flex justify-between"><span>Shipping Address:</span> <strong className="text-slate-900">{foundOrder.shippingAddress}</strong></div>
              <div className="flex justify-between"><span>Total Amount:</span> <strong className="text-blue-700">{formatPrice(foundOrder.totalAmount)}</strong></div>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
            <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="font-bold text-slate-800 text-sm">No Order Found</h3>
            <p className="text-xs text-slate-400 mt-1">
              Please double-check the Order Reference # or Purchase Order number entered. Try demo order: <strong className="text-slate-800 font-mono">TMI-PO-100201</strong>
            </p>
          </div>
        )
      )}

      {/* Demo Orders List */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
        <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
          Recent Corporate Orders Log
        </h3>
        <div className="space-y-2 text-xs">
          {orders.map((o) => (
            <div
              key={o.id}
              onClick={() => {
                setSearchNum(o.orderNumber);
                setFoundOrder(o);
                setHasSearched(true);
              }}
              className="p-3 rounded-lg border border-slate-200 hover:border-blue-600 cursor-pointer flex items-center justify-between transition-colors"
            >
              <div>
                <span className="font-bold text-slate-900">{o.orderNumber}</span>
                <span className="text-slate-500 ml-2 font-mono">({o.poNumber})</span>
                <div className="text-[11px] text-slate-400">{o.companyName}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-700">{formatPrice(o.totalAmount)}</div>
                <div className="text-[10px] text-emerald-600 font-semibold">{o.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
