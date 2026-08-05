'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  Brand,
  CartItem,
  QuoteItem,
  QuoteRequest,
  Order,
  ActivePage,
  DownloadResource,
  BlogPost,
} from '../types';
import { allProducts } from '../data/products';
import { categoriesData } from '../data/categories';
import { brandsData } from '../data/brands';
import { downloadsData } from '../data/downloads';
import { blogPostsData } from '../data/blog';

export type Currency = 'USD' | 'EUR' | 'TND' | 'AED';

interface ShopFilterState {
  searchQuery: string;
  categoryIds: string[];
  brandIds: string[];
  stockStatuses: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  voltage?: string;
  pressure?: string;
  threadSize?: string;
  material?: string;
  sortBy: 'featured' | 'price_low' | 'price_high' | 'rating' | 'newest';
}

interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface ShopContextType {
  // Navigation & Page State
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedBrandId: string | null;
  setSelectedBrandId: (id: string | null) => void;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string | null) => void;
  selectedBlogId: string | null;
  setSelectedBlogId: (id: string | null) => void;
  navigateToProduct: (productId: string) => void;
  navigateToBrand: (brandId: string) => void;
  navigateToCategory: (categoryId: string) => void;

  // Products & Categories & Brands Data
  products: Product[];
  categories: Category[];
  brands: Brand[];
  downloads: DownloadResource[];
  blogPosts: BlogPost[];
  
  // Admin Data Actions (WordPress simulation)
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Category) => void;
  addBrand: (brand: Brand) => void;

  // Currency
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceInUSD: number) => string;

  // Cart Management
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTotalCount: number;

  // Wishlist & Compare
  wishlist: string[]; // Product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  compareList: string[]; // Product IDs (max 4)
  toggleCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;

  // Request For Quote (RFQ)
  rfqItems: QuoteItem[];
  addToRfq: (product: Product, quantity?: number) => void;
  removeFromRfq: (productId: string) => void;
  clearRfq: () => void;
  quoteRequests: QuoteRequest[];
  submitQuoteRequest: (data: Omit<QuoteRequest, 'id' | 'quoteNumber' | 'createdAt' | 'status'>) => void;
  updateQuoteStatus: (id: string, status: QuoteRequest['status']) => void;

  // Orders
  orders: Order[];
  placeOrder: (orderData: Partial<Order> & { customerName: string; email: string; items: any[]; subtotal: number; totalAmount: number; shippingAddress: string }) => Order;
  updateOrderStatus: (id: string, status: Order['status']) => void;

  // Search & Filter State
  filters: ShopFilterState;
  setFilters: React.Dispatch<React.SetStateAction<ShopFilterState>>;
  resetFilters: () => void;
  filteredProducts: Product[];

  // Toast System
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const currencyRates: Record<Currency, { symbol: string; rate: number; position: 'before' | 'after' }> = {
  USD: { symbol: '$', rate: 1.0, position: 'before' },
  EUR: { symbol: '€', rate: 0.92, position: 'before' },
  TND: { symbol: ' د.ت', rate: 3.12, position: 'after' },
  AED: { symbol: ' د.إ', rate: 3.67, position: 'after' },
};

