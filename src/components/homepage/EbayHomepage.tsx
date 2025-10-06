'use client';

import { useState } from 'react';
import { Search, ChevronDown, ShoppingCart, User, Heart, Bell, MapPin, Truck, Shield, Clock, TrendingUp, Wrench, RotateCcw, Zap, Car, Settings, Disc } from 'lucide-react';
import Link from 'next/link';

export default function EbayHomepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for eBay-style sections
  const featuredCategories = [
    { id: 'engine', name: 'Engine Parts', icon: Wrench, count: '12,234', image: '/categories/engine.jpg' },
    { id: 'brakes', name: 'Brake System', icon: RotateCcw, count: '8,456', image: '/categories/brakes.jpg' },
    { id: 'electrical', name: 'Electrical', icon: Zap, count: '15,789', image: '/categories/electrical.jpg' },
    { id: 'body', name: 'Body Parts', icon: Car, count: '9,234', image: '/categories/body.jpg' },
    { id: 'interior', name: 'Interior', icon: Settings, count: '6,123', image: '/categories/interior.jpg' },
    { id: 'wheels', name: 'Wheels & Tires', icon: Disc, count: '11,456', image: '/categories/wheels.jpg' },
  ];

  const hotDeals = [
    {
      id: '1',
      title: 'BMW E90 Performance Brake Pads Set - Ceramic',
      currentBid: 89.99,
      buyNowPrice: 129.99,
      endTime: '2024-01-15T20:30:00Z',
      bidsCount: 23,
      watchersCount: 67,
      image: '/parts/brake-pads.jpg',
      seller: { name: 'AutoParts_Sofia', rating: 4.8, feedbackCount: 1247 },
      shipping: 0,
      isHot: true,
      originalPrice: 159.99,
      discount: 30
    },
    {
      id: '2',
      title: 'Mercedes W204 Air Filter + Oil Filter Combo',
      currentBid: 25.50,
      buyNowPrice: 35.99,
      endTime: '2024-01-16T14:45:00Z',
      bidsCount: 12,
      watchersCount: 34,
      image: '/parts/filters.jpg',
      seller: { name: 'BG_CarParts', rating: 4.9, feedbackCount: 892 },
      shipping: 5.99,
      isHot: false,
      originalPrice: 45.99,
      discount: 22
    },
    {
      id: '3',
      title: 'Audi A4 B8 Xenon Headlights - OEM Quality',
      currentBid: 245.00,
      buyNowPrice: 299.99,
      endTime: '2024-01-17T18:20:00Z',
      bidsCount: 45,
      watchersCount: 156,
      image: '/parts/headlights.jpg',
      seller: { name: 'EliteAuto_Plovdiv', rating: 4.7, feedbackCount: 2341 },
      shipping: 15.99,
      isHot: true,
      originalPrice: 399.99,
      discount: 25
    }
  ];

  const trendingSearches = [
    'BMW brake pads', 'Mercedes air filter', 'Audi headlights', 'VW oil filter',
    'Ford spark plugs', 'Toyota brake discs', 'Honda radiator', 'Peugeot battery'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* eBay-style Header */}
      <header className="bg-white border-b-2 border-blue-600 shadow-sm">
        {/* Top Bar */}
        <div className="bg-gray-100 py-1">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-xs">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                Sofia, Bulgaria
              </span>
              <span className="text-gray-600">Hi! 
                <Link href="/signin" className="text-blue-600 hover:underline ml-1">
                  Sign in
                </Link> or 
                <Link href="/register" className="text-blue-600 hover:underline ml-1">
                  register
                </Link>
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/sell" className="text-blue-600 hover:underline">Start selling</Link>
              <Link href="/help" className="hover:underline">Customer service</Link>
              <div className="flex items-center">
                <span className="mr-1">🇧🇬 Български</span>
                <ChevronDown className="h-3 w-3" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold">
                <span className="text-red-600">Car</span>
                <span className="text-blue-600">Parts</span>
                <span className="text-yellow-500">.bg</span>
              </div>
            </Link>

            {/* Search Bar - eBay Style */}
            <div className="flex-1 max-w-3xl mx-8">
              <div className="flex">
                <div className="relative">
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none bg-gray-100 border border-gray-300 px-3 py-3 pr-8 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-40"
                  >
                    <option value="all">All Categories</option>
                    <option value="engine">Engine Parts</option>
                    <option value="brakes">Brake System</option>
                    <option value="electrical">Electrical</option>
                    <option value="body">Body Parts</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-3 h-4 w-4 text-gray-600 pointer-events-none" />
                </div>
                <input
                  type="text"
                  placeholder="Search for car parts, brands, or models..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-3 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-lg flex items-center">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </button>
              </div>
              
              {/* Trending Searches */}
              <div className="mt-2 flex items-center text-xs text-gray-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span className="mr-2">Trending:</span>
                {trendingSearches.slice(0, 4).map((search, index) => (
                  <button key={index} className="text-blue-600 hover:underline mr-3">
                    {search}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
              </button>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Heart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">7</span>
              </button>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="bg-gray-50 border-t">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center space-x-6 text-sm">
              <Link href="/deals" className="flex items-center text-red-600 font-medium hover:underline">
                🔥 Today&apos;s Deals
              </Link>
              <Link href="/motors" className="hover:text-blue-600 hover:underline">Motors</Link>
              <Link href="/stores" className="hover:text-blue-600 hover:underline">Stores</Link>
              <Link href="/auctions" className="hover:text-blue-600 hover:underline">Auctions</Link>
              <Link href="/sell" className="hover:text-blue-600 hover:underline">Sell</Link>
              <Link href="/help" className="hover:text-blue-600 hover:underline">Help & Contact</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - eBay Style */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                Find Your Perfect Car Parts
              </h1>
              <p className="text-xl mb-6 text-blue-100">
                Bulgaria&apos;s largest marketplace for automotive parts with over 100,000 items
              </p>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  <span>Buyer Protection</span>
                </div>
                <div className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  <span>Fast Shipping</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Vehicle Search</h3>
                <div className="grid grid-cols-3 gap-3">
                  <select className="bg-white text-gray-900 px-3 py-2 rounded text-sm">
                    <option>Make</option>
                    <option>BMW</option>
                    <option>Mercedes</option>
                    <option>Audi</option>
                  </select>
                  <select className="bg-white text-gray-900 px-3 py-2 rounded text-sm">
                    <option>Model</option>
                  </select>
                  <select className="bg-white text-gray-900 px-3 py-2 rounded text-sm">
                    <option>Year</option>
                  </select>
                </div>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded mt-3 font-medium">
                  Find Parts
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories - eBay Style Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredCategories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow group"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">
                    <category.icon className="w-8 h-8 mx-auto text-gray-600 group-hover:text-blue-600" />
                  </div>
                  <h3 className="font-medium text-sm mb-1 group-hover:text-blue-600">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-500">{category.count} items</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Deals Section - eBay Style */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              🔥 Hot Deals - Ending Soon
            </h2>
            <Link href="/deals" className="text-blue-600 hover:underline">See all deals</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotDeals.map((deal) => (
              <div key={deal.id} className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow group relative">
                {/* Discount Badge */}
                <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  -{deal.discount}%
                </div>
                
                {/* Hot Badge */}
                {deal.isHot && (
                  <div className="absolute top-2 right-2 z-10 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center">
                    🔥 HOT
                  </div>
                )}

                {/* Product Image */}
                <div className="relative h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <Wrench className="w-16 h-16 text-gray-400" />
                  </div>
                  
                  {/* Time Left */}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span className="text-red-300">23h 45m left</span>
                  </div>
                </div>

                <div className="p-4">
                  {/* Title */}
                  <h3 className="font-medium text-gray-900 line-clamp-2 mb-2 hover:text-blue-600 cursor-pointer">
                    {deal.title}
                  </h3>

                  {/* Pricing */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Current bid</p>
                        <p className="text-lg font-bold text-green-600">
                          €{deal.currentBid.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-400 line-through">
                          €{deal.originalPrice.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Buy Now</p>
                        <p className="text-sm font-semibold text-blue-600">
                          €{deal.buyNowPrice!.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bid Info */}
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                    <span>{deal.bidsCount} bids</span>
                    <span>{deal.watchersCount} watching</span>
                  </div>

                  {/* Seller */}
                  <div className="text-xs text-gray-600 mb-3">
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      {deal.seller.name}
                    </span>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-400">
                        {'★'.repeat(Math.floor(deal.seller.rating))}
                      </div>
                      <span className="ml-1">({deal.seller.feedbackCount})</span>
                    </div>
                  </div>

                  {/* Shipping */}
                  <div className="text-xs text-gray-600 mb-4">
                    {deal.shipping === 0 ? (
                      <span className="text-green-600 font-medium">🚚 Free shipping</span>
                    ) : (
                      <span>🚚 +€{deal.shipping.toFixed(2)} shipping</span>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="space-y-2">
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors font-medium text-sm">
                      Place bid
                    </button>
                    <button className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors font-medium text-sm">
                      Buy It Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety - eBay Style */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Buyer Protection</h3>
              <p className="text-sm text-gray-600">Get your money back if the item doesn&apos;t match the description</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Fast Shipping</h3>
              <p className="text-sm text-gray-600">Most items ship within 24 hours with tracking</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">Get help anytime with our customer service team</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}