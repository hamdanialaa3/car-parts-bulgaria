/**
 * Featured Products Grid for Homepage (eBay-style)
 * 🇧🇬 Bulgaria Car Parts Platform
 * 💰 Currency: EUR
 * 🌐 Languages: Bulgarian/English
 * 📏 Max 300 lines per file
 */

'use client';

import Image from 'next/image';
import { formatCurrency } from '../seller/dashboard/utils';

export interface FeaturedProduct {
  id: string;
  title: string;
  image: string;
  price: number;
  brand: string;
  year: string;
  isNew?: boolean;
}

interface FeaturedProductsProps {
  products: FeaturedProduct[];
  onProductClick?: (id: string) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products, onProductClick }) => {
  return (
    <section className="my-8">
      <h2 className="text-xl font-bold mb-4 text-gray-900">
        Оферти на деня / Deals of the Day
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col"
          >
            <div className="relative w-full h-40 mb-2">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain rounded-t-lg"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              {product.isNew && (
                <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                  Ново / New
                </span>
              )}
            </div>
            <div className="flex-1 flex flex-col px-4 pb-4">
              <h3 className="font-semibold text-gray-800 text-base mb-1 truncate" title={product.title}>
                {product.title}
              </h3>
              <div className="text-xs text-gray-500 mb-2">
                {product.brand} • {product.year}
              </div>
              <div className="font-bold text-lg text-blue-700 mb-2">
                {formatCurrency(product.price)}
              </div>
              <button
                onClick={() => onProductClick?.(product.id)}
                className="mt-auto bg-orange-500 hover:bg-orange-600 text-white rounded px-3 py-2 text-sm font-medium transition"
              >
                Виж детайли / View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
