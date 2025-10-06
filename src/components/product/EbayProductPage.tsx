'use client';

import { useState } from 'react';
import { Heart, Share2, Flag, Eye, Clock, Shield, Truck, RotateCcw, MessageCircle, MapPin, Store, Award, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';

export default function EbayProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWatching, setIsWatching] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [bidAmount, setBidAmount] = useState('');

  // Mock product data
  const product = {
    id: 'BP-BMW-E90-001',
    title: 'BMW E90 E91 E92 E93 3 Series Front Brake Pads Set - Ceramic Performance Pads OEM Quality',
    images: [
      '/products/brake-pads-1.jpg',
      '/products/brake-pads-2.jpg', 
      '/products/brake-pads-3.jpg',
      '/products/brake-pads-4.jpg',
      '/products/brake-pads-5.jpg'
    ],
    currentBid: 89.99,
    buyNowPrice: 129.99,
    originalPrice: 189.99,
    endTime: '2024-01-18T15:30:00Z',
    bidsCount: 23,
    watchers: 67,
    views: 1247,
    isAuction: true,
    condition: 'New',
    category: 'Brake System > Brake Pads',
    partNumber: 'BP-E90-CERAMIC-FRONT',
    compatibility: ['BMW 3 Series E90 (2005-2011)', 'BMW 3 Series E91 (2005-2012)', 'BMW 3 Series E92 (2006-2013)'],
    description: `
      Professional-grade ceramic brake pads designed specifically for BMW E90/E91/E92/E93 3 Series.
      
      ✅ Premium ceramic compound for superior braking performance
      ✅ Low dust formula keeps wheels cleaner
      ✅ Reduced brake noise and vibration
      ✅ Direct OEM replacement - no modifications required
      ✅ Includes hardware kit and anti-squeal shims
      
      Technical Specifications:
      - Material: Ceramic composite
      - Operating temperature: -40°C to +650°C
      - Friction coefficient: 0.35-0.45
      - Wear rate: <0.25 mm per 10,000 km
      
      Fitment Information:
      - BMW 3 Series E90 Sedan (2005-2011)
      - BMW 3 Series E91 Touring (2005-2012) 
      - BMW 3 Series E92 Coupe (2006-2013)
      - BMW 3 Series E93 Convertible (2007-2013)
      
      Package includes:
      - 4x Front brake pads
      - Hardware kit
      - Anti-squeal shims
      - Installation guide
      
      Please verify compatibility with your specific vehicle before ordering.
    `,
    seller: {
      name: 'AutoParts_Sofia_Pro',
      rating: 4.9,
      feedbackCount: 2847,
      feedbackPercentage: 99.2,
      memberSince: '2019',
      location: 'Sofia, Bulgaria',
      businessSeller: true,
      topRated: true,
      fastShipping: true,
      returns: '30 days',
      responseTime: '< 1 hour'
    },
    shipping: {
      cost: 0,
      method: 'DPD Express',
      time: '1-2 business days',
      tracking: true,
      international: true
    },
    warranty: '24 months manufacturer warranty',
    returns: '30 days money back guarantee'
  };

  const [timeLeft] = useState('1d 23h 45m');

  const similarItems = [
    { id: 1, title: 'BMW E90 Rear Brake Pads Set', price: 79.99, image: '/similar/rear-pads.jpg', seller: 'AutoParts_Sofia_Pro' },
    { id: 2, title: 'BMW E90 Brake Discs Front Pair', price: 159.99, image: '/similar/brake-discs.jpg', seller: 'BG_CarParts' },
    { id: 3, title: 'BMW E90 Brake Fluid DOT4', price: 24.99, image: '/similar/brake-fluid.jpg', seller: 'MotorOil_BG' },
    { id: 4, title: 'BMW E90 Brake Lines Steel Braided', price: 89.99, image: '/similar/brake-lines.jpg', seller: 'Performance_Parts' }
  ];

  const tabs = [
    { id: 'description', label: 'Description', icon: '📝' },
    { id: 'compatibility', label: 'Compatibility', icon: '🔧' },
    { id: 'shipping', label: 'Shipping & Returns', icon: '🚚' },
    { id: 'reviews', label: 'Reviews (45)', icon: '⭐' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-2">
            <a href="/" className="hover:text-blue-600">Home</a>
            <span>›</span>
            <a href="/motors" className="hover:text-blue-600">Motors</a>
            <span>›</span>
            <a href="/parts" className="hover:text-blue-600">Car Parts</a>
            <span>›</span>
            <a href="/brake-system" className="hover:text-blue-600">Brake System</a>
            <span>›</span>
            <span className="text-gray-900">Brake Pads</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 mb-6">
              {/* Main Image */}
              <div className="relative mb-4">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-6xl">🔧</span>
                  </div>
                </div>
                
                {/* Image Navigation */}
                <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow">
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {selectedImage + 1} / {product.images.length}
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 bg-gray-100 rounded border-2 overflow-hidden ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-sm">🔧</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="bg-white rounded-lg">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <div className="flex space-x-8 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'description' && (
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-line text-gray-700">
                      {product.description}
                    </div>
                  </div>
                )}

                {activeTab === 'compatibility' && (
                  <div>
                    <h3 className="font-semibold mb-4">Compatible Vehicles</h3>
                    <div className="space-y-2">
                      {product.compatibility.map((vehicle, index) => (
                        <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          <span className="text-sm">{vehicle}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        ⚠️ Please verify compatibility with your specific vehicle VIN before ordering.
                        Contact seller if you need assistance with fitment verification.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-4 flex items-center">
                        <Truck className="h-5 w-5 mr-2" />
                        Shipping Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center mb-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span className="font-medium">Free Shipping</span>
                          </div>
                          <p className="text-sm text-gray-600">{product.shipping.method}</p>
                          <p className="text-sm text-gray-600">{product.shipping.time}</p>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center mb-2">
                            <RotateCcw className="h-4 w-4 mr-2 text-blue-600" />
                            <span className="font-medium">Returns</span>
                          </div>
                          <p className="text-sm text-gray-600">{product.returns}</p>
                          <p className="text-sm text-gray-600">Buyer pays return shipping</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-semibold">Customer Reviews</h3>
                      <div className="flex items-center">
                        <div className="flex text-yellow-400 mr-2">
                          {'★'.repeat(5)}
                        </div>
                        <span className="text-sm text-gray-600">4.8 out of 5 (45 reviews)</span>
                      </div>
                    </div>
                    
                    {/* Sample Reviews */}
                    <div className="space-y-4">
                      {[1, 2, 3].map((review) => (
                        <div key={review} className="border-b border-gray-200 pb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className="flex text-yellow-400 text-sm mr-2">
                                {'★'.repeat(5)}
                              </div>
                              <span className="text-sm font-medium">ivan_mechanic</span>
                            </div>
                            <span className="text-xs text-gray-500">2 days ago</span>
                          </div>
                          <p className="text-sm text-gray-700">
                            Perfect fit for my BMW E90. Great quality brake pads, much better than the previous ones. 
                            Fast shipping from Sofia. Highly recommended seller!
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Purchase Panel */}
          <div className="space-y-6">
            {/* Main Purchase Card */}
            <div className="bg-white rounded-lg p-6 sticky top-6">
              {/* Title */}
              <h1 className="text-xl font-semibold text-gray-900 mb-4 line-clamp-3">
                {product.title}
              </h1>

              {/* Condition & Part Number */}
              <div className="flex items-center justify-between mb-4 text-sm">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Condition: {product.condition}
                </span>
                <span className="text-gray-600">Part #: {product.partNumber}</span>
              </div>

              {/* Pricing */}
              <div className="mb-6">
                {product.isAuction && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Current bid</span>
                      <div className="flex items-center text-sm text-gray-600">
                        <Eye className="h-4 w-4 mr-1" />
                        {product.views} views
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      €{product.currentBid.toFixed(2)}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{product.bidsCount} bids</span>
                      <div className="flex items-center text-orange-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {timeLeft} left
                      </div>
                    </div>
                  </div>
                )}

                {product.buyNowPrice && (
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Buy It Now</span>
                      <span className="text-sm text-gray-400 line-through">
                        €{product.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      €{product.buyNowPrice.toFixed(2)}
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      Save €{(product.originalPrice - product.buyNowPrice).toFixed(2)} (
                      {Math.round(((product.originalPrice - product.buyNowPrice) / product.originalPrice) * 100)}% off)
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-3 mb-6">
                {product.isAuction && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your bid (minimum: €{(product.currentBid + 1).toFixed(2)})
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 py-2 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        €
                      </span>
                      <input
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        placeholder={(product.currentBid + 1).toFixed(2)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button className="w-full mt-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Place bid
                    </button>
                  </div>
                )}

                {product.buyNowPrice && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                      <div className="flex items-center">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-2 border border-gray-300 rounded-l-lg hover:bg-gray-50"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-20 px-3 py-2 border-t border-b border-gray-300 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-2 border border-gray-300 rounded-r-lg hover:bg-gray-50"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <button className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium text-lg">
                      Buy It Now
                    </button>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 border-t border-gray-200 pt-4">
                <button
                  onClick={() => setIsWatching(!isWatching)}
                  className={`w-full flex items-center justify-center py-2 px-4 border rounded-lg transition-colors ${
                    isWatching
                      ? 'border-red-300 bg-red-50 text-red-700'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isWatching ? 'fill-current' : ''}`} />
                  {isWatching ? 'Remove from Watchlist' : 'Add to Watchlist'}
                </button>
                
                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </button>
                  <button className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Flag className="h-4 w-4 mr-2" />
                    Report
                  </button>
                </div>
              </div>

              {/* Watching Count */}
              <div className="mt-4 text-center text-sm text-gray-600">
                {product.watchers} people are watching this item
              </div>
            </div>

            {/* Seller Information */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Seller information</h3>
                {product.seller.topRated && (
                  <div className="flex items-center bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                    <Award className="h-3 w-3 mr-1" />
                    Top Rated
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <Store className="h-4 w-4 mr-2 text-gray-600" />
                  <span className="text-blue-600 hover:underline cursor-pointer font-medium">
                    {product.seller.name}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <div className="flex text-yellow-400 text-sm mr-2">
                    {'★'.repeat(Math.floor(product.seller.rating))}
                  </div>
                  <span className="text-sm">
                    {product.seller.rating} ({product.seller.feedbackCount} reviews)
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {product.seller.location}
                </div>

                <div className="text-sm text-gray-600">
                  Member since {product.seller.memberSince}
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="bg-green-50 p-2 rounded">
                    <div className="font-medium text-green-800">
                      {product.seller.feedbackPercentage}%
                    </div>
                    <div className="text-green-600">Positive feedback</div>
                  </div>
                  <div className="bg-blue-50 p-2 rounded">
                    <div className="font-medium text-blue-800">
                      {product.seller.responseTime}
                    </div>
                    <div className="text-blue-600">Response time</div>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact seller
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold mb-4">Guarantees</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-green-600" />
                  <span className="text-sm">eBay Money Back Guarantee</span>
                </div>
                <div className="flex items-center">
                  <Truck className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="text-sm">Free shipping & tracking</span>
                </div>
                <div className="flex items-center">
                  <RotateCcw className="h-4 w-4 mr-2 text-purple-600" />
                  <span className="text-sm">{product.returns}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Items */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar sponsored items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-100 rounded-t-lg flex items-center justify-center">
                  <span className="text-4xl">🔧</span>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-sm mb-2 line-clamp-2">{item.title}</h3>
                  <div className="text-lg font-bold text-green-600 mb-2">€{item.price.toFixed(2)}</div>
                  <div className="text-xs text-gray-600">by {item.seller}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}