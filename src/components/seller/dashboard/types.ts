/**
 * Seller Dashboard Types
 * 🇧🇬 Bulgaria Car Parts Platform
 * 💰 Currency: EUR
 * 🌐 Languages: Bulgarian/English
 */

export interface SellerStats {
  totalSales: number;
  totalOrders: number;
  activeListings: number;
  soldThisMonth: number;
  averageRating: number;
  totalViews: number;
  watchersCount: number;
  messagesUnread: number;
}

export interface Order {
  id: string;
  item: string;
  buyer: string;
  amount: number;
  status: 'shipped' | 'processing' | 'delivered' | 'pending' | 'confirmed' | 'cancelled';
  date: string;
  tracking: string | null;
  customerName: string;
  itemTitle: string;
  total: number;
  orderDate: string | Date;
}

export interface Listing {
  id: string;
  title: string;
  type: 'auction' | 'fixed';
  currentBid?: number;
  buyNowPrice?: number;
  price: number;
  bidsCount?: number;
  watchers: number;
  views: number;
  endTime?: string;
  status: 'active' | 'ending-soon';
  quantity: number;
  sold?: number;
  category: string;
  imageUrl?: string;
}

export interface PerformanceData {
  period: string;
  sales: number;
  orders: number;
  views: number;
}

export interface Tab {
  id: string;
  label: string;
  icon: any;  // Lucide icon component
}