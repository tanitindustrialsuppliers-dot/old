'use client';

import React, { useState } from 'react';
import { useShop } from '../lib/context/ShopContext';
import { TopBar } from '../components/TopBar';
import { Header } from '../components/Header';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

import { HomeView } from '../components/views/HomeView';
import { ShopView } from '../components/views/ShopView';
import { ProductDetailView } from '../components/views/ProductDetailView';
import { BrandsView } from '../components/views/BrandsView';
import { BrandDetailView } from '../components/views/BrandDetailView';
import { IndustriesView } from '../components/views/IndustriesView';
import { SolutionsView } from '../components/views/SolutionsView';
import { TechnicalDownloadsView } from '../components/views/TechnicalDownloadsView';
import { RfqView } from '../components/views/RfqView';
import { CartView } from '../components/views/CartView';
import { CheckoutView } from '../components/views/CheckoutView';
import { WishlistView } from '../components/views/WishlistView';
import { CompareView } from '../components/views/CompareView';
import { OrderTrackingView } from '../components/views/OrderTrackingView';
import { AccountView } from '../components/views/AccountView';
import { BlogView } from '../components/views/BlogView';
import { FaqView } from '../components/views/FaqView';
import { AboutView } from '../components/views/AboutView';
import { ContactView } from '../components/views/ContactView';
import { AdminView } from '../components/views/AdminView';
import { PageSpeedView } from '../components/views/PageSpeedView';

import { QuickCartDrawer } from '../components/QuickCartDrawer';
import { QuickRfqDrawer } from '../components/QuickRfqDrawer';
import { ToastNotification } from '../components/ToastNotification';

export default function Page() {
  const { activePage } = useShop();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isRfqOpen, setIsRfqOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header & Navigation Bars */}
      <TopBar />
      <Header
        onOpenCartDrawer={() => setIsCartOpen(true)}
        onOpenRfqDrawer={() => setIsRfqOpen(true)}
      />
      <Navbar />

      {/* Main Page View Switcher */}
      <main className="flex-1">
        {activePage === 'home' && <HomeView />}
        {activePage === 'shop' && <ShopView />}
        {activePage === 'product-detail' && <ProductDetailView />}
        {activePage === 'brands' && <BrandsView />}
        {activePage === 'brand-detail' && <BrandDetailView />}
        {activePage === 'industries' && <IndustriesView />}
        {activePage === 'solutions' && <SolutionsView />}
        {activePage === 'downloads' && <TechnicalDownloadsView />}
        {activePage === 'rfq' && <RfqView />}
        {activePage === 'cart' && <CartView />}
        {activePage === 'checkout' && <CheckoutView />}
        {activePage === 'wishlist' && <WishlistView />}
        {activePage === 'compare' && <CompareView />}
        {activePage === 'order-tracking' && <OrderTrackingView />}
        {activePage === 'account' && <AccountView />}
        {activePage === 'blog' && <BlogView />}
        {activePage === 'faq' && <FaqView />}
        {activePage === 'about' && <AboutView />}
        {activePage === 'contact' && <ContactView />}
        {activePage === 'admin' && <AdminView />}
        {activePage === 'pagespeed' && <PageSpeedView />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Drawers & Toast Overlay */}
      <QuickCartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <QuickRfqDrawer isOpen={isRfqOpen} onClose={() => setIsRfqOpen(false)} />
      <ToastNotification />
    </div>
  );
}
