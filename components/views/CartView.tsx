'use client';

import React from 'react';
import { useShop } from '../../lib/context/ShopContext';
import { useLanguage } from '../../lib/context/LanguageContext';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

export const CartView: React.FC = () => {
  const { t } = useLanguage();
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    formatPrice,
    setActivePage,
    clearCart,
  } = useShop();

  const shippingFee = cartSubtotal > 1000 ? 0 : 75;
  const tax = cartSubtotal * 0.19; // 19% VAT / Commercial Tax
  const grandTotal = cartSubtotal + shippingFee + tax;

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto" />
        <h1 className="text-2xl font-extrabold text-slate-900">Your Industrial Cart is Empty</h1>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Explore our catalog of over 100+ automation, fluid power, and pneumatic equipment.
        </p>
        <button
          onClick={() => setActivePage('shop')}
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-6 py-3 rounded-lg shadow transition-colors inline-flex items-center gap-2"
        >
          <span>Explore Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Shopping Cart ({cart.length} Products)
        </h1>
        <button
          onClick={clearCart}
          className="text-xs text-red-600 font-semibold hover:underline flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items Table */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm divide-y divide-slate-100">
          {cart.map((item) => (
            <div key={item.product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg border border-slate-200 shrink-0"
                />
                <div>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded uppercase">
                    {item.product.brandName}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 mt-1 line-clamp-2">
                    {item.product.name}
                  </h3>
                  <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
                    Part Number: <strong className="text-slate-800">{item.product.partNumber}</strong>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="flex items-center border border-slate-300 rounded-lg bg-slate-50">
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                    className="px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-200"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-bold text-slate-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                    className="px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-200"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <div className="text-sm font-extrabold text-slate-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-[10px] text-red-600 hover:underline mt-0.5 block ml-auto"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4 bg-slate-900 text-white rounded-2xl p-6 shadow-xl space-y-4 border border-slate-800">
          <h3 className="text-base font-bold border-b border-slate-800 pb-3">Commercial Order Summary</h3>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Catalog Subtotal:</span>
              <span className="font-bold text-white">{formatPrice(cartSubtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Commercial VAT / Tax (19%):</span>
              <span className="font-bold text-white">{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between">
              <span>Freight Shipping:</span>
              <span className="font-bold text-emerald-400">
                {shippingFee === 0 ? 'FREE Freight' : formatPrice(shippingFee)}
              </span>
            </div>
            <div className="pt-3 border-t border-slate-800 flex justify-between text-base font-extrabold text-white">
              <span>Estimated Total:</span>
              <span className="text-cyan-400">{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 text-[11px] text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Corporate B2B Terms Supported</span>
            </div>
            <p className="text-slate-400">
              Select Purchase Order (PO Net 30/60) or SWIFT Wire Transfer during checkout.
            </p>
          </div>

          <button
            onClick={() => setActivePage('checkout')}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors"
          >
            <span>Proceed to B2B Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
