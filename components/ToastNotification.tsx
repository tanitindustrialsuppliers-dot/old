'use client';

import React from 'react';
import { useShop } from '../lib/context/ShopContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-xl shadow-2xl border flex items-start justify-between gap-3 backdrop-blur-md animate-in slide-in-from-bottom-5 duration-200 ${
            toast.type === 'success'
              ? 'bg-slate-900/95 text-white border-emerald-500/50'
              : toast.type === 'warning'
              ? 'bg-slate-900/95 text-white border-amber-500/50'
              : 'bg-slate-900/95 text-white border-blue-500/50'
          }`}
        >
          <div className="flex items-start gap-3">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
            {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />}
            <div>
              <h5 className="text-xs font-bold text-white">{toast.title}</h5>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
