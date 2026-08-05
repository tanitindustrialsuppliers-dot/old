'use client';

import React from 'react';
import { useShop } from '../../lib/context/ShopContext';
import { Heart, Trash2, ShoppingCart, Send, ArrowRight } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { wishlist, products, toggleWishlist, addToCart, addToRfq, formatPrice, setActivePage, navigateToProduct } = useShop();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  if (savedProducts.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <Heart className="w-16 h-16 text-slate-300 mx-auto" />
        <h1 className="text-2xl font-extrabold text-slate-900">Your Saved Equipment Wishlist is Empty</h1>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Save components and spare parts while browsing our catalog to generate custom project BOMs later.
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-slate-900">Saved Equipment Wishlist ({savedProducts.length})</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {savedProducts.map((p) => (
          <div key={p.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="p-4 space-y-3">
              <img
                src={p.image}
                alt={p.name}
                onClick={() => navigateToProduct(p.id)}
                className="w-full h-40 object-cover rounded-lg cursor-pointer"
              />
              <div className="text-[10px] text-slate-400 font-mono">MPN: {p.partNumber}</div>
              <h3
                onClick={() => navigateToProduct(p.id)}
                className="text-xs font-bold text-slate-900 hover:text-blue-700 cursor-pointer line-clamp-2"
              >
                {p.name}
              </h3>
              <div className="text-sm font-extrabold text-slate-900">{formatPrice(p.price)}</div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-2">
              <button
                onClick={() => addToCart(p, 1)}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={() => toggleWishlist(p.id)}
                className="w-full bg-white hover:bg-slate-100 text-red-600 font-bold py-1.5 rounded text-xs border border-slate-300 transition-colors flex items-center justify-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove from Wishlist</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
