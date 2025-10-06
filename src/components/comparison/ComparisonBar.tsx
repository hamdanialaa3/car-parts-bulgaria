"use client";
import React from 'react';
import { useComparisonStore } from '../../store/comparison';
import { X } from 'lucide-react';
import Link from 'next/link';

export const ComparisonBar: React.FC = () => {
  const { items, remove, clear } = useComparisonStore();
  if (items.length === 0) return null;
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white shadow-lg border rounded-xl w-[90%] md:w-[60%] z-40 p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-sm">Comparison ({items.length}/4)</h4>
        <div className="flex gap-3">
          <button onClick={clear} className="text-xs text-red-600 hover:underline">Clear</button>
          <Link href="/en/compare" className="text-xs text-blue-600 hover:underline">Open</Link>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {items.map(item => (
          <div key={item.id} className="relative border rounded p-2 bg-gray-50">
            <button onClick={() => remove(item.id)} className="absolute -top-1 -right-1 bg-white border rounded-full p-0.5"><X className="h-3 w-3" /></button>
            <div className="text-[10px] font-medium line-clamp-2 mb-1">{item.title}</div>
            <div className="text-[11px] text-blue-700 font-semibold">€{item.price.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
