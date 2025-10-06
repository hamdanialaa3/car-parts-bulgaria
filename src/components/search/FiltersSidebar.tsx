"use client";
import React from 'react';
import { useCarData } from '../../hooks/useCarData';

interface FiltersSidebarProps {
  onChange: (filters: Record<string, string>) => void;
  value: Record<string, string>;
}

export const FiltersSidebar: React.FC<FiltersSidebarProps> = ({ onChange, value }) => {
  const { brands, getModelsByBrand, getYears } = useCarData();
  const brand = value.brand || '';
  const model = value.model || '';
  const models = brand ? getModelsByBrand(brand) : [];
  const years = brand && model ? getYears(brand, model) : [];

  function update(key: string, val: string) {
    const next = { ...value, [key]: val };
    if (key === 'brand') { next.model = ''; next.year = ''; }
    if (key === 'model') { next.year = ''; }
    onChange(next);
  }

  return (
    <aside className="space-y-4">
      <div>
        <label className="block text-xs font-semibold mb-1">Brand</label>
        <select value={brand} onChange={(e) => update('brand', e.target.value)} className="w-full border rounded px-2 py-1 text-sm">
          <option value="">All</option>
          {brands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1">Model</label>
        <select value={model} onChange={(e) => update('model', e.target.value)} className="w-full border rounded px-2 py-1 text-sm" disabled={!brand}>
          <option value="">All</option>
          {models.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1">Year</label>
        <select value={value.year || ''} onChange={(e) => update('year', e.target.value)} className="w-full border rounded px-2 py-1 text-sm" disabled={!brand || !model}>
          <option value="">All</option>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1">Min Price (€)</label>
        <input type="number" value={value.min || ''} onChange={(e) => update('min', e.target.value)} className="w-full border rounded px-2 py-1 text-sm" />
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1">Max Price (€)</label>
        <input type="number" value={value.max || ''} onChange={(e) => update('max', e.target.value)} className="w-full border rounded px-2 py-1 text-sm" />
      </div>
    </aside>
  );
};
