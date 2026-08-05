'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useLanguage } from '../lib/context/LanguageContext';
import { useShop } from '../lib/context/ShopContext';
import {
  Search,
  ShoppingCart,
  Heart,
  GitCompare,
  FileText,
  User,
  Settings,
  X,
  ChevronRight,
  Sparkles,
  Layers,
  ArrowRight,
  Building,
  Box,
  Globe,
  Tag,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { Brand, Product, Category } from '../lib/types';

interface HeaderProps {
  onOpenCartDrawer: () => void;
  onOpenRfqDrawer: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCartDrawer, onOpenRfqDrawer }) => {
  const { t } = useLanguage();
  const {
    setActivePage,
    filters,
    setFilters,
    cartTotalCount,
    wishlist,
    compareList,
    rfqItems,
    products,
    brands,
    categories,
    navigateToProduct,
    navigateToBrand,
    navigateToCategory,
    formatPrice,
  } = useShop();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  // Close search preview when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const query = filters.searchQuery.trim().toLowerCase();

  // 1. Real-time Brand Matches
  const matchingBrands = useMemo(() => {
    if (!query) return [];
    return brands
      .filter((b) => {
        const nameMatch = b.name.toLowerCase().includes(query);
        const countryMatch = b.country?.toLowerCase().includes(query);
        const descMatch = b.description?.toLowerCase().includes(query);
        return nameMatch || countryMatch || descMatch;
      })
      .slice(0, 4);
  }, [brands, query]);

  // 2. Real-time Product Matches
  const matchingProducts = useMemo(() => {
    if (!query) return [];
    return products
      .filter((p) => {
        const nameMatch = p.name.toLowerCase().includes(query);
        const skuMatch = p.sku.toLowerCase().includes(query);
        const mpnMatch = p.partNumber.toLowerCase().includes(query);
        const brandMatch = p.brandName.toLowerCase().includes(query);
        const categoryMatch = p.categoryName?.toLowerCase().includes(query);
        const descMatch = p.description?.toLowerCase().includes(query);
        return nameMatch || skuMatch || mpnMatch || brandMatch || categoryMatch || descMatch;
      })
      .slice(0, 6);
  }, [products, query]);

  // 3. Real-time Category Matches
  const matchingCategories = useMemo(() => {
    if (!query) return [];
    return categories
      .filter((c) => {
        const nameMatch = c.name.toLowerCase().includes(query);
        const descMatch = c.description?.toLowerCase().includes(query);
        return nameMatch || descMatch;
      })
      .slice(0, 3);
  }, [categories, query]);

  // Flatten suggestions for keyboard arrow key navigation
  const flatSuggestions = useMemo(() => {
    const list: Array<
      | { type: 'brand'; data: Brand }
      | { type: 'product'; data: Product }
      | { type: 'category'; data: Category }
    > = [];

    matchingBrands.forEach((b) => list.push({ type: 'brand', data: b }));
    matchingProducts.forEach((p) => list.push({ type: 'product', data: p }));
    matchingCategories.forEach((c) => list.push({ type: 'category', data: c }));

    return list;
  }, [matchingBrands, matchingProducts, matchingCategories]);

  // Reset keyboard selection when query changes
  useEffect(() => {
    setSelectedIndex(-1);
  }, [filters.searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, searchQuery: e.target.value }));
    setIsSearchFocused(true);
  };

  const executeSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIndex >= 0 && selectedIndex < flatSuggestions.length) {
      handleSelectSuggestion(flatSuggestions[selectedIndex]);
      return;
    }
    setIsSearchFocused(false);
    setIsMobileSearchOpen(false);
    setActivePage('shop');
  };

  const handleSelectSuggestion = (
    suggestion:
      | { type: 'brand'; data: Brand }
      | { type: 'product'; data: Product }
      | { type: 'category'; data: Category }
  ) => {
    setIsSearchFocused(false);
    setIsMobileSearchOpen(false);

    if (suggestion.type === 'brand') {
      navigateToBrand(suggestion.data.id);
    } else if (suggestion.type === 'product') {
      navigateToProduct(suggestion.data.id);
    } else if (suggestion.type === 'category') {
      navigateToCategory(suggestion.data.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isSearchFocused || flatSuggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < flatSuggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : flatSuggestions.length - 1));
    } else if (e.key === 'Escape') {
      setIsSearchFocused(false);
      setIsMobileSearchOpen(false);
    }
  };

  const totalResultsCount = matchingBrands.length + matchingProducts.length + matchingCategories.length;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => setActivePage('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-700 via-blue-900 to-slate-900 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform border border-blue-600/30">
            <Layers className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                TANIT
              </span>
              <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                METAL
              </span>
            </div>
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest -mt-1">
              INDUSTRY & AUTOMATION
            </p>
          </div>
        </div>

        {/* Desktop Real-Time Autocomplete Search Bar */}
        <div ref={searchRef} className="relative flex-1 max-w-2xl hidden md:block">
          <form onSubmit={executeSearchSubmit} className="relative">
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={filters.searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onKeyDown={handleKeyDown}
                placeholder={t('header.search_placeholder') || 'Search Siemens, Festo, valves, solenoids, MPN...'}
                className="w-full bg-slate-50 text-slate-800 pl-4 pr-12 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm transition-all shadow-inner"
              />
              {filters.searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, searchQuery: '' }));
                    setIsSearchFocused(true);
                  }}
                  className="absolute right-12 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200 transition-colors"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1.5 bg-blue-700 hover:bg-blue-800 text-white p-2 rounded-md transition-colors"
                title="Execute search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Real-Time Autocomplete Suggestions Dropdown Popup */}
          {isSearchFocused && filters.searchQuery.trim() !== '' && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[85vh] flex flex-col">
              {/* Autocomplete Status Bar Header */}
              <div className="p-3 bg-slate-900 text-white flex items-center justify-between text-xs font-semibold shrink-0">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span>Real-Time Suggestions</span>
                  {totalResultsCount > 0 && (
                    <span className="bg-blue-800 text-cyan-300 px-2 py-0.5 rounded-full text-[10px] font-bold">
                      {totalResultsCount} Matches
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    setActivePage('shop');
                    setIsSearchFocused(false);
                  }}
                  className="text-cyan-300 hover:text-white flex items-center gap-1 font-bold transition-colors"
                >
                  <span>View All in Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Suggestions Container */}
              <div className="overflow-y-auto divide-y divide-slate-100 flex-1">
                {/* 1. MATCHING BRANDS SECTION */}
                {matchingBrands.length > 0 && (
                  <div className="p-3 bg-blue-50/40">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-blue-700" />
                        Brands & Manufacturers ({matchingBrands.length})
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">Click to open brand catalog</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {matchingBrands.map((brand) => {
                        const itemIdx = flatSuggestions.findIndex(
                          (item) => item.type === 'brand' && item.data.id === brand.id
                        );
                        const isSelected = selectedIndex === itemIdx;

                        return (
                          <div
                            key={brand.id}
                            onClick={() => handleSelectSuggestion({ type: 'brand', data: brand })}
                            className={`p-2.5 rounded-xl border cursor-pointer flex items-center justify-between gap-3 transition-all ${
                              isSelected
                                ? 'bg-blue-100/90 border-blue-500 ring-2 ring-blue-500/30'
                                : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50/80 shadow-sm'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center p-1 shrink-0">
                                <img
                                  src={brand.logo}
                                  alt={brand.name}
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    // Fallback to text monogram if image fails
                                    (e.target as HTMLElement).style.display = 'none';
                                  }}
                                />
                                <span className="text-xs font-black text-slate-700 hidden">
                                  {brand.name.substring(0, 2)}
                                </span>
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-xs font-bold text-slate-900 truncate flex items-center gap-1.5">
                                  <span>{brand.name}</span>
                                  {brand.country && (
                                    <span className="bg-slate-100 text-slate-600 text-[9px] font-bold px-1.5 py-0.2 rounded border border-slate-200">
                                      {brand.country}
                                    </span>
                                  )}
                                </h4>
                                <p className="text-[10px] text-slate-500 truncate mt-0.5">
                                  {brand.description}
                                </p>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-blue-600 shrink-0" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. MATCHING PRODUCTS SECTION */}
                {matchingProducts.length > 0 && (
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                        <Box className="w-3.5 h-3.5 text-blue-700" />
                        Equipment & Spare Parts ({matchingProducts.length})
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">Direct Part & SKU Suggestions</span>
                    </div>

                    <div className="space-y-1.5">
                      {matchingProducts.map((product) => {
                        const itemIdx = flatSuggestions.findIndex(
                          (item) => item.type === 'product' && item.data.id === product.id
                        );
                        const isSelected = selectedIndex === itemIdx;

                        return (
                          <div
                            key={product.id}
                            onClick={() => handleSelectSuggestion({ type: 'product', data: product })}
                            className={`p-2.5 rounded-xl cursor-pointer flex items-center justify-between gap-3 transition-all ${
                              isSelected
                                ? 'bg-blue-100/90 border border-blue-500 ring-2 ring-blue-500/30'
                                : 'hover:bg-slate-50 border border-transparent hover:border-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg border border-slate-200 shrink-0 bg-white"
                              />
                              <div className="min-w-0">
                                <h4 className="text-xs font-bold text-slate-900 truncate">
                                  {product.name}
                                </h4>
                                <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5 flex-wrap">
                                  <span className="bg-slate-100 text-slate-700 font-mono font-bold px-1.5 py-0.2 rounded border border-slate-200">
                                    MPN: {product.partNumber}
                                  </span>
                                  <span className="text-blue-700 font-extrabold">{product.brandName}</span>
                                  {product.categoryName && (
                                    <>
                                      <span>•</span>
                                      <span className="text-slate-400">{product.categoryName}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <span className="text-xs font-black text-slate-900 block">
                                {formatPrice(product.price)}
                              </span>
                              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-bold mt-0.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                In Stock
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. MATCHING CATEGORIES SECTION */}
                {matchingCategories.length > 0 && (
                  <div className="p-3 bg-slate-50/60">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-2">
                      <Tag className="w-3.5 h-3.5 text-cyan-600" />
                      Product Categories ({matchingCategories.length})
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {matchingCategories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleSelectSuggestion({ type: 'category', data: cat })}
                          className="bg-white hover:bg-blue-600 hover:text-white border border-slate-200 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
                        >
                          <span>{cat.name}</span>
                          <span className="text-[10px] opacity-75 font-normal">({cat.productCount} items)</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* NO RESULTS STATE */}
                {totalResultsCount === 0 && (
                  <div className="p-6 text-center space-y-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                      <Search className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        No direct matches found for "{filters.searchQuery}"
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                        Try searching by OEM brand name (e.g., <strong>Siemens</strong>, <strong>Festo</strong>, <strong>SMC</strong>, <strong>Parker</strong>), or exact part numbers.
                      </p>
                    </div>

                    {/* Popular Brand Suggestions */}
                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Explore Stocked Manufacturers
                      </span>
                      <div className="flex flex-wrap items-center justify-center gap-1.5">
                        {brands.slice(0, 6).map((b) => (
                          <button
                            key={b.id}
                            onClick={() => {
                              navigateToBrand(b.id);
                              setIsSearchFocused(false);
                            }}
                            className="bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-bold px-2.5 py-1 rounded-md border border-slate-200 transition-colors"
                          >
                            {b.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Search Form Submit Trigger */}
              <div
                onClick={() => {
                  setActivePage('shop');
                  setIsSearchFocused(false);
                }}
                className="p-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold text-center flex items-center justify-center gap-2 cursor-pointer transition-colors shrink-0"
              >
                <span>Search catalog for "{filters.searchQuery}"</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
          )}
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Toggle Trigger */}
          <button
            onClick={() => {
              setIsMobileSearchOpen(!isMobileSearchOpen);
              setTimeout(() => mobileInputRef.current?.focus(), 100);
            }}
            className="p-2 text-slate-700 hover:text-blue-700 hover:bg-slate-100 rounded-lg md:hidden transition-colors"
            title="Search Equipment"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* RFQ Drawer Action */}
          <button
            onClick={onOpenRfqDrawer}
            className="relative bg-slate-100 hover:bg-slate-200 text-slate-800 p-2 sm:px-3 sm:py-2 rounded-lg flex items-center gap-1.5 transition-colors border border-slate-200"
            title="Request for Quote Drawer"
          >
            <FileText className="w-4 h-4 text-blue-700" />
            <span className="text-xs font-bold hidden xl:inline">RFQ List</span>
            {rfqItems.length > 0 && (
              <span className="bg-cyan-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {rfqItems.length}
              </span>
            )}
          </button>

          {/* Wishlist */}
          <button
            onClick={() => setActivePage('wishlist')}
            className="relative p-2 text-slate-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title={t('header.wishlist')}
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Compare */}
          <button
            onClick={() => setActivePage('compare')}
            className="relative p-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title={t('header.compare')}
          >
            <GitCompare className="w-5 h-5" />
            {compareList.length > 0 && (
              <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {compareList.length}
              </span>
            )}
          </button>

          {/* Cart Drawer Action */}
          <button
            onClick={onOpenCartDrawer}
            className="relative bg-blue-700 hover:bg-blue-800 text-white px-3.5 py-2 rounded-lg flex items-center gap-2 transition-all shadow-sm"
          >
            <ShoppingCart className="w-5 h-5" />
            <div className="text-left hidden sm:block leading-none">
              <span className="block text-[10px] text-blue-200 uppercase font-medium">{t('header.cart')}</span>
              <span className="text-xs font-bold">{cartTotalCount} items</span>
            </div>
            {cartTotalCount > 0 && (
              <span className="bg-cyan-400 text-slate-900 text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center sm:hidden">
                {cartTotalCount}
              </span>
            )}
          </button>

          {/* Account */}
          <button
            onClick={() => setActivePage('account')}
            className="p-2 text-slate-700 hover:text-blue-700 hover:bg-slate-100 rounded-lg transition-colors"
            title={t('header.account')}
          >
            <User className="w-5 h-5" />
          </button>

          {/* WordPress Admin Switcher */}
          <button
            onClick={() => setActivePage('admin')}
            className="bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow"
            title={t('header.admin_mode')}
          >
            <Settings className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
            <span className="hidden lg:inline">{t('header.admin_mode')}</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Overlay Modal */}
      {isMobileSearchOpen && (
        <div
          ref={mobileSearchRef}
          className="md:hidden bg-slate-900/95 backdrop-blur-md p-4 fixed inset-x-0 top-0 z-50 shadow-2xl space-y-3"
        >
          <div className="flex items-center justify-between gap-2 text-white">
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Real-Time Autocomplete Search
            </span>
            <button
              onClick={() => setIsMobileSearchOpen(false)}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={executeSearchSubmit} className="relative">
            <input
              ref={mobileInputRef}
              type="text"
              value={filters.searchQuery}
              onChange={handleSearchChange}
              placeholder="Search Festo, Siemens, valves, MPN..."
              className="w-full bg-slate-800 text-white placeholder-slate-400 pl-4 pr-10 py-3 rounded-xl border border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bg-blue-600 text-white p-1.5 rounded-lg"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Mobile Autocomplete Results */}
          {filters.searchQuery.trim() !== '' && (
            <div className="bg-white rounded-xl max-h-[70vh] overflow-y-auto divide-y divide-slate-100 text-slate-900">
              {matchingBrands.length > 0 && (
                <div className="p-3 bg-blue-50/50">
                  <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider block mb-2">
                    Brands ({matchingBrands.length})
                  </span>
                  <div className="space-y-1.5">
                    {matchingBrands.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => handleSelectSuggestion({ type: 'brand', data: b })}
                        className="p-2 bg-white rounded-lg border border-slate-200 flex items-center justify-between text-xs font-bold text-slate-900"
                      >
                        <span>{b.name}</span>
                        <ChevronRight className="w-4 h-4 text-blue-600" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchingProducts.length > 0 && (
                <div className="p-3">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    Equipment ({matchingProducts.length})
                  </span>
                  <div className="space-y-2">
                    {matchingProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleSelectSuggestion({ type: 'product', data: p })}
                        className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 border border-slate-100"
                      >
                        <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded border" />
                        <div className="min-w-0 flex-1">
                          <h5 className="text-xs font-bold text-slate-900 truncate">{p.name}</h5>
                          <span className="text-[10px] text-blue-700 font-mono font-bold block">{p.partNumber}</span>
                        </div>
                        <span className="text-xs font-black text-slate-900">{formatPrice(p.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div
                onClick={() => {
                  setActivePage('shop');
                  setIsMobileSearchOpen(false);
                }}
                className="p-3 bg-blue-700 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5"
              >
                <span>View all results in Shop</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

