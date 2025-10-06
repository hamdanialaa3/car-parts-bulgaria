/**
 * eBay-Style Seller Dashboard - Main Component
 * 🇧🇬 Bulgaria Car Parts Platform
 * 💰 Currency: EUR
 * 🌐 Languages: Bulgarian/English
 * 📏 Max 300 lines per file
 */

'use client';

import { StatsCards, PerformanceMetrics, QuickActions } from './dashboard/StatsCards';
import { OrdersTable } from './dashboard/OrdersTable';
import { ListingsTable } from './dashboard/ListingsTable';
import { DashboardHeader, PageTitle } from './dashboard/DashboardHeader';
import { SellerStats, Order, Listing } from './dashboard/types';

interface EbaySellerDashboardProps {
  userId?: string;
  userName?: string;
}

export default function EbaySellerDashboard({
  userName = 'Bulgarian Auto Parts'
}: EbaySellerDashboardProps = {}) {
  
  // Mock data generation
  const stats: SellerStats = {
    totalSales: 15247.50,
    totalOrders: 234,
    activeListings: 156,
    soldThisMonth: 89,
    averageRating: 4.9,
    totalViews: 12456,
    watchersCount: 345,
    messagesUnread: 7
  };

  const recentOrders: Order[] = [
    {
      id: 'ORD-2024-001',
      item: 'BMW E90 Brake Pads Set - Ceramic',
      buyer: 'ivan_mechanic',
      amount: 89.99,
      status: 'shipped',
      date: '2024-01-15',
      tracking: 'DPD123456789',
      customerName: 'Ivan Petrov',
      itemTitle: 'BMW E90 Brake Pads Set - Ceramic',
      total: 89.99,
      orderDate: '2024-01-15'
    },
    {
      id: 'ORD-2024-002', 
      item: 'Mercedes W204 Air Filter Combo',
      buyer: 'auto_repair_bg',
      amount: 35.99,
      status: 'processing',
      date: '2024-01-14',
      tracking: null,
      customerName: 'Auto Repair BG',
      itemTitle: 'Mercedes W204 Air Filter Combo',
      total: 35.99,
      orderDate: '2024-01-14'
    }
  ];

  const activeListings: Listing[] = [
    {
      id: 'LIST-001',
      title: 'BMW E90 Brake Pads Set - Premium Quality',
      type: 'fixed',
      price: 89.99,
      watchers: 12,
      views: 245,
      status: 'active',
      quantity: 15,
      category: 'Brake System',
      imageUrl: '/images/brake-pads.jpg'
    },
    {
      id: 'LIST-002',
      title: 'Mercedes W204 Air Filter OEM',
      type: 'auction',
      currentBid: 25.50,
      buyNowPrice: 45.99,
      price: 45.99,
      watchers: 8,
      views: 156,
      status: 'active',
      quantity: 8,
      category: 'Engine Parts',
      imageUrl: '/images/air-filter.jpg'
    }
  ];

  // Event handlers
  const handleViewOrder = (orderId: string) => {
    // Navigate to order details page
    window.location.href = `/seller/orders/${orderId}`;
  };

  const handleUpdateOrder = (orderId: string, status: string) => {
    // Update order status via API
    alert(`Order ${orderId} status updated to ${status}`);
  };

  const handleViewListing = (listingId: string) => {
    // Navigate to listing details
    window.location.href = `/seller/listings/${listingId}`;
  };

  const handleEditListing = (listingId: string) => {
    // Navigate to listing edit page
    window.location.href = `/seller/listings/${listingId}/edit`;
  };

  const handleDeleteListing = (listingId: string) => {
    // Confirm and delete listing
    if (confirm('Are you sure you want to delete this listing?')) {
      alert(`Listing ${listingId} deleted`);
    }
  };

  const handleCreateListing = () => {
    // Navigate to create listing page
    window.location.href = '/seller/listings/create';
  };

  const handleBulkImport = () => {
    // Navigate to bulk import page
    window.location.href = '/seller/bulk-import';
  };

  const handleViewAnalytics = () => {
    // Navigate to analytics page
    window.location.href = '/seller/analytics';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader userName={userName} />
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <PageTitle 
          title="Seller Dashboard"
          subtitle={`Welcome back, ${userName}! Manage your car parts listings and orders.`}
        />

        {/* Stats Cards */}
        <div className="mb-8">
          <StatsCards stats={stats} />
        </div>

        {/* Quick Actions & Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <QuickActions 
              onCreateListing={handleCreateListing}
              onBulkImport={handleBulkImport}
              onViewAnalytics={handleViewAnalytics}
            />
          </div>
          <div>
            <PerformanceMetrics stats={stats} />
          </div>
        </div>

        {/* Data Tables */}
        <div className="space-y-8">
          <OrdersTable 
            orders={recentOrders}
            onViewOrder={handleViewOrder}
            onUpdateOrder={handleUpdateOrder}
          />
          
          <ListingsTable 
            listings={activeListings}
            onViewListing={handleViewListing}
            onEditListing={handleEditListing}
            onDeleteListing={handleDeleteListing}
          />
        </div>

        {/* Footer Actions */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4">
            Need help? Check our seller guide or contact support.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="text-blue-600 hover:text-blue-800 text-sm">
              Seller Guide
            </button>
            <button className="text-blue-600 hover:text-blue-800 text-sm">
              Contact Support
            </button>
            <button className="text-blue-600 hover:text-blue-800 text-sm">
              Community Forum
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}