export type Language = 'en' | 'ar';

export interface ProductAttribute {
  name: string;
  value: string;
}

export interface TieredDiscount {
  minQty: number;
  discountPercentage: number;
  pricePerUnit: number;
}

export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  sku: string;
  partNumber: string;
  brandId: string;
  brandName: string;
  categoryId: string;
  categoryName: string;
  price: number;
  regularPrice?: number;
  stock: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock' | 'on_backorder';
  rating: number;
  reviewCount: number;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  description: string;
  descriptionAr?: string;
  specifications: Record<string, string>;
  attributes: {
    voltage?: string;
    pressure?: string;
    threadSize?: string;
    material?: string;
    operatingTemp?: string;
    protectionClass?: string;
    flowRate?: string;
    outputType?: string;
  };
  image: string;
  gallery: string[];
  datasheetUrl?: string;
  cadUrl?: string;
  videoUrl?: string;
  tieredDiscounts?: TieredDiscount[];
  type: 'simple' | 'variable' | 'grouped';
  variations?: {
    id: string;
    name: string;
    sku: string;
    price: number;
    stock: number;
    attributes: Record<string, string>;
  }[];
}

export interface Category {
  id: string;
  name: string;
  nameAr?: string;
  slug: string;
  iconName: string;
  productCount: number;
  description: string;
  image: string;
  featured?: boolean;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  country: string;
  description: string;
  featured?: boolean;
  website?: string;
}

export interface Industry {
  id: string;
  title: string;
  titleAr?: string;
  iconName: string;
  image: string;
  summary: string;
  summaryAr?: string;
  keySolutions: string[];
  recommendedCategoryIds: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  titleAr?: string;
  excerpt: string;
  excerptAr?: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

export interface FAQItem {
  id: string;
  question: string;
  questionAr?: string;
  answer: string;
  answerAr?: string;
  category: 'technical' | 'shipping' | 'quotes' | 'warranty' | 'general';
}

export interface DownloadResource {
  id: string;
  title: string;
  titleAr?: string;
  type: 'datasheet' | 'manual' | 'cad' | 'certificate' | 'catalog';
  brandName: string;
  fileSize: string;
  fileType: 'PDF' | 'DWG' | 'STEP' | 'ZIP';
  downloadUrl: string;
  productId?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariationId?: string;
}

export interface QuoteItem {
  product: Product;
  quantity: number;
  notes?: string;
  customRequirements?: string;
}

export interface QuoteRequest {
  id: string;
  quoteNumber: string;
  createdAt: string;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected' | 'fulfilled';
  customerName: string;
  companyName: string;
  email: string;
  phone: string;
  industry: string;
  taxId?: string;
  items: {
    productId: string;
    productName: string;
    sku: string;
    partNumber: string;
    quantity: number;
    unitPrice: number;
  }[];
  totalEstimatedAmount: number;
  notes?: string;
  attachedBomName?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled' | string;
  customerName: string;
  email: string;
  phone?: string;
  companyName?: string;
  shippingAddress: string;
  paymentMethod: string;
  poNumber?: string;
  items: any[];
  subtotal: number;
  tax: number;
  shippingFee: number;
  totalAmount: number;
  total?: number;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export type ActivePage =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'categories'
  | 'brands'
  | 'brand-detail'
  | 'industries'
  | 'solutions'
  | 'about'
  | 'contact'
  | 'rfq'
  | 'downloads'
  | 'blog'
  | 'blog-detail'
  | 'faq'
  | 'careers'
  | 'privacy'
  | 'terms'
  | 'shipping'
  | 'returns'
  | 'account'
  | 'login'
  | 'register'
  | 'wishlist'
  | 'compare'
  | 'cart'
  | 'checkout'
  | 'order-tracking'
  | 'admin'
  | 'pagespeed';
