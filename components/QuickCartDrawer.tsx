'use client';

import React from 'react';
import { useShop } from '../lib/context/ShopContext';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

interface QuickCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickCartDrawer: React.FC<QuickCartDrawerProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    formatPrice,
    setActivePage,
  } = useShop();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-250">
        {/* Drawer Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-sm">Industrial Cart ({cart.length} items)</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-slate-100">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-semibold">Your industrial cart is empty.</p>
              <p className="text-xs text-slate-400 mt-1">
                Browse our 100+ automation parts & equipment.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="pt-3 first:pt-0 flex items-start gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded border border-slate-200 shrink-0"
                />
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2">
                    {item.product.name}
                  </h4>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Part: <strong className="text-slate-700">{item.product.partNumber}</strong>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-slate-300 rounded bg-slate-50">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-200"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-200"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[10px] text-red-600 hover:underline flex items-center gap-0.5 ml-auto mt-0.5"
                      >
                        <Trash2 className="w-3 h-3" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between text-sm font-bold text-slate-900">
              <span>Subtotal:</span>
              <span className="text-base text-blue-700">{formatPrice(cartSubtotal)}</span>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 text-[11px] text-blue-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Includes ISO 9001 factory origin & full OEM warranty certificate.</span>
            </div>

            <button
              onClick={() => {
                onClose();
                setActivePage('checkout');
              }}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow transition-colors"
            >
              <span>Proceed to WooCommerce B2B Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                onClose();
                setActivePage('cart');
              }}
              className="w-full bg-white hover:bg-slate-100 text-slate-800 py-2 rounded-lg font-semibold text-xs border border-slate-300 text-center transition-colors"
            >
              View Full Cart & Quantity Discounts
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
