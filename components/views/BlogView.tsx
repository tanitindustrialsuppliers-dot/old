'use client';

import React, { useState } from 'react';
import { blogPostsData } from '../../lib/data/blog';
import { useShop } from '../../lib/context/ShopContext';
import { Search, Calendar, User, ArrowRight, Tag } from 'lucide-react';

export const BlogView: React.FC = () => {
  const { setActivePage } = useShop();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(blogPostsData.map((b) => b.category)));

  const filtered = blogPostsData.filter((post) => {
    const matchSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = !selectedCategory || post.category === selectedCategory;
    return matchSearch && matchCat;
  });


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg border border-slate-800">
        <h1 className="text-3xl font-extrabold">Technical Engineering Insights & Industry News</h1>
        <p className="text-xs text-slate-300 mt-2 max-w-2xl leading-relaxed">
          In-depth whitepapers on hydraulic proportional valves, ATEX explosion safety compliance, IO-Link automation, and maintenance best practices.
        </p>

        <div className="mt-6 max-w-md relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search engineering articles or keywords..."
            className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 rounded-lg py-2.5 px-4 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg border transition-colors shrink-0 ${
            !selectedCategory
              ? 'bg-blue-700 text-white border-blue-700'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          All Topics
        </button>
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg border transition-colors shrink-0 ${
              selectedCategory === cat
                ? 'bg-blue-700 text-white border-blue-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filtered.map((post) => (
          <div key={post.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="relative h-48 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-3 left-3 bg-slate-900/90 text-cyan-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  {post.category}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center gap-3 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-700 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button className="text-xs font-bold text-blue-700 group-hover:underline flex items-center gap-1">
                <span>Read Full Technical Article</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
