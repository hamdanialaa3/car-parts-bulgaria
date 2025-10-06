// User and Vendor types (shared with main project)
export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  role: 'customer' | 'vendor' | 'admin';
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  language: 'bg' | 'en';
  currency: 'EUR';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

export interface Vendor extends User {
  role: 'vendor';
  companyInfo: {
    name: string;
    taxNumber: string;
    address: string;
    city: string;
    postalCode: string;
    country: 'BG';
    phone: string;
    website?: string;
  };
  businessDocuments: {
    businessLicense: string;
    taxCertificate: string;
    idDocument: string;
  };
  rating: {
    average: number;
    count: number;
  };
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  commission: number;
}

// Car Parts specific types
export interface CarPart {
  id: string;
  title: string;
  description: string;
  category: PartCategory;
  subcategory?: string;
  partNumber?: string;
  brand: string;
  condition: PartCondition;
  price: number;
  currency: 'EUR';
  images: string[];
  specifications: PartSpecifications;
  compatibility: CarCompatibility[];
  vendorId: string;
  vendor?: Vendor;
  location: {
    city: string;
    region: string;
    country: 'BG';
  };
  shipping: ShippingOptions;
  warranty?: WarrantyInfo;
  isActive: boolean;
  isFeatured: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export type PartCategory = 
  | 'engine'
  | 'transmission'
  | 'brakes'
  | 'suspension'
  | 'electrical'
  | 'body'
  | 'interior'
  | 'exhaust'
  | 'cooling'
  | 'fuel';

export type PartCondition = 
  | 'new'
  | 'like-new'
  | 'good'
  | 'fair'
  | 'poor';

export interface PartSpecifications {
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  material?: string;
  color?: string;
  [key: string]: any;
}

export interface CarCompatibility {
  make: string;
  model: string;
  yearFrom: number;
  yearTo: number;
  engineType?: string;
  fuelType?: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  transmission?: 'manual' | 'automatic';
}

export interface ShippingOptions {
  methods: ShippingMethod[];
  freeShippingThreshold?: number;
  processingTime: string;
}

export interface ShippingMethod {
  name: string;
  price: number;
  estimatedDays: number;
  trackingAvailable: boolean;
}

export interface WarrantyInfo {
  duration: number;
  unit: 'days' | 'months' | 'years';
  description: string;
  returnsAccepted: boolean;
}

// Search and Filter types
export interface SearchFilters {
  query?: string;
  category?: PartCategory;
  make?: string;
  model?: string;
  yearFrom?: number;
  yearTo?: number;
  condition?: PartCondition[];
  priceMin?: number;
  priceMax?: number;
  location?: string;
  vendorId?: string;
  hasWarranty?: boolean;
  freeShipping?: boolean;
}

export interface SearchResult {
  parts: CarPart[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  facets: SearchFacets;
}

export interface SearchFacets {
  categories: FacetCount[];
  makes: FacetCount[];
  conditions: FacetCount[];
  priceRanges: FacetCount[];
  locations: FacetCount[];
}

export interface FacetCount {
  value: string;
  count: number;
}

// Order and Transaction types
export interface Order {
  id: string;
  customerId: string;
  customer?: User;
  items: OrderItem[];
  totalAmount: number;
  currency: 'EUR';
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  tracking?: TrackingInfo;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  partId: string;
  part?: CarPart;
  vendorId: string;
  quantity: number;
  price: number;
  status: OrderItemStatus;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type OrderItemStatus = 
  | 'pending'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  street: string;
  city: string;
  postalCode: string;
  country: 'BG';
  phone?: string;
}

export interface PaymentMethod {
  type: 'card' | 'paypal' | 'bank_transfer' | 'cash_on_delivery';
  details?: {
    last4?: string;
    brand?: string;
    expiryMonth?: number;
    expiryYear?: number;
  };
}

export interface TrackingInfo {
  carrier: string;
  trackingNumber: string;
  url?: string;
}

// Review and Rating types
export interface Review {
  id: string;
  partId: string;
  customerId: string;
  customer?: User;
  vendorId: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  isVerified: boolean;
  helpfulCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Mobile.de inspired UI types
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface SortOption {
  value: string;
  label: string;
  direction: 'asc' | 'desc';
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// Bulgarian specific types
export type BulgarianRegion = 
  | 'Sofia'
  | 'Plovdiv'
  | 'Varna'
  | 'Burgas'
  | 'Ruse'
  | 'Stara Zagora'
  | 'Pleven'
  | 'Dobrich'
  | 'Sliven'
  | 'Pernik';

export interface LocalizedContent {
  bg: string;
  en: string;
}