'use client';

import React, { useState } from 'react';
import { useShop } from '../../lib/context/ShopContext';
import { useLanguage } from '../../lib/context/LanguageContext';
import {
  FileText,
  Download,
  CheckCircle2,
  ShieldCheck,
  Star,
  Send,
  ShoppingCart,
  Heart,
  GitCompare,
  ArrowLeft,
  ChevronRight,
  Layers,
  Sparkles,
  Info,
  Maximize2,
} from 'lucide-react';

export const ProductDetailView: React.FC = () => {
  const { t } = useLanguage();
  const {
    products,
    selectedProductId,
    formatPrice,
    addToCart,
    addToRfq,
    setActivePage,
    navigateToProduct,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
  } = useShop();

  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'downloads' | 'reviews'>('overview');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const currentImg = selectedGalleryImg || product.image;

  // Calculate tiered price if volume discount applies
  let activeUnitPrice = product.price;
  if (product.tieredDiscounts && product.tieredDiscounts.length > 0) {
    const match = [...product.tieredDiscounts]
      .sort((a, b) => b.minQty - a.minQty)
      .find((td) => quantity >= td.minQty);
    if (match) activeUnitPrice = match.pricePerUnit;
  }

  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back to Catalog Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActivePage('shop')}
          className="text-xs font-bold text-slate-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Product Catalog</span>
        </button>

        <div className="text-xs text-slate-400 font-medium">
          Category: <strong className="text-slate-800">{product.categoryName}</strong>
        </div>
      </div>

      {/* Main Product Spec & Media Grid */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Col: High-Res Gallery & Lightbox */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative bg-slate-100 rounded-xl border border-slate-200 overflow-hidden group">
            <img
              src={currentImg}
              alt={product.name}
              className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
              {product.brandName}
            </div>
          </div>

          {/* Thumbnails */}
          {product.gallery.length > 0 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              <img
                src={product.image}
                alt="Main"
                onClick={() => setSelectedGalleryImg(product.image)}
                className={`w-16 h-16 object-cover rounded-lg border cursor-pointer ${
                  currentImg === product.image ? 'border-blue-600 ring-2 ring-blue-600/30' : 'border-slate-200'
                }`}
              />
              {product.gallery.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumb ${idx}`}
                  onClick={() => setSelectedGalleryImg(img)}
                  className={`w-16 h-16 object-cover rounded-lg border cursor-pointer ${
                    currentImg === img ? 'border-blue-600 ring-2 ring-blue-600/30' : 'border-slate-200'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Quick Technical Downloads Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-700" />
              <span>Technical Documents & CAD Models</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {product.datasheetUrl && (
                <a
                  href={product.datasheetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white hover:bg-blue-50 text-slate-800 text-xs font-semibold py-2 px-3 rounded border border-slate-300 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-blue-700" />
                  <span>PDF Datasheet</span>
                </a>
              )}
              {product.cadUrl && (
                <a
                  href={product.cadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-900 hover:bg-slate-800 text-cyan-400 text-xs font-semibold py-2 px-3 rounded border border-slate-800 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>3D STEP CAD</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Product Title, Specs Summary & B2B Purchase Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-3 text-xs text-slate-500 mb-1">
              <span>MPN: <strong className="text-slate-900 font-mono">{product.partNumber}</strong></span>
              <span>•</span>
              <span>SKU: <span className="font-mono">{product.sku}</span></span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 leading-snug">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center text-amber-500 text-xs font-bold gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating} ({product.reviewCount} Reviews)</span>
              </div>
              <span className="text-emerald-700 bg-emerald-50 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                In Stock ({product.stock} units available)
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                {formatPrice(activeUnitPrice * quantity)}
              </span>
              {quantity > 1 && (
                <span className="text-xs text-slate-500 font-medium">
                  ({formatPrice(activeUnitPrice)} / unit)
                </span>
              )}
              {product.regularPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.regularPrice * quantity)}
                </span>
              )}
            </div>

            {/* Volume Tiered Discount Table */}
            {product.tieredDiscounts && product.tieredDiscounts.length > 0 && (
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Volume Quantity Discounts
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {product.tieredDiscounts.map((td, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded border text-center ${
                        quantity >= td.minQty
                          ? 'bg-blue-100/70 border-blue-600 font-bold text-blue-900'
                          : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className="text-[10px] text-slate-500">Qty {td.minQty}+</div>
                      <div>{formatPrice(td.pricePerUnit)}</div>
                      {td.discountPercentage > 0 && (
                        <div className="text-[10px] text-emerald-600 font-bold">-{td.discountPercentage}%</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Description Excerpt */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Key Specs Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-medium">
            {Object.entries(product.specifications).slice(0, 6).map(([key, val], idx) => (
              <div key={idx} className="bg-slate-100 p-2 rounded border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase block">{key}</span>
                <span className="text-slate-900 font-bold">{val}</span>
              </div>
            ))}
          </div>

          {/* Quantity Controls & Action Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <label className="text-xs font-bold text-slate-700 uppercase">{t('detail.quantity')}</label>
              <div className="flex items-center border border-slate-300 rounded-lg bg-slate-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-200"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 text-center bg-transparent text-sm font-bold text-slate-900 focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-200"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => addToCart(product, quantity)}
                className="bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{t('product.add_to_cart')}</span>
              </button>

              <button
                onClick={() => addToRfq(product, quantity)}
                className="bg-cyan-600 hover:bg-cyan-700 text-slate-950 py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Add to B2B Quote (RFQ)</span>
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 pt-1">
              <button
                onClick={() => toggleWishlist(product.id)}
                className="hover:text-red-600 flex items-center gap-1.5 transition-colors"
              >
                <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-red-600 text-red-600' : ''}`} />
                <span>{isInWishlist(product.id) ? 'Saved in Wishlist' : 'Save to Wishlist'}</span>
              </button>

              <button
                onClick={() => toggleCompare(product.id)}
                className="hover:text-blue-700 flex items-center gap-1.5 transition-colors"
              >
                <GitCompare className={`w-4 h-4 ${isInCompare(product.id) ? 'text-blue-600' : ''}`} />
                <span>{isInCompare(product.id) ? 'In Compare List' : 'Compare Specs'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications & Datasheets Detail */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 shadow-sm">
        <div className="flex items-center gap-4 border-b border-slate-200 pb-3 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === 'overview' ? 'border-blue-700 text-blue-700' : 'border-transparent text-slate-500'
            }`}
          >
            {t('detail.overview')}
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === 'specs' ? 'border-blue-700 text-blue-700' : 'border-transparent text-slate-500'
            }`}
          >
            {t('detail.specs')}
          </button>
          <button
            onClick={() => setActiveTab('downloads')}
            className={`pb-2 border-b-2 transition-colors ${
              activeTab === 'downloads' ? 'border-blue-700 text-blue-700' : 'border-transparent text-slate-500'
            }`}
          >
            {t('detail.downloads')}
          </button>
        </div>

        <div className="pt-6">
          {activeTab === 'overview' && (
            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <p>{product.description}</p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2">ISO 9001 Factory Quality Standard</h4>
                <p>
                  All products supplied by TANIT METAL INDUSTRY undergo 100% factory inspection for pressure seal integrity, electrical insulation resistance, and dimensional accuracy prior to export.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="divide-y divide-slate-100 text-xs">
              {Object.entries(product.specifications).map(([key, val], idx) => (
                <div key={idx} className="py-2.5 grid grid-cols-2">
                  <span className="font-bold text-slate-700">{key}</span>
                  <span className="text-slate-900">{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'downloads' && (
            <div className="space-y-3 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">{product.brandName} Technical Catalog & Manual</h4>
                  <p className="text-slate-500">Official OEM technical datasheet (PDF format)</p>
                </div>
                <a
                  href={product.datasheetUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-lg"
                >
                  Download PDF
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-extrabold text-slate-900">
            Related Category Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => navigateToProduct(p.id)}
                className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-500 cursor-pointer transition-all hover:shadow-md"
              >
                <img src={p.image} alt={p.name} className="w-full h-36 object-cover rounded-lg mb-3" />
                <div className="text-[10px] text-slate-400 font-mono">MPN: {p.partNumber}</div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{p.name}</h4>
                <div className="text-sm font-extrabold text-slate-900 mt-2">{formatPrice(p.price)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
