'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../lib/context/LanguageContext';
import { useShop } from '../../lib/context/ShopContext';
import {
  Filter,
  Grid,
  List,
  Search,
  RotateCcw,
  Star,
  FileText,
  ShoppingCart,
  CheckCircle2,
  ChevronRight,
  GitCompare,
  Heart,
  SlidersHorizontal,
} from 'lucide-react';

export const ShopView: React.FC = () => {
  const { t } = useLanguage();
  const {
    filteredProducts,
    categories,
    brands,
    filters,
    setFilters,
    resetFilters,
    formatPrice,
    addToCart,
    addToRfq,
    navigateToProduct,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
  } = useShop();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleCategoryToggle = (catId: string) => {
    setFilters((prev) => {
      const exists = prev.categoryIds.includes(catId);
      return {
        ...prev,
        categoryIds: exists
          ? prev.categoryIds.filter((id) => id !== catId)
          : [...prev.categoryIds, catId],
      };
    });
  };

  const handleBrandToggle = (brandId: string) => {
    setFilters((prev) => {
      const exists = prev.brandIds.includes(brandId);
      return {
        ...prev,
        brandIds: exists
          ? prev.brandIds.filter((id) => id !== brandId)
          : [...prev.brandIds, brandId],
      };
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Title Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Industrial Equipment & Components Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Browse genuine OEM automation, fluid power, pneumatics, and hydraulics parts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Total Filtered:</span>
          <span className="bg-blue-600 text-white font-bold text-xs px-3 py-1 rounded-full">
            {filteredProducts.length} Items
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Filter Sidebar Desktop */}
        <aside className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-6 hidden lg:block sticky top-24">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <SlidersHorizontal className="w-4 h-4 text-blue-700" />
              <span>{t('shop.filters_title')}</span>
            </div>
            <button
              onClick={resetFilters}
              className="text-xs text-blue-700 hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t('shop.clear_all')}</span>
            </button>
          </div>

          {/* Search Input Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Keyword or SKU
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
                placeholder="Search Part # or Brand..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg text-xs py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
            </div>
          </div>

          {/* Categories Accordion */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              {t('shop.category')}
            </label>
            <div className="max-h-48 overflow-y-auto space-y-1 pr-1 text-xs text-slate-700">
              {categories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-2 hover:bg-slate-50 p-1 rounded cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.categoryIds.includes(cat.id)}
                    onChange={() => handleCategoryToggle(cat.id)}
                    className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                  />
                  <span className="flex-1 line-clamp-1">{cat.name}</span>
                  <span className="text-[10px] text-slate-400">({cat.productCount})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brands Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              {t('shop.brand')}
            </label>
            <div className="max-h-48 overflow-y-auto space-y-1 pr-1 text-xs text-slate-700">
              {brands.map((b) => (
                <label
                  key={b.id}
                  className="flex items-center gap-2 hover:bg-slate-50 p-1 rounded cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.brandIds.includes(b.id)}
                    onChange={() => handleBrandToggle(b.id)}
                    className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                  />
                  <span className="flex-1 line-clamp-1">{b.name}</span>
                  <span className="text-[10px] text-slate-400">{b.country}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Max Price Range Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider">
                Max Price ($)
              </span>
              <span className="font-bold text-blue-700">${filters.maxPrice}</span>
            </div>
            <input
              type="range"
              min="50"
              max="5000"
              step="50"
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
              }
              className="w-full accent-blue-700 cursor-pointer"
            />
          </div>

          {/* Voltage Attribute Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Operating Voltage
            </label>
            <select
              value={filters.voltage || ''}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  voltage: e.target.value || undefined,
                }))
              }
              className="w-full bg-slate-50 border border-slate-300 text-xs rounded-lg p-2 text-slate-800"
            >
              <option value="">All Voltages</option>
              <option value="24V DC">24V DC</option>
              <option value="230V / 400V AC">230V / 400V AC</option>
              <option value="380-480V 3AC">380-480V 3AC</option>
            </select>
          </div>
        </aside>

        {/* Catalog Content Column */}
        <main className="lg:col-span-3 space-y-4">
          {/* Top Sort & View Mode Bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-4 shadow-sm">
            <div className="text-xs font-semibold text-slate-600">
              {t('shop.showing_results').replace('{count}', filteredProducts.length.toString())}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-slate-700">{t('shop.sort_by')}:</span>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))
                  }
                  className="bg-slate-50 border border-slate-300 rounded px-2 py-1 text-xs font-semibold focus:outline-none"
                >
                  <option value="featured">{t('shop.sort_featured')}</option>
                  <option value="price_low">{t('shop.sort_price_low')}</option>
                  <option value="price_high">{t('shop.sort_price_high')}</option>
                  <option value="rating">{t('shop.sort_rating')}</option>
                  <option value="newest">{t('shop.sort_newest')}</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-slate-100 rounded border border-slate-200 p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1 rounded ${viewMode === 'grid' ? 'bg-white shadow text-blue-700' : 'text-slate-500'}`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1 rounded ${viewMode === 'list' ? 'bg-white shadow text-blue-700' : 'text-slate-500'}`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid / List Output */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500">
              <SlidersHorizontal className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No matching industrial equipment found.</h3>
              <p className="text-xs text-slate-400 mt-1">
                Try widening your price limit or clearing active category filters.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white border border-slate-200 hover:border-blue-500 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col group relative"
                >
                  {/* Action Icons Overlay */}
                  <div className="absolute top-2 right-2 z-10 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => toggleWishlist(p.id)}
                      className={`p-1.5 rounded-full shadow border transition-colors ${
                        isInWishlist(p.id)
                          ? 'bg-red-600 text-white border-red-600'
                          : 'bg-white text-slate-700 hover:text-red-600 border-slate-200'
                      }`}
                      title="Add to Wishlist"
                    >
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleCompare(p.id)}
                      className={`p-1.5 rounded-full shadow border transition-colors ${
                        isInCompare(p.id)
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-slate-700 hover:text-blue-600 border-slate-200'
                      }`}
                      title="Compare Specs"
                    >
                      <GitCompare className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div
                    className="relative bg-slate-100 h-48 overflow-hidden cursor-pointer"
                    onClick={() => navigateToProduct(p.id)}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {p.brandName}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400 font-mono mb-1">
                        MPN: <strong className="text-slate-700">{p.partNumber}</strong>
                      </div>
                      <h3
                        onClick={() => navigateToProduct(p.id)}
                        className="text-xs font-bold text-slate-900 hover:text-blue-700 cursor-pointer line-clamp-2 transition-colors"
                      >
                        {p.name}
                      </h3>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-base font-extrabold text-slate-900">
                          {formatPrice(p.price)}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          In Stock ({p.stock})
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => addToCart(p, 1)}
                          className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-2 rounded-lg text-[11px] text-center transition-colors"
                        >
                          {t('product.add_to_cart')}
                        </button>
                        <button
                          onClick={() => addToRfq(p, 1)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 px-2 rounded-lg text-[11px] text-center border border-slate-300 transition-colors"
                        >
                          {t('product.add_to_quote')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View Layout */
            <div className="space-y-4">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white border border-slate-200 hover:border-blue-500 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-center gap-4"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    onClick={() => navigateToProduct(p.id)}
                    className="w-32 h-32 object-cover rounded-lg border border-slate-200 shrink-0 cursor-pointer"
                  />
                  <div className="flex-1 space-y-1 text-center sm:text-left">
                    <div className="flex items-center gap-2 justify-center sm:justify-start text-xs text-slate-500">
                      <span className="font-bold text-blue-700">{p.brandName}</span>
                      <span>•</span>
                      <span>MPN: <strong className="text-slate-800">{p.partNumber}</strong></span>
                      <span>•</span>
                      <span>SKU: {p.sku}</span>
                    </div>
                    <h3
                      onClick={() => navigateToProduct(p.id)}
                      className="text-sm font-bold text-slate-900 hover:text-blue-700 cursor-pointer transition-colors"
                    >
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {p.description}
                    </p>
                  </div>

                  <div className="w-full sm:w-48 text-right border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-4 shrink-0 flex flex-col justify-between">
                    <div>
                      <div className="text-lg font-extrabold text-slate-900">
                        {formatPrice(p.price)}
                      </div>
                      <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                        In Stock ({p.stock} units)
                      </div>
                    </div>

                    <div className="space-y-2 mt-3">
                      <button
                        onClick={() => addToCart(p, 1)}
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-1.5 rounded text-xs transition-colors"
                      >
                        {t('product.add_to_cart')}
                      </button>
                      <button
                        onClick={() => addToRfq(p, 1)}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-1.5 rounded text-xs border border-slate-300 transition-colors"
                      >
                        {t('product.add_to_quote')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
