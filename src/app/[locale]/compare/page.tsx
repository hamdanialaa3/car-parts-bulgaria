"use client";
import React from 'react';
import { useComparisonStore } from '../../../store/comparison';

export default function ComparePage() {
  const { items, remove, clear } = useComparisonStore();
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Compare Products</h1>
        {items.length > 0 && <button onClick={clear} className="text-sm text-red-600 hover:underline">Clear All</button>}
      </div>
      {items.length === 0 && <p className="text-gray-500">No products selected.</p>}
      {items.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 text-left text-xs font-semibold">Feature</th>
                {items.map(i => (
                  <th key={i.id} className="p-2 text-left text-xs font-semibold">
                    <div className="flex items-center justify-between gap-2">
                      <span className="line-clamp-2 text-xs font-medium">{i.title}</span>
                      <button onClick={() => remove(i.id)} className="text-red-600 text-[11px]">x</button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-xs">
              <tr>
                <td className="p-2 font-medium">Price</td>
                {items.map(i => <td key={i.id} className="p-2">€{i.price.toFixed(2)}</td>)}
              </tr>
              <tr>
                <td className="p-2 font-medium">Vendor</td>
                {items.map(i => <td key={i.id} className="p-2">{i.vendor || '-'}</td>)}
              </tr>
              <tr>
                <td className="p-2 font-medium">Image</td>
                {items.map(i => <td key={i.id} className="p-2 text-gray-400 italic">(preview)</td>)}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
