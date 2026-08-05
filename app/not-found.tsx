import Link from 'next/link';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 bg-blue-900/50 border border-blue-700 text-cyan-400 rounded-2xl flex items-center justify-center mb-4">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-white">404 - Page Not Found</h1>
      <p className="text-sm text-slate-300 mt-2 max-w-md">
        The equipment specification or page you requested could not be located in our industrial catalog index.
      </p>
      <Link
        href="/"
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl flex items-center gap-2 transition-colors shadow-lg"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Homepage Catalog</span>
      </Link>
    </div>
  );
}
