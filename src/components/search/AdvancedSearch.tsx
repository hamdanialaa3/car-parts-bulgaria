'use client';

import { useState } from 'react';
import { ChevronDown, Search, SlidersHorizontal } from 'lucide-react';

export default function AdvancedSearch() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    make: '',
    model: '',
    yearFrom: '',
    yearTo: '',
    priceFrom: '',
    priceTo: '',
    condition: '',
    location: ''
  });

  const handleSearch = () => {
    // Handle search logic here
  };

  return (
    <div className="bg-gray-50 border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Advanced Search</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filters</span>
          <ChevronDown className={`h-4 w-4 transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <select
          value={filters.category}
          onChange={(e) => setFilters({...filters, category: e.target.value})}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="">All Categories</option>
          <option value="engine">Engine Parts</option>
          <option value="brake">Brake System</option>
          <option value="suspension">Suspension</option>
        </select>

        <select
          value={filters.make}
          onChange={(e) => setFilters({...filters, make: e.target.value})}
          className="border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="">All Makes</option>
          <option value="bmw">BMW</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>

        <input
          type="text"
          placeholder="Model"
          value={filters.model}
          onChange={(e) => setFilters({...filters, model: e.target.value})}
          className="border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <input
            type="number"
            placeholder="Year From"
            value={filters.yearFrom}
            onChange={(e) => setFilters({...filters, yearFrom: e.target.value})}
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
          <input
            type="number"
            placeholder="Year To"
            value={filters.yearTo}
            onChange={(e) => setFilters({...filters, yearTo: e.target.value})}
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
          <input
            type="number"
            placeholder="Price From (€)"
            value={filters.priceFrom}
            onChange={(e) => setFilters({...filters, priceFrom: e.target.value})}
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
          <input
            type="number"
            placeholder="Price To (€)"
            value={filters.priceTo}
            onChange={(e) => setFilters({...filters, priceTo: e.target.value})}
            className="border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
      )}

      <button
        onClick={handleSearch}
        className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
      >
        <Search className="h-4 w-4" />
        <span>Search Parts</span>
      </button>
    </div>
  );
}
