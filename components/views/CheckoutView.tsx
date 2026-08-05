'use client';

import React, { useState } from 'react';
import { useShop } from '../../lib/context/ShopContext';
import { useLanguage } from '../../lib/context/LanguageContext';
import {
  ShieldCheck,
  CheckCircle2,
  Building,
  CreditCard,
  FileText,
  Truck,
  ArrowRight,
  Printer,
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const { t } = useLanguage();
  const { cart, cartSubtotal, formatPrice, placeOrder, clearCart } = useShop();

  const [companyName, setCompanyName] = useState('');
  const [taxId, setTaxId] = useState('');
  const [poNumber, setPoNumber] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('Tunisia');
  const [paymentMethod, setPaymentMethod] = useState<'po' | 'wire' | 'card'>('po');
  const [placedOrderNumber, setPlacedOrderNumber] = useState<string | null>(null);

  const shippingFee = cartSubtotal > 1000 ? 0 : 75;
  const tax = cartSubtotal * 0.19;
  const grandTotal = cartSubtotal + shippingFee + tax;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactName || !email || !address) {
      alert('Please fill in required corporate billing information.');
      return;
    }

    const orderNum = `TMI-PO-${Math.floor(100000 + Math.random() * 900000)}`;

    placeOrder({
      orderNumber: orderNum,
      customerName: contactName,
      companyName,
      email,
      phone,
      poNumber: poNumber || `PO-${Date.now()}`,
      items: cart.map((c) => ({
        product: c.product,
        quantity: c.quantity,
        priceAtPurchase: c.product.price,
      })),
      subtotal: cartSubtotal,
      shippingFee,
      tax,
      totalAmount: grandTotal,
      status: 'Processing',
      paymentMethod: paymentMethod === 'po' ? 'Purchase Order (Net 30)' : paymentMethod === 'wire' ? 'SWIFT Wire Transfer' : 'Credit Card',
      createdAt: new Date().toISOString().split('T')[0],
      shippingAddress: `${address}, ${city}, ${country}`,
    });

    setPlacedOrderNumber(orderNum);
    clearCart();
  };

  if (placedOrderNumber) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-6 text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">B2B Order Confirmed!</h1>
        <p className="text-sm text-slate-600">
          Your Purchase Order has been processed with Order Reference:{' '}
          <strong className="text-blue-700 font-mono text-base">{placedOrderNumber}</strong>
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left space-y-3 text-xs">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">Order Details</h3>
          <div className="grid grid-cols-2 gap-2 text-slate-700">
            <div><strong>Company:</strong> {companyName}</div>
            <div><strong>PO Number:</strong> {poNumber || 'N/A'}</div>
            <div><strong>Contact:</strong> {contactName}</div>
            <div><strong>Payment Term:</strong> {paymentMethod === 'po' ? 'Net 30 PO' : 'SWIFT Wire'}</div>
            <div><strong>Grand Total:</strong> {formatPrice(grandTotal)}</div>
            <div><strong>Status:</strong> Processing Warehouse Dispatch</div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => window.print()}
            className="bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-lg flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            <span>Print Official Invoice & Proforma</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg border border-slate-800">
        <h1 className="text-3xl font-extrabold">WooCommerce B2B Corporate Checkout</h1>
        <p className="text-xs text-slate-300 mt-1">
          Complete your enterprise procurement order. Purchase Orders (PO) and SWIFT Wire Transfers supported.
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Billing & Shipping Details */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3 flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-700" />
            <span>1. Corporate Billing & PO Details</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Company Name *</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="TANIT Industrial Metal S.A."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Tax / VAT ID *</label>
              <input
                type="text"
                required
                value={taxId}
                onChange={(e) => setTaxId(e.target.value)}
                placeholder="MF-00012345/A"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Purchase Order (PO) Number</label>
              <input
                type="text"
                value={poNumber}
                onChange={(e) => setPoNumber(e.target.value)}
                placeholder="PO-2025-9982"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Procurement Contact Person *</label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Ing. Ahmed Ben Salem"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Corporate Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="procurement@company.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+216 71 800 900"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3 flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-700" />
              <span>2. Factory Shipping Address</span>
            </h3>

            <div className="text-xs space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Street Address / Industrial Zone *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Zone Industrielle Ben Arous, Lot 45"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Tunis"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Tunisia">Tunisia</option>
                    <option value="Germany">Germany</option>
                    <option value="UAE">United Arab Emirates</option>
                    <option value="France">France</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-700" />
              <span>3. B2B Commercial Payment Gateway</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div
                onClick={() => setPaymentMethod('po')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'po'
                    ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-600/30'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-slate-900">Purchase Order (Net 30)</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Approved Accounts</div>
              </div>

              <div
                onClick={() => setPaymentMethod('wire')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'wire'
                    ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-600/30'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-slate-900">SWIFT Wire Transfer</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Bank Proforma Wire</div>
              </div>

              <div
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-600/30'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="font-bold text-slate-900">Corporate Credit Card</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Visa / Mastercard / Amex</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 shadow-xl space-y-4 border border-slate-800">
          <h3 className="text-base font-bold border-b border-slate-800 pb-3">Order Items Summary</h3>

          <div className="space-y-3 divide-y divide-slate-800 max-h-60 overflow-y-auto pr-1">
            {cart.map((c) => (
              <div key={c.product.id} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold line-clamp-1">{c.product.name}</div>
                  <div className="text-[10px] text-slate-400">Qty: {c.quantity} x {formatPrice(c.product.price)}</div>
                </div>
                <div className="font-bold text-white">{formatPrice(c.product.price * c.quantity)}</div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-bold text-white">{formatPrice(cartSubtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (19%):</span>
              <span className="font-bold text-white">{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between">
              <span>Freight:</span>
              <span className="font-bold text-emerald-400">
                {shippingFee === 0 ? 'FREE Freight' : formatPrice(shippingFee)}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-base font-extrabold text-white">
              <span>Grand Total:</span>
              <span className="text-cyan-400">{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>Confirm B2B Purchase Order</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
