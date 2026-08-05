import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '../lib/context/LanguageContext';
import { ShopProvider } from '../lib/context/ShopContext';

export const metadata: Metadata = {
  title: 'TANIT METAL INDUSTRY | Enterprise Industrial Equipment & Automation',
  description: 'Manufacturer & Authorized Stocking Distributor for Siemens, Festo, Rexroth Bosch, Parker Hannifin, SMC, and Danfoss industrial machinery and fluid power equipment.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning className="bg-slate-50 text-slate-900 font-sans">
        <LanguageProvider>
          <ShopProvider>
            {children}
          </ShopProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

