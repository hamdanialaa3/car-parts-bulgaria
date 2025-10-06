/**
 * Advanced Search Bar for Car Parts Platform (eBay-style)
 * 🇧🇬 Bulgaria Car Parts Platform
 * 💰 Currency: EUR
 * 🌐 Languages: Bulgarian/English
 * 📏 Max 300 lines per file
 */


'use client';

import React from 'react';

import { Search } from 'lucide-react';
import { useCarData } from '../../hooks/useCarData';

interface AdvancedSearchBarProps {
  onSearch: (query: string, filters: Record<string, string>) => void;
  initialQuery?: string;
  initialFilters?: Record<string, string>;
}

export const AdvancedSearchBar: React.FC<AdvancedSearchBarProps> = ({
  onSearch,
  initialQuery = '',
  initialFilters = {}
}) => {
  const [query, setQuery] = React.useState(initialQuery);
  const [filters, setFilters] = React.useState<Record<string, string>>(initialFilters);
  const { loading, error, brands, getModelsByBrand, getYears } = useCarData();

  const selectedBrand = filters.make || '';
  const selectedModel = filters.model || '';
  const dynamicModels = selectedBrand ? getModelsByBrand(selectedBrand) : [];
  const dynamicYears = (selectedBrand && selectedModel) ? getYears(selectedBrand, selectedModel) : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, filters);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row items-center gap-4">
      <div className="flex-1 w-full flex items-center">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Търси части, марки, модели... / Search parts, brands, models..."
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700">
          <Search className="h-5 w-5" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 w-full md:w-auto">
        <select
          name="make"
          className="border border-gray-300 rounded px-3 py-2 text-sm min-w-[150px]"
          value={filters.make || ''}
          onChange={(e) => {
            handleFilterChange(e);
            // Reset dependent filters
            setFilters(f => ({ ...f, model: '', year: '' }));
          }}
          disabled={loading}
        >
          <option value="">Марка / Make {loading ? '...' : ''}</option>
          {brands.map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        <select
          name="model"
          className="border border-gray-300 rounded px-3 py-2 text-sm min-w-[150px]"
          value={filters.model || ''}
          onChange={(e) => {
            handleFilterChange(e);
            setFilters(f => ({ ...f, year: '' }));
          }}
          disabled={!selectedBrand || loading}
        >
          <option value="">Модел / Model {loading && '...'}</option>
          {dynamicModels.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <select
          name="year"
            className="border border-gray-300 rounded px-3 py-2 text-sm min-w-[120px]"
            value={filters.year || ''}
            onChange={handleFilterChange}
            disabled={!selectedBrand || !selectedModel || loading}
        >
          <option value="">Година / Year</option>
          {dynamicYears.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <select
          name="category"
          className="border border-gray-300 rounded px-3 py-2 text-sm min-w-[160px]"
          value={filters.category || ''}
          onChange={handleFilterChange}
        >
          <option value="">Категория / Category</option>
          <option value="engine">Двигател / Engine</option>
          <option value="brakes">Спирачна система / Brakes</option>
          <option value="suspension">Окачване / Suspension</option>
          <option value="electrical">Електрическа система / Electrical</option>
        </select>
        {error && (
          <span className="text-xs text-red-600">{error}</span>
        )}
      </div>
    </form>
  );
};