const initialFilterState: ShopFilterState = {
  searchQuery: '',
  categoryIds: [],
  brandIds: [],
  stockStatuses: [],
  minPrice: 0,
  maxPrice: 5000,
  minRating: 0,
  sortBy: 'featured',
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  // Core Store Data
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [categories, setCategories] = useState<Category[]>(categoriesData);
  const [brands, setBrands] = useState<Brand[]>(brandsData);
  const [downloads] = useState<DownloadResource[]>(downloadsData);
  const [blogPosts] = useState<BlogPost[]>(blogPostsData);

  // User Commerce State
  const [currency, setCurrency] = useState<Currency>('USD');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [rfqItems, setRfqItems] = useState<QuoteItem[]>([]);
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Search & Filters
  const [filters, setFilters] = useState<ShopFilterState>(initialFilterState);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedProds = localStorage.getItem('tanit_products');
      if (savedProds) setProducts(JSON.parse(savedProds));

      const savedCart = localStorage.getItem('tanit_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWish = localStorage.getItem('tanit_wishlist');
      if (savedWish) setWishlist(JSON.parse(savedWish));

      const savedCompare = localStorage.getItem('tanit_compare');
      if (savedCompare) setCompareList(JSON.parse(savedCompare));

      const savedRfq = localStorage.getItem('tanit_rfq');
      if (savedRfq) setRfqItems(JSON.parse(savedRfq));

      const savedQuotes = localStorage.getItem('tanit_quote_requests');
      if (savedQuotes) setQuoteRequests(JSON.parse(savedQuotes));

      const savedOrders = localStorage.getItem('tanit_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } catch {
      // Ignore fallback errors
    }
  }, []);

  // Sync to localStorage
  const saveProducts = (newProds: Product[]) => {
    setProducts(newProds);
    localStorage.setItem('tanit_products', JSON.stringify(newProds));
  };

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('tanit_cart', JSON.stringify(newCart));
  };

  const saveWishlist = (newWish: string[]) => {
    setWishlist(newWish);
    localStorage.setItem('tanit_wishlist', JSON.stringify(newWish));
  };

  const saveCompare = (newComp: string[]) => {
    setCompareList(newComp);
    localStorage.setItem('tanit_compare', JSON.stringify(newComp));
  };

  const saveRfqItems = (newRfq: QuoteItem[]) => {
    setRfqItems(newRfq);
    localStorage.setItem('tanit_rfq', JSON.stringify(newRfq));
  };

  const saveQuoteRequests = (newQuotes: QuoteRequest[]) => {
    setQuoteRequests(newQuotes);
    localStorage.setItem('tanit_quote_requests', JSON.stringify(newQuotes));
  };

  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem('tanit_orders', JSON.stringify(newOrders));
  };

  // Toast System
  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation helpers
  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setActivePage('product-detail');
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToBrand = (brandId: string) => {
    setSelectedBrandId(brandId);
    setActivePage('brand-detail');
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setFilters((prev) => ({ ...prev, categoryIds: [categoryId] }));
    setActivePage('shop');
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Format Price with selected Currency
  const formatPrice = (priceInUSD: number): string => {
    const curr = currencyRates[currency];
    const converted = priceInUSD * curr.rate;
    const formatted = converted.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return curr.position === 'before' ? `${curr.symbol}${formatted}` : `${formatted}${curr.symbol}`;
  };

  // Cart Logic
  const addToCart = (product: Product, quantity = 1) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      saveCart(updated);
    } else {
      saveCart([...cart, { product, quantity }]);
    }
    addToast('Added to Cart', `${product.name} (${quantity} qty) added to cart.`, 'success');
  };

  const removeFromCart = (productId: string) => {
    saveCart(cart.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    saveCart(
      cart.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartSubtotal = cart.reduce((acc, item) => {
    let unitPrice = item.product.price;
    if (item.product.tieredDiscounts && item.product.tieredDiscounts.length > 0) {
      const match = [...item.product.tieredDiscounts]
        .sort((a, b) => b.minQty - a.minQty)
        .find((td) => item.quantity >= td.minQty);
      if (match) unitPrice = match.pricePerUnit;
    }
    return acc + unitPrice * item.quantity;
  }, 0);

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    if (wishlist.includes(productId)) {
      saveWishlist(wishlist.filter((id) => id !== productId));
      addToast('Removed from Wishlist', 'Item removed from your saved list.', 'info');
    } else {
      saveWishlist([...wishlist, productId]);
      addToast('Added to Wishlist', 'Item saved to your wishlist.', 'success');
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Compare
  const toggleCompare = (productId: string) => {
    if (compareList.includes(productId)) {
      saveCompare(compareList.filter((id) => id !== productId));
    } else {
      if (compareList.length >= 4) {
        addToast('Compare Limit Reached', 'You can compare up to 4 items side-by-side.', 'warning');
        return;
      }
      saveCompare([...compareList, productId]);
      addToast('Added to Compare', 'Item added to technical compare list.', 'success');
    }
  };

  const isInCompare = (productId: string) => compareList.includes(productId);
  const clearCompare = () => saveCompare([]);

  // RFQ
  const addToRfq = (product: Product, quantity = 1) => {
    const existingIndex = rfqItems.findIndex((item) => item.product.id === product.id);
    if (existingIndex > -1) {
      const updated = [...rfqItems];
      updated[existingIndex].quantity += quantity;
      saveRfqItems(updated);
    } else {
      saveRfqItems([...rfqItems, { product, quantity }]);
    }
    addToast('Added to RFQ Quote Builder', `${product.name} added to RFQ drawer.`, 'success');
  };

  const removeFromRfq = (productId: string) => {
    saveRfqItems(rfqItems.filter((item) => item.product.id !== productId));
  };

  const clearRfq = () => saveRfqItems([]);

  const submitQuoteRequest = (data: Omit<QuoteRequest, 'id' | 'quoteNumber' | 'createdAt' | 'status'>) => {
    const quoteNumber = `RFQ-TMI-${Math.floor(100000 + Math.random() * 900000)}`;
    const newQuote: QuoteRequest = {
      ...data,
      id: `quote-${Date.now()}`,
      quoteNumber,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    saveQuoteRequests([newQuote, ...quoteRequests]);
    clearRfq();
    addToast('RFQ Submitted Successfully', `Quote Request ${quoteNumber} has been sent to TANIT engineers.`, 'success');
  };

  const updateQuoteStatus = (id: string, status: QuoteRequest['status']) => {
    saveQuoteRequests(
      quoteRequests.map((q) => (q.id === id ? { ...q, status } : q))
    );
  };

  // Orders
  const placeOrder = (orderData: Partial<Order> & { customerName: string; email: string; items: any[]; subtotal: number; totalAmount: number; shippingAddress: string }): Order => {
    const orderNumber = orderData.orderNumber || `PO-TMI-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      subtotal: orderData.subtotal,
      tax: orderData.tax || 0,
      shippingFee: orderData.shippingFee || 0,
      totalAmount: orderData.totalAmount,
      customerName: orderData.customerName,
      email: orderData.email,
      phone: orderData.phone || '',
      companyName: orderData.companyName || '',
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod || 'Purchase Order',
      poNumber: orderData.poNumber || '',
      items: orderData.items,
      id: orderData.id || `ord-${Date.now()}`,
      orderNumber,
      createdAt: orderData.createdAt || new Date().toISOString(),
      status: orderData.status || 'processing',
      trackingNumber: orderData.trackingNumber || `TRK-DHL-${Math.floor(1000000 + Math.random() * 9000000)}`,
      estimatedDelivery: orderData.estimatedDelivery || new Date(Date.now() + 5 * 86400000).toLocaleDateString(),
    };
    saveOrders([newOrder, ...orders]);
    clearCart();
    addToast('Order Placed Successfully', `Order ${orderNumber} is being processed by TANIT Logistics.`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    saveOrders(
      orders.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  // Admin Actions
  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
    };
    saveProducts([newProd, ...products]);
    addToast('Product Created', `Product ${newProd.name} created in catalog.`, 'success');
  };

  const updateProduct = (updated: Product) => {
    saveProducts(products.map((p) => (p.id === updated.id ? updated : p)));
    addToast('Product Updated', `Changes saved for ${updated.name}.`, 'success');
  };

  const deleteProduct = (id: string) => {
    saveProducts(products.filter((p) => p.id !== id));
    addToast('Product Deleted', 'Product removed from catalog.', 'info');
  };

  const addCategory = (cat: Category) => {
    setCategories([...categories, cat]);
  };

  const addBrand = (b: Brand) => {
    setBrands([...brands, b]);
  };

  // Filtering Logic
  const resetFilters = () => setFilters(initialFilterState);

  const filteredProducts = products.filter((p) => {
    // Search Query (Name, SKU, Part Number, Brand, Category)
    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q) || (p.nameAr && p.nameAr.toLowerCase().includes(q));
      const matchSku = p.sku.toLowerCase().includes(q);
      const matchPart = p.partNumber.toLowerCase().includes(q);
      const matchBrand = p.brandName.toLowerCase().includes(q);
      const matchCat = p.categoryName.toLowerCase().includes(q);
      if (!matchName && !matchSku && !matchPart && !matchBrand && !matchCat) return false;
    }

    // Categories
    if (filters.categoryIds.length > 0 && !filters.categoryIds.includes(p.categoryId)) {
      return false;
    }

    // Brands
    if (filters.brandIds.length > 0 && !filters.brandIds.includes(p.brandId)) {
      return false;
    }

    // Stock Status
    if (filters.stockStatuses.length > 0 && !filters.stockStatuses.includes(p.stockStatus)) {
      return false;
    }

    // Price
    if (p.price < filters.minPrice || p.price > filters.maxPrice) {
      return false;
    }

    // Rating
    if (p.rating < filters.minRating) {
      return false;
    }

    // Specifications / Attributes
    if (filters.voltage && p.attributes.voltage !== filters.voltage) return false;
    if (filters.pressure && p.attributes.pressure !== filters.pressure) return false;
    if (filters.threadSize && p.attributes.threadSize !== filters.threadSize) return false;
    if (filters.material && p.attributes.material !== filters.material) return false;

    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'price_low') return a.price - b.price;
    if (filters.sortBy === 'price_high') return b.price - a.price;
    if (filters.sortBy === 'rating') return b.rating - a.rating;
    if (filters.sortBy === 'newest') return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
    // Default featured
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  return (
    <ShopContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedProductId,
        setSelectedProductId,
        selectedBrandId,
        setSelectedBrandId,
        selectedCategoryId,
        setSelectedCategoryId,
        selectedBlogId,
        setSelectedBlogId,
        navigateToProduct,
        navigateToBrand,
        navigateToCategory,
        products,
        categories,
        brands,
        downloads,
        blogPosts,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        addBrand,
        currency,
        setCurrency,
        formatPrice,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartTotalCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        compareList,
        toggleCompare,
        isInCompare,
        clearCompare,
        rfqItems,
        addToRfq,
        removeFromRfq,
        clearRfq,
        quoteRequests,
        submitQuoteRequest,
        updateQuoteStatus,
        orders,
        placeOrder,
        updateOrderStatus,
        filters,
        setFilters,
        resetFilters,
        filteredProducts,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
