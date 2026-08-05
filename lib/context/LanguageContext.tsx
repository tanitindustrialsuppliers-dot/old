'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Top Bar & Header
    'topbar.tagline': 'TANIT METAL INDUSTRY - Enterprise Automation & Metal Engineering Solutions',
    'topbar.hotline': 'Technical Support Line',
    'topbar.cad_center': '3D CAD & PDF Center',
    'topbar.rfq': 'Request a Quote',
    'header.search_placeholder': 'Search by Part Number, SKU, Brand, Model, or Keyword...',
    'header.all_categories': 'All Categories',
    'header.cart': 'Cart',
    'header.wishlist': 'Wishlist',
    'header.compare': 'Compare',
    'header.account': 'My Account',
    'header.admin_mode': 'WP Admin Panel',
    'nav.home': 'Home',
    'nav.shop': 'Product Catalog',
    'nav.categories': 'Categories',
    'nav.brands': 'Brands',
    'nav.industries': 'Industries',
    'nav.solutions': 'Engineering Solutions',
    'nav.downloads': 'Technical Downloads',
    'nav.about': 'About TANIT',
    'nav.contact': 'Contact Us',
    'nav.rfq': 'Request Quote',
    'nav.blog': 'Technical Blog',
    'nav.faq': 'FAQ',
    'nav.order_tracking': 'Track Order',
    'nav.pagespeed': 'PageSpeed & SEO',

    // Hero & Banner
    'hero.badge': 'GERMAN & EUROPEAN INDUSTRIAL STANDARDS',
    'hero.title': 'Enterprise Metal Machinery & Automation Components',
    'hero.subtitle': 'Authorized global supplier for Siemens, Festo, Schneider, SMC, Bosch Rexroth & TANIT Pro-Series engineered hydraulic power units.',
    'hero.cta_shop': 'Explore 100+ Catalog Items',
    'hero.cta_rfq': 'Submit Bulk BOM Request',
    'hero.stat1_val': '25+',
    'hero.stat1_lbl': 'Global Brands',
    'hero.stat2_val': '10,000+',
    'hero.stat2_lbl': 'In-Stock Parts',
    'hero.stat3_val': '24/7',
    'hero.stat3_lbl': 'Engineering Support',
    'hero.stat4_val': 'ISO 9001',
    'hero.stat4_lbl': 'Certified Quality',

    // Home Sections
    'home.categories_title': 'Browse by Industrial Category',
    'home.categories_subtitle': 'Heavy-duty actuators, PLCs, directional valves, fluid power, and sensors',
    'home.brands_title': 'Authorized Global Brand Partners',
    'home.brands_subtitle': 'Genuine OEM parts with full manufacturer certificates of origin',
    'home.featured_products': 'Featured Industrial Equipment',
    'home.best_sellers': 'Best-Selling Industrial Parts',
    'home.new_arrivals': 'New Engineering Products',
    'home.view_all': 'View All Products',
    'home.industries_title': 'Industries We Serve',
    'home.industries_subtitle': 'Tailored automation and fluid power solutions for heavy manufacturing',
    'home.solutions_title': 'Custom Engineering & Manufacturing Services',
    'home.testimonials_title': 'What Global Industry Leaders Say',
    'home.trusted_by': 'Trusted by Leading Heavy Industries Worldwide',
    'home.latest_news': 'Technical Resources & Market News',
    'home.newsletter_title': 'Subscribe to Technical Bulletins & Stock Alerts',
    'home.newsletter_desc': 'Receive monthly updates on new catalog releases, CAD files, and engineering whitepapers.',
    'home.newsletter_placeholder': 'Enter your corporate email address...',
    'home.newsletter_btn': 'Subscribe',

    // Product Card & Catalog
    'product.part_no': 'Part No.',
    'product.sku': 'SKU:',
    'product.brand': 'Brand:',
    'product.in_stock': 'In Stock',
    'product.low_stock': 'Low Stock',
    'product.out_of_stock': 'Out of Stock',
    'product.add_to_cart': 'Add to Cart',
    'product.add_to_quote': 'Add to RFQ',
    'product.download_pdf': 'PDF Datasheet',
    'product.download_cad': '3D CAD Step',
    'product.quick_view': 'Quick View',
    'product.unit_price': 'Unit Price:',
    'product.qty_discounts': 'Tiered Volume Pricing Available',

    // Filters & Shop
    'shop.filters_title': 'Filter Catalog',
    'shop.clear_all': 'Clear All Filters',
    'shop.category': 'Category',
    'shop.brand': 'Brand / Manufacturer',
    'shop.price_range': 'Price Range ($)',
    'shop.availability': 'Stock Availability',
    'shop.rating': 'Minimum Rating',
    'shop.voltage': 'Operating Voltage',
    'shop.pressure': 'Pressure Rating',
    'shop.thread_size': 'Thread Size',
    'shop.material': 'Material Construction',
    'shop.sort_by': 'Sort By',
    'shop.sort_featured': 'Featured',
    'shop.sort_price_low': 'Price: Low to High',
    'shop.sort_price_high': 'Price: High to Low',
    'shop.sort_rating': 'Highest Rated',
    'shop.sort_newest': 'Newest Arrivals',
    'shop.showing_results': 'Showing {count} products',

    // Detail Page
    'detail.overview': 'Product Overview',
    'detail.specs': 'Technical Specifications',
    'detail.downloads': 'Datasheets & CAD Files',
    'detail.applications': 'Industrial Applications',
    'detail.reviews': 'Customer Reviews & Ratings',
    'detail.quantity': 'Quantity:',
    'detail.bulk_discount_title': 'Bulk Tiered Quantity Pricing',
    'detail.inquiry_title': 'Need Engineering Consultation or Custom Modification?',
    'detail.inquiry_desc': 'Speak directly with a TANIT Application Engineer regarding technical compatibility or bulk pricing.',
    'detail.request_quote_button': 'Request Custom RFQ',

    // RFQ & Cart
    'rfq.title': 'Request a Formal B2B Quotation (RFQ)',
    'rfq.subtitle': 'Build your bill of materials (BOM), specify custom parameters, or upload an Excel file for immediate pricing.',
    'rfq.company_name': 'Company Name',
    'rfq.contact_person': 'Contact Name',
    'rfq.email': 'Corporate Email',
    'rfq.phone': 'Phone Number',
    'rfq.tax_id': 'Tax ID / VAT Registration',
    'rfq.industry_sector': 'Industry Sector',
    'rfq.notes': 'Engineering Specifications / Delivery Timeline',
    'rfq.upload_bom': 'Upload Excel/CSV Bill of Materials (BOM)',
    'rfq.submit_btn': 'Submit Quote Request',
    'rfq.success': 'Your quote request has been generated! Reference ID:',

    // Checkout
    'checkout.title': 'WooCommerce Enterprise B2B Checkout',
    'checkout.po_payment': 'Corporate Purchase Order (PO Net 30/60)',
    'checkout.wire_transfer': 'SWIFT Bank Wire Transfer',
    'checkout.credit_card': 'Credit Card (Visa/Mastercard)',
    'checkout.po_number': 'PO Number Reference',
    'checkout.shipping_address': 'Destination Plant / Factory Shipping Address',
    'checkout.place_order': 'Place Commercial Order',

    // Footer
    'footer.company_desc': 'TANIT METAL INDUSTRY is a premier manufacturer and international distributor of heavy industrial automation components, hydraulic power systems, pneumatics, and metal structures.',
    'footer.quick_links': 'Quick Navigation',
    'footer.categories': 'Top Categories',
    'footer.certifications': 'Certifications & Compliance',
    'footer.contact_info': 'Headquarters & Plant',
    'footer.rights': '© 2026 TANIT METAL INDUSTRY. All Rights Reserved. Designed & Built for Global Enterprise Commerce.',

    // Admin
    'admin.dashboard_title': 'WordPress & WooCommerce Enterprise Dashboard',
    'admin.manage_products': 'Products & Inventory',
    'admin.manage_categories': 'Categories',
    'admin.manage_brands': 'Brands & OEMs',
    'admin.manage_orders': 'Orders & Fulfillment',
    'admin.manage_quotes': 'RFQ Quotations',
    'admin.manage_downloads': 'PDFs & CAD Media',
    'admin.pagespeed_seo': 'PageSpeed & SEO Audit',
  },
  ar: {
    // Top Bar & Header
    'topbar.tagline': 'تانيت لتصنيع المعادن - حلول الأتمتة والهندسة الميكانيكية الشاقة',
    'topbar.hotline': 'خط الدعم الفني المباشر',
    'topbar.cad_center': 'مركز ملفات 3D CAD و PDF',
    'topbar.rfq': 'طلب عرض سعر (RFQ)',
    'header.search_placeholder': 'ابحث برقم القطعة، SKU، الماركة، الطراز، أو الكلمة المفتاحية...',
    'header.all_categories': 'جميع الأقسام',
    'header.cart': 'سلة الشراء',
    'header.wishlist': 'المفضلة',
    'header.compare': 'المقارنة',
    'header.account': 'حسابي',
    'header.admin_mode': 'لوحة تحكم ووردبريس',
    'nav.home': 'الرئيسية',
    'nav.shop': 'كتالوج المنتجات',
    'nav.categories': 'الأقسام',
    'nav.brands': 'العلامات التجارية',
    'nav.industries': 'القطاعات الصناعية',
    'nav.solutions': 'الحلول الهندسية',
    'nav.downloads': 'التحميلات الفنية',
    'nav.about': 'عن تانيت',
    'nav.contact': 'اتصل بنا',
    'nav.rfq': 'طلب سعر',
    'nav.blog': 'المدونة الفنية',
    'nav.faq': 'الأسئلة الشائعة',
    'nav.order_tracking': 'تتبع الطلب',
    'nav.pagespeed': 'الأداء و SEO',

    // Hero & Banner
    'hero.badge': 'معايير جودة ألمانيا وأوروبا الصناعية',
    'hero.title': 'معدات المعادن الشاقة ومكونات الأتمتة الصناعية',
    'hero.subtitle': 'موزع معتمد لشركات سيمنس، فيستو، شنايدر، SMC، بوش ريكسروث، ووحدات الطاقة الهيدروليكية المخصصة من تانيت.',
    'hero.cta_shop': 'تصفح أكثر من 100 منتج',
    'hero.cta_rfq': 'تقديم قائمة كميات BOM',
    'hero.stat1_val': '+25',
    'hero.stat1_lbl': 'ماركة عالمية',
    'hero.stat2_val': '+10,000',
    'hero.stat2_lbl': 'قطعة بالمستودعات',
    'hero.stat3_val': '24/7',
    'hero.stat3_lbl': 'دعم هندسي',
    'hero.stat4_val': 'ISO 9001',
    'hero.stat4_lbl': 'جودة معتمدة',

    // Home Sections
    'home.categories_title': 'تصفح حسب القسم الصناعي',
    'home.categories_subtitle': 'أسطوانات هيدروليكية، متحكمات آليه، صمامات، ومستشعرات',
    'home.brands_title': 'شركاء العلامات التجارية العالمية المعتمدين',
    'home.brands_subtitle': 'قطع غيار أصلية مع شهادات المنشأ الموثوقة',
    'home.featured_products': 'المعدات الصناعية المميزة',
    'home.best_sellers': 'القطع الأكثر مبيعاً',
    'home.new_arrivals': 'أحدث المنتجات الهندسية',
    'home.view_all': 'عرض جميع المنتجات',
    'home.industries_title': 'القطاعات التي نخدمها',
    'home.industries_subtitle': 'حلول أتمتة وطاقة هيدروليكية مصممة للصناعات الشاقة',
    'home.solutions_title': 'خدمات التصنيع والهندسة المخصصة',
    'home.testimonials_title': 'آراء كبار المصنعين والشركات العالمية',
    'home.trusted_by': 'شركاء النجاح في القطاعات الشاقة حول العالم',
    'home.latest_news': 'الموارد الفنية وأخبار السوق',
    'home.newsletter_title': 'اشترك في النشرات الفنية وتنبيهات المخزون',
    'home.newsletter_desc': 'احصل على تحديثات شهرية حول أحدث الكتالوجات وملفات CAD والتقارير الهندسية.',
    'home.newsletter_placeholder': 'أدخل البريد الإلكتروني للمؤسسة...',
    'home.newsletter_btn': 'اشتراك',

    // Product Card & Catalog
    'product.part_no': 'رقم القطعة:',
    'product.sku': 'رمز القطعة (SKU):',
    'product.brand': 'الماركة:',
    'product.in_stock': 'متوفر بالمخزن',
    'product.low_stock': 'كمية محدودة',
    'product.out_of_stock': 'غير متوفر حالياً',
    'product.add_to_cart': 'إضافة للسلة',
    'product.add_to_quote': 'إضافة لطلب السعر',
    'product.download_pdf': 'الكتالوج PDF',
    'product.download_cad': 'ملف 3D CAD',
    'product.quick_view': 'نظرة سريعة',
    'product.unit_price': 'سعر الوحدة:',
    'product.qty_discounts': 'خصومات الشراء بالجملة متوفرة',

    // Filters & Shop
    'shop.filters_title': 'تصفية المنتجات',
    'shop.clear_all': 'مسح جميع الفلاتر',
    'shop.category': 'القسم',
    'shop.brand': 'الماركة / المصنع',
    'shop.price_range': 'نطاق السعر ($)',
    'shop.availability': 'حالة التوفر',
    'shop.rating': 'التقييم الأدنى',
    'shop.voltage': 'جهد التشغيل',
    'shop.pressure': 'مستوى الضغط',
    'shop.thread_size': 'مقاس السن واللولب',
    'shop.material': 'مادة التصنيع',
    'shop.sort_by': 'ترتيب حسب',
    'shop.sort_featured': 'المميزة',
    'shop.sort_price_low': 'السعر: من الأقل للأعلى',
    'shop.sort_price_high': 'السعر: من الأعلى للأقل',
    'shop.sort_rating': 'الأعلى تقييماً',
    'shop.sort_newest': 'الأحدث وصولاً',
    'shop.showing_results': 'عرض {count} منتج',

    // Detail Page
    'detail.overview': 'نظرة عامة على المنتج',
    'detail.specs': 'المواصفات الفنية التفصيلية',
    'detail.downloads': 'كتالوجات وملفات CAD',
    'detail.applications': 'التطبيقات الصناعية',
    'detail.reviews': 'تقييمات وآراء العملاء',
    'detail.quantity': 'الكمية:',
    'detail.bulk_discount_title': 'جدول الخصومات للكميات الكبيرة',
    'detail.inquiry_title': 'هل تحتاج استشارة هندسية أو تعديل خاص؟',
    'detail.inquiry_desc': 'تحدث مباشرة مع مهندسي التطبيقات في تانيت لمناقشة التوافق الفني.',
    'detail.request_quote_button': 'طلب عرض سعر مخصص',

    // RFQ & Cart
    'rfq.title': 'طلب عرض سعر رسمي للشركات (RFQ)',
    'rfq.subtitle': 'أنشئ قائمة كمياتك المباشرة، حدد المواصفات الفنية، أو أرفق ملف إكسل للحصول على عرض سعر فوري.',
    'rfq.company_name': 'اسم الشركة / المنشأة',
    'rfq.contact_person': 'اسم مسؤول التواصل',
    'rfq.email': 'البريد الإلكتروني للشركة',
    'rfq.phone': 'رقم الهاتف',
    'rfq.tax_id': 'الرقم الضريبي',
    'rfq.industry_sector': 'القطاع الصناعي',
    'rfq.notes': 'المواصفات الفنية والجدول الزمني المطلوب',
    'rfq.upload_bom': 'إرفاق قائمة الكميات Excel/CSV (BOM)',
    'rfq.submit_btn': 'إرسال طلب السعر',
    'rfq.success': 'تم تقديم طلب السعر بنجاح! رقم المرجعية:',

    // Checkout
    'checkout.title': 'إتمام الشراء الرسمي B2B - ووكومرس',
    'checkout.po_payment': 'امر شراء حكومي / شركات (PO Net 30/60)',
    'checkout.wire_transfer': 'تحويل بنكي مباشر SWIFT',
    'checkout.credit_card': 'بطاقة ائتمان (فيزا / ماستركارد)',
    'checkout.po_number': 'رقم أمرين الشراء المرجعي (PO Number)',
    'checkout.shipping_address': 'عنوان الشحن وموقع المصنع',
    'checkout.place_order': 'تاكيد وتأكيد الطلب الرسمي',

    // Footer
    'footer.company_desc': 'تانيت لتصنيع المعادن هي شركة رائدة في تصنيع وتوزيع المكونات الصناعية الشاقة، أنظمة الطاقة الهيدروليكية، الأنظمة الهوائية، والهياكل المعدنية.',
    'footer.quick_links': 'روابط سريعة',
    'footer.categories': 'أبرز الأقسام',
    'footer.certifications': 'الشهادات والاعتمادات',
    'footer.contact_info': 'المقر الرئيسي والمصنع',
    'footer.rights': '© 2026 تانيت لتصنيع المعادن. جميع الحقوق محفوظة.',

    // Admin
    'admin.dashboard_title': 'لوحة تحكم ووردبريس وووكومرس الشاملة',
    'admin.manage_products': 'إدارة المنتجات والمخزون',
    'admin.manage_categories': 'الأقسام',
    'admin.manage_brands': 'الماركات والمصنعين',
    'admin.manage_orders': 'الطلبات والشحن',
    'admin.manage_quotes': 'طلبات عروض الأسعار',
    'admin.manage_downloads': 'الملفات والكتالوجات',
    'admin.pagespeed_seo': 'أداء الموقع و SEO',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('tanit_language') as Language;
    if (saved && (saved === 'en' || saved === 'ar')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('tanit_language', lang);
    if (typeof document !== 'undefined') {
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  const t = (key: string): string => {
    const langDict = translations[language];
    return langDict[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, t }}>
      <div dir={dir} className={language === 'ar' ? 'font-sans-arabic' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
