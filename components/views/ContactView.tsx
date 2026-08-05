'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageSquare, CheckCircle2, Globe } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg border border-slate-800">
        <h1 className="text-3xl font-extrabold">Contact Technical Engineering Desk</h1>
        <p className="text-xs text-slate-300 mt-2 max-w-xl leading-relaxed">
          Connect with our senior technical specialists for urgent replacement parts, custom manifold CAD drawings, or B2B sales support.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info & Plants */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
              TANIT METAL INDUSTRY Headquarters & Regional Hubs
            </h3>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-blue-700 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Egypt Operations & Manufacturing Plant</span>
                </div>
                <p className="text-slate-600 pl-5">
                  Industrial Zone, Cairo & Alexandria Facilities, Egypt
                </p>
                <p className="text-slate-700 pl-5 font-mono font-bold">Tel / Line 1: +20 1029076509</p>
                <p className="text-slate-700 pl-5 font-mono font-bold">Tel / Line 2: +201017681716</p>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-100">
                <div className="font-bold text-blue-700 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Syria Regional Industrial Hub</span>
                </div>
                <p className="text-slate-600 pl-5">
                  Industrial City, Damascus & Aleppo Operations, Syria
                </p>
                <p className="text-slate-700 pl-5 font-mono font-bold">Hotline: +20 1029076509 / +201017681716</p>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-100">
                <div className="font-bold text-blue-700 flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>Corporate Inquiry Email</span>
                </div>
                <p className="text-slate-700 pl-5 font-mono font-bold">
                  tanitindustrialsuppliers@gmail.com
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Support */}
            <div className="pt-3 space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Direct WhatsApp Support Lines
              </span>
              <a
                href="https://wa.me/201029076509?text=Hello%20TANIT%20METAL%20INDUSTRY%20engineering%20team,%20I%20have%20a%20technical%20inquiry."
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-xl w-full flex items-center justify-center gap-2 shadow transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Line 1: +20 1029076509</span>
              </a>
              <a
                href="https://wa.me/201017681716?text=Hello%20TANIT%20METAL%20INDUSTRY%20engineering%20team,%20I%20have%20a%20technical%20inquiry."
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-xl w-full flex items-center justify-center gap-2 shadow transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Line 2: +201017681716</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
            Send an Urgent Engineering Message
          </h3>

          {submitted ? (
            <div className="p-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold text-slate-900">Message Received</h4>
              <p className="text-xs text-slate-600">
                Thank you. An application engineer will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ing. Youssef Chahed"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Steel Mill Industries"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="y.chahed@mill.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+216 20 000 000"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Technical Inquiry / Requirements</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe part numbers required, pressure/voltage ratings, or machine downtime issue..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl shadow flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
