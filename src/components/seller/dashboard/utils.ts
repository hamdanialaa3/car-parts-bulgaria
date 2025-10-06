/**
 * Seller Dashboard Utilities
 * 🇧🇬 Bulgaria Car Parts Platform
 * 💰 Currency: EUR (European Standards)
 * 🌐 Languages: Bulgarian/English
 */

/**
 * Get status styling based on order/listing status
 * @param status - Order or listing status
 * @returns Tailwind CSS classes for styling
 */
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'shipped': 
      return 'text-blue-600 bg-blue-100';
    case 'processing': 
      return 'text-yellow-600 bg-yellow-100';
    case 'delivered': 
      return 'text-green-600 bg-green-100';
    case 'active': 
      return 'text-green-600 bg-green-100';
    case 'ending-soon': 
      return 'text-red-600 bg-red-100';
    default: 
      return 'text-gray-600 bg-gray-100';
  }
};

/**
 * Get appropriate icon for status
 * @param status - Order or listing status  
 * @returns Icon component name
 */
export const getStatusIconName = (status: string): string => {
  switch (status) {
    case 'shipped': 
      return 'Truck';
    case 'processing': 
      return 'Clock';
    case 'delivered': 
      return 'CheckCircle';
    case 'active': 
      return 'CheckCircle';
    case 'ending-soon': 
      return 'AlertCircle';
    default: 
      return 'XCircle';
  }
};

/**
 * Format currency for Bulgarian market (EUR)
 * @param amount - Amount in EUR
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('bg-BG', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};

/**
 * Format numbers with Bulgarian locale
 * @param num - Number to format
 * @returns Formatted number string
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('bg-BG').format(num);
};

export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('bg-BG', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(dateObj);
};

export const generateMockStats = () => ({
  totalSales: 15247.50,
  totalOrders: 234,
  activeListings: 156,
  soldThisMonth: 89,
  averageRating: 4.9,
  totalViews: 12456,
  watchersCount: 345,
  messagesUnread: 7
});

export const generateMockOrders = (count: number) => {
  const orders = [];
  for (let i = 1; i <= count; i++) {
    orders.push({
      id: `ORD-2024-${String(i).padStart(3, '0')}`,
      item: `Car Part ${i}`,
      buyer: `buyer_${i}`,
      amount: Math.floor(Math.random() * 200) + 20,
      status: ['shipped', 'processing', 'delivered'][Math.floor(Math.random() * 3)] as 'shipped' | 'processing' | 'delivered',
      date: new Date(2024, 0, i).toISOString().split('T')[0],
      tracking: i % 2 === 0 ? `DPD${Math.random().toString().slice(2, 11)}` : null,
      customerName: `Customer ${i}`,
      itemTitle: `Car Part ${i} - Premium Quality`,
      total: Math.floor(Math.random() * 200) + 20,
      orderDate: new Date(2024, 0, i).toISOString().split('T')[0]
    });
  }
  return orders;
};

export const generateMockListings = (count: number) => {
  const listings = [];
  for (let i = 1; i <= count; i++) {
    listings.push({
      id: `LIST-${String(i).padStart(3, '0')}`,
      title: `Car Part Listing ${i}`,
      type: Math.random() > 0.5 ? 'fixed' as const : 'auction' as const,
      price: Math.floor(Math.random() * 300) + 25,
      watchers: Math.floor(Math.random() * 50) + 1,
      views: Math.floor(Math.random() * 500) + 50,
      status: Math.random() > 0.8 ? 'ending-soon' as const : 'active' as const,
      quantity: Math.floor(Math.random() * 20) + 1,
      category: ['Engine Parts', 'Brake System', 'Electrical', 'Body Parts'][Math.floor(Math.random() * 4)],
      imageUrl: `/images/part-${i}.jpg`
    });
  }
  return listings;
};

/**
 * Calculate percentage change between two values
 * @param current - Current value
 * @param previous - Previous value
 * @returns Formatted percentage string with sign
 */
export const calculatePercentageChange = (current: number, previous: number): string => {
  if (previous === 0) return '+0%';
  const change = ((current - previous) / previous) * 100;
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(1)}%`;
};

/**
 * Generate unique slug for products (Bulgarian-friendly)
 * @param title - Product title
 * @returns URL-friendly slug
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9а-я]+/g, '-') // Support Bulgarian Cyrillic
    .replace(/(^-|-$)/g, '')
    .substring(0, 50);
};

/**
 * Mock data generators for development/testing
 */
export const mockData = {
  /**
   * Generate mock seller statistics
   */
  generateStats: () => ({
    totalSales: 15247.50,
    totalOrders: 234,
    activeListings: 156,
    soldThisMonth: 89,
    averageRating: 4.9,
    totalViews: 12456,
    watchersCount: 345,
    messagesUnread: 7
  }),

  /**
   * Generate mock recent orders
   */
  generateOrders: () => [
    {
      id: 'ORD-2024-001',
      item: 'BMW E90 Brake Pads Set - Ceramic',
      buyer: 'ivan_mechanic',
      amount: 89.99,
      status: 'shipped' as const,
      date: '2024-01-15',
      tracking: 'DPD123456789'
    },
    {
      id: 'ORD-2024-002', 
      item: 'Mercedes W204 Air Filter Combo',
      buyer: 'auto_repair_bg',
      amount: 35.99,
      status: 'processing' as const,
      date: '2024-01-14',
      tracking: null
    },
    {
      id: 'ORD-2024-003',
      item: 'Audi A4 Xenon Headlights OEM',
      buyer: 'parts_collector',
      amount: 299.99,
      status: 'delivered' as const,
      date: '2024-01-12',
      tracking: 'DPD987654321'
    }
  ]
};