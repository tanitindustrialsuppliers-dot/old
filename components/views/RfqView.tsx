'use client';

import React, { useState } from 'react';
import { useShop } from '../../lib/context/ShopContext';
import { useLanguage } from '../../lib/context/LanguageContext';
import {
  FileText,
  Upload,
  Send,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  Building,
  User,
  Mail,
  Phone,
  FileSpreadsheet,
} from 'lucide-react';

export const RfqView: React.FC = () => {
  const { t } = useLanguage();
  const { rfqItems, removeFromRfq, submitQuoteRequest, formatPrice } = useShop();

  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [taxId, setTaxId] = useState('');
  const [industry, setIndustry] = useState('Metallurgy & Heavy Industry');
  const [notes, setNotes] = useState('');
  const [uploadedBomName, setUploadedBomName] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedBomName(file.name);
    }
  };

  const estimatedTotal = rfqItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactName || !email) {
      alert('Please fill in required fields (Company Name, Contact Person, Corporate Email).');
      return;
    }

    const itemsMapped = rfqItems.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      sku: item.product.sku,
      partNumber: item.product.partNumber,
      quantity: item.quantity,
      unitPrice: item.product.price,
    }));

    submitQuoteRequest({
      customerName: contactName,
      companyName,
      email,
      phone,
      industry,
      taxId,
      items: itemsMapped,
      totalEstimatedAmount: estimatedTotal,
      notes,
      attachedBomName: uploadedBomName || undefined,
    });

    setSubmittedId(`RFQ-TMI-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  if (submittedId) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">RFQ Submitted Successfully!</h1>
        <p className="text-sm text-slate-600">
          {t('rfq.success')} <strong className="text-blue-700 font-mono">{submittedId}</strong>
        </p>
        <p className="text-xs text-slate-500 max-w-lg mx-auto">
          Our sales engineering desk will review your component list and respond with a formal written commercial quotation within 2 to 4 business hours.
        </p>
        <button
          onClick={() => setSubmittedId(null)}
          className="bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
        >
          Submit Another Quote Request
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg border border-slate-800">
        <h1 className="text-3xl font-extrabold">{t('rfq.title')}</h1>
        <p className="text-xs text-slate-300 mt-2 max-w-2xl leading-relaxed">
          {t('rfq.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Details & File Upload */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
            Company & Technical Contact Information
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {t('rfq.company_name')} *
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. TANIT Heavy Metal Works Inc."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {t('rfq.contact_person')} *
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Ing. Karim Ben Ammar"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {t('rfq.email')} *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="corporate.procurement@plant.com"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {t('rfq.phone')}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+216 71 000 000"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {t('rfq.tax_id')}
                </label>
                <input
                  type="text"
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  placeholder="VAT / Tax Identification #"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {t('rfq.industry_sector')}
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Metallurgy & Heavy Industry">Metallurgy & Heavy Industry</option>
                  <option value="Automotive Manufacturing">Automotive Manufacturing</option>
                  <option value="Oil & Gas / Petrochemical">Oil & Gas / Petrochemical</option>
                  <option value="Food & Beverage Packaging">Food & Beverage Packaging</option>
                  <option value="Power Generation">Power Generation</option>
                  <option value="Mining & Bulk Materials">Mining & Bulk Materials</option>
                </select>
              </div>
            </div>

            {/* Upload Excel BOM File */}
            <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl space-y-2 text-center">
              <FileSpreadsheet className="w-8 h-8 text-blue-700 mx-auto" />
              <div className="text-xs font-bold text-slate-800">
                {t('rfq.upload_bom')}
              </div>
              <p className="text-[11px] text-slate-500">
                Supports .xlsx, .xls, or .csv files containing part numbers & quantities.
              </p>
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                className="hidden"
                id="bom-upload"
              />
              <label
                htmlFor="bom-upload"
                className="inline-block bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold text-xs px-4 py-2 rounded-lg cursor-pointer transition-colors"
              >
                Choose Excel / BOM File
              </label>
              {uploadedBomName && (
                <div className="text-xs font-bold text-emerald-600 bg-emerald-50 py-1 px-2 rounded">
                  Attached File: {uploadedBomName}
                </div>
              )}
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1 text-xs">
                {t('rfq.notes')}
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Include custom engineering requests, required pressure/voltage specs, or target lead time..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-slate-950 font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{t('rfq.submit_btn')}</span>
            </button>
          </form>
        </div>

        {/* Right Column: Selected BOM Items List */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
            Selected Items for Quotation ({rfqItems.length})
          </h3>

          {rfqItems.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-semibold">No catalog items selected yet.</p>
              <p className="text-[11px] text-slate-400 mt-1">
                You can submit a quotation with an attached Excel BOM file above, or add items from our product catalog.
              </p>
            </div>
          ) : (
            <div className="space-y-3 divide-y divide-slate-100 max-h-96 overflow-y-auto">
              {rfqItems.map((item) => (
                <div key={item.product.id} className="pt-2 first:pt-0 flex items-start gap-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded border border-slate-200 shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                      {item.product.name}
                    </h4>
                    <div className="text-[10px] text-slate-500">
                      MPN: <strong className="text-slate-700">{item.product.partNumber}</strong>
                    </div>
                    <div className="text-xs font-bold text-slate-800 mt-1">
                      Qty: {item.quantity} x {formatPrice(item.product.price)}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromRfq(item.product.id)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {rfqItems.length > 0 && (
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-900">
              <span>Estimated Catalog Total:</span>
              <span className="text-sm text-blue-700">{formatPrice(estimatedTotal)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
