'use client';

import React from 'react';
import { useShop } from '../lib/context/ShopContext';
import { X, Trash2, FileText, ArrowRight, Send } from 'lucide-react';

interface QuickRfqDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickRfqDrawer: React.FC<QuickRfqDrawerProps> = ({ isOpen, onClose }) => {
  const { rfqItems, removeFromRfq, setActivePage } = useShop();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250">
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-sm">RFQ Quote List ({rfqItems.length} items)</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-100">
          {rfqItems.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-semibold">No items added to your RFQ drawer.</p>
              <p className="text-xs text-slate-400 mt-1">
                Click "Add to RFQ" on any product to request a bulk written quote.
              </p>
            </div>
          ) : (
            rfqItems.map((item) => (
              <div key={item.product.id} className="pt-3 first:pt-0 flex items-start gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-14 h-14 object-cover rounded border border-slate-200 shrink-0"
                />
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2">
                    {item.product.name}
                  </h4>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Part Number: <strong className="text-slate-700">{item.product.partNumber}</strong>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-semibold text-slate-700">
                      Qty: {item.quantity} units
                    </span>
                    <button
                      onClick={() => removeFromRfq(item.product.id)}
                      className="text-[10px] text-red-600 hover:underline flex items-center gap-0.5"
                    >
                      <Trash2 className="w-3 h-3" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {rfqItems.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
            <button
              onClick={() => {
                onClose();
                setActivePage('rfq');
              }}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Submit Formal B2B RFQ Form</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
