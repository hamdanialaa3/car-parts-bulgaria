"use client";
import React from 'react';
import { useComparisonStore } from '../../store/comparison';
import { Heart, Scale, Check } from 'lucide-react';
import Image from 'next/image';

export interface ProductCardData {
  id: string;
  title: string;
  price: number;
  images?: string[] | null;
  vendor?: { companyName?: string };
}

interface ProductCardProps {
  product: ProductCardData;
  onClick?: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { items, add, remove } = useComparisonStore();
  const inCompare = items.some(i => i.id === product.id);

  function toggleCompare() {
    if (inCompare) remove(product.id);
    else add({ id: product.id, title: product.title, price: product.price, image: product.images?.[0] || null, vendor: product.vendor?.companyName });
  }

  return (
    <div className="border rounded-lg p-3 bg-white flex flex-col group">
      <button onClick={() => onClick?.(product.id)} className="text-left flex-1">
        <div className="aspect-square bg-gray-50 rounded mb-2 flex items-center justify-center overflow-hidden">
          {product.images?.[0] ? (
            <Image src={product.images[0]} alt={product.title} width={160} height={160} className="object-cover w-full h-full" />
          ) : (
            <span className="text-xs text-gray-400">No Image</span>
          )}
        </div>
        <div className="text-sm font-medium line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">{product.title}</div>
        {product.vendor?.companyName && <div className="text-[11px] text-gray-500 mb-1">{product.vendor.companyName}</div>}
        <div className="text-blue-700 font-semibold mb-2">€{product.price.toFixed(2)}</div>
      </button>
      <div className="flex items-center justify-between mt-auto pt-1">
        <button className="text-gray-500 hover:text-red-600 p-1" title="Wishlist"><Heart className="h-4 w-4" /></button>
        <button onClick={toggleCompare} className={`text-xs flex items-center gap-1 px-2 py-1 rounded border ${inCompare ? 'bg-green-50 text-green-700 border-green-200' : 'hover:bg-orange-50 text-gray-600 border-gray-300'}`}> {inCompare ? <><Check className="h-3 w-3" /> Added</> : <><Scale className="h-3 w-3" /> Compare</>} </button>
      </div>
    </div>
  );
};
