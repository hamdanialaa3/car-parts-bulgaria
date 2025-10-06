'use client';

import { useState } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, Star, MapPin, Truck, Calendar, DollarSign, Car } from 'lucide-react';

interface SearchFilters {
  category: string;
  make: string;
  model: string;
  year: string;
  priceMin: string;
  priceMax: string;
  condition: string[];
  location: string;
  shipping: string[];
  sellerType: string[];
  listingType: string[];
  itemLocation: string;
  sortBy: string;
}

export default function EbayAdvancedSearch() {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    category: 'all',
    make: '',
    model: '',
    year: '',
    priceMin: '',
    priceMax: '',
    condition: [],
    location: '',
    shipping: [],
    sellerType: [],
    listingType: [],
    itemLocation: '',
    sortBy: 'best-match'
  });

  const [activeFilterCount, setActiveFilterCount] = useState(0);

  const categories = [
    'All Categories',
    'Engine Parts',
    'Brake System',
    'Electrical System',
    'Body Parts',
    'Interior Parts',
    'Wheels & Tires',
    'Exhaust System',
    'Suspension',
    'Transmission',
    'Cooling System',
    'Fuel System'
  ];

  const carMakes = [
    'Any Make', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Ford', 
    'Toyota', 'Honda', 'Peugeot', 'Renault', 'Opel', 'Skoda', 'Hyundai'
  ];

  const conditions = [
    { id: 'new', label: 'New', count: '45,230' },
    { id: 'used', label: 'Used', count: '23,156' },
    { id: 'refurbished', label: 'Refurbished', count: '8,945' },
    { id: 'for-parts', label: 'For parts or not working', count: '3,456' }
  ];

  const locations = [
    'All of Bulgaria',
    'Sofia',
    'Plovdiv', 
    'Varna',
    'Burgas',
    'Ruse',
    'Stara Zagora',
    'Pleven',
    'Sliven',
    'Dobrich'
  ];

  const shippingOptions = [
    { id: 'free', label: 'Free shipping', count: '12,345' },
    { id: 'fast', label: 'Fast shipping (1-2 days)', count: '8,967' },
    { id: 'local', label: 'Local pickup available', count: '15,234' }
  ];

  const sellerTypes = [
    { id: 'individual', label: 'Individual seller', count: '25,678' },
    { id: 'business', label: 'Business seller', count: '18,234' },
    { id: 'top-rated', label: 'Top Rated seller', count: '9,456' }
  ];

  const listingTypes = [
    { id: 'auction', label: 'Auction', count: '8,234' },
    { id: 'buy-now', label: 'Buy It Now', count: '34,567' },
    { id: 'best-offer', label: 'Best Offer', count: '12,890' }
  ];

  const sortOptions = [
    { value: 'best-match', label: 'Best Match' },
    { value: 'price-low', label: 'Price + shipping: lowest first' },
    { value: 'price-high', label: 'Price + shipping: highest first' },
    { value: 'distance', label: 'Distance: nearest first' },
    { value: 'time-ending', label: 'Time: ending soonest' },
    { value: 'time-new', label: 'Time: newly listed' }
  ];

  const handleFilterToggle = (filterType: keyof SearchFilters, value: string) => {
    setFilters(prev => {
      const current = prev[filterType];
      if (Array.isArray(current)) {
        const newArray = current.includes(value as never)
          ? current.filter(item => item !== value)
          : [...current, value as never];
        return { ...prev, [filterType]: newArray };
      }
      return prev;
    });
  };

  const clearAllFilters = () => {
    setFilters({
      category: 'all',
      make: '',
      model: '',
      year: '',
      priceMin: '',
      priceMax: '',
      condition: [],
      location: '',
      shipping: [],
      sellerType: [],
      listingType: [],
      itemLocation: '',
      sortBy: 'best-match'
    });
    setActiveFilterCount(0);
  };

  return (
    <div className="bg-white">
      {/* Main Search Bar */}
      <div className="border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            {/* Category Dropdown */}
            <div className="relative">
              <select 
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="appearance-none bg-gray-50 border border-gray-300 px-4 py-3 pr-10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
              >
                {categories.map((cat, index) => (
                  <option key={index} value={cat.toLowerCase().replace(/\s+/g, '-')}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-600 pointer-events-none" />
            </div>

            {/* Search Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search for car parts, brands, or models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* Advanced Search Toggle */}
            <button
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
            >
              <Filter className="h-4 w-4 mr-2" />
              Advanced
              {isAdvancedOpen ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
            </button>

            {/* Search Button */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center font-medium">
              <Search className="h-4 w-4 mr-2" />
              Search
            </button>
          </div>

          {/* Active Filters Display */}
          {activeFilterCount > 0 && (
            <div className="mt-3 flex items-center space-x-2">
              <span className="text-sm text-gray-600">Filters applied:</span>
              <div className="flex items-center space-x-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {activeFilterCount} filters active
                </span>
                <button
                  onClick={clearAllFilters}
                  className="text-blue-600 hover:text-blue-800 text-xs underline"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Advanced Search Panel */}
      {isAdvancedOpen && (
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="max-w-7xl mx-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column - Vehicle & Category */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Car className="w-5 h-5 mr-2" />
                    Vehicle Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
                      <select 
                        value={filters.make}
                        onChange={(e) => setFilters(prev => ({ ...prev, make: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {carMakes.map((make, index) => (
                          <option key={index} value={make.toLowerCase().replace(/\s+/g, '-')}>
                            {make}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                      <input 
                        type="text"
                        placeholder="e.g., E90, C-Class, A4"
                        value={filters.model}
                        onChange={(e) => setFilters(prev => ({ ...prev, model: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                      <div className="flex space-x-2">
                        <input 
                          type="number"
                          placeholder="From"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input 
                          type="number"
                          placeholder="To"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Price Range (EUR)
                  </h3>
                  <div className="flex space-x-2">
                    <input 
                      type="number"
                      placeholder="Min"
                      value={filters.priceMin}
                      onChange={(e) => setFilters(prev => ({ ...prev, priceMin: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="py-2 text-gray-500">to</span>
                    <input 
                      type="number"
                      placeholder="Max"
                      value={filters.priceMax}
                      onChange={(e) => setFilters(prev => ({ ...prev, priceMax: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Middle Column - Condition & Location */}
              <div className="space-y-6">
                {/* Condition */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Condition</h3>
                  <div className="space-y-2">
                    {conditions.map((condition) => (
                      <label key={condition.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.condition.includes(condition.id as never)}
                          onChange={() => handleFilterToggle('condition', condition.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          {condition.label}
                          <span className="text-gray-500 ml-1">({condition.count})</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Item location
                  </h3>
                  <select 
                    value={filters.itemLocation}
                    onChange={(e) => setFilters(prev => ({ ...prev, itemLocation: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {locations.map((location, index) => (
                      <option key={index} value={location.toLowerCase().replace(/\s+/g, '-')}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Shipping Options */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Truck className="h-4 w-4 mr-1" />
                    Shipping options
                  </h3>
                  <div className="space-y-2">
                    {shippingOptions.map((option) => (
                      <label key={option.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.shipping.includes(option.id as never)}
                          onChange={() => handleFilterToggle('shipping', option.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          {option.label}
                          <span className="text-gray-500 ml-1">({option.count})</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Seller & Listing Type */}
              <div className="space-y-6">
                {/* Seller Type */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Seller
                  </h3>
                  <div className="space-y-2">
                    {sellerTypes.map((type) => (
                      <label key={type.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.sellerType.includes(type.id as never)}
                          onChange={() => handleFilterToggle('sellerType', type.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          {type.label}
                          <span className="text-gray-500 ml-1">({type.count})</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Listing Type */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Listing type
                  </h3>
                  <div className="space-y-2">
                    {listingTypes.map((type) => (
                      <label key={type.id} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.listingType.includes(type.id as never)}
                          onChange={() => handleFilterToggle('listingType', type.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          {type.label}
                          <span className="text-gray-500 ml-1">({type.count})</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Sort by</h3>
                  <select 
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={clearAllFilters}
                className="text-gray-600 hover:text-gray-800 text-sm underline"
              >
                Clear all filters
              </button>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsAdvancedOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}