/**
 * Car Brands Grid for Homepage (eBay-style)
 * 🇧🇬 Bulgaria Car Parts Platform
 * 💰 Currency: EUR
 * 🌐 Languages: Bulgarian/English
 * 📏 Max 300 lines per file
 */

'use client';

import Image from 'next/image';

interface CarBrand {
  name: string;
  logo: string;
  bg: string;
}

const BRANDS: CarBrand[] = [
  { name: 'BMW', logo: '/brands/bmw.png', bg: 'bg-blue-50' },
  { name: 'Mercedes', logo: '/brands/mercedes.png', bg: 'bg-gray-50' },
  { name: 'Audi', logo: '/brands/audi.png', bg: 'bg-gray-100' },
  { name: 'Volkswagen', logo: '/brands/vw.png', bg: 'bg-blue-100' },
  { name: 'Toyota', logo: '/brands/toyota.png', bg: 'bg-red-50' },
  { name: 'Opel', logo: '/brands/opel.png', bg: 'bg-yellow-50' },
  { name: 'Renault', logo: '/brands/renault.png', bg: 'bg-yellow-100' },
  { name: 'Peugeot', logo: '/brands/peugeot.png', bg: 'bg-blue-200' },
  { name: 'Ford', logo: '/brands/ford.png', bg: 'bg-blue-50' },
  { name: 'Skoda', logo: '/brands/skoda.png', bg: 'bg-green-50' }
];

interface CarBrandsGridProps {
  onBrandClick?: (brand: string) => void;
}

export const CarBrandsGrid: React.FC<CarBrandsGridProps> = ({ onBrandClick }) => {
  return (
    <section className="my-8">
      <h2 className="text-xl font-bold mb-4 text-gray-900">
        Търси по марка / Search by Brand
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {BRANDS.map((brand) => (
          <button
            key={brand.name}
            className={`flex flex-col items-center p-4 rounded-lg shadow-sm hover:shadow-md transition ${brand.bg}`}
            onClick={() => onBrandClick?.(brand.name)}
            aria-label={brand.name}
          >
            <div className="w-16 h-16 flex items-center justify-center mb-2">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <span className="text-sm font-medium text-gray-700">{brand.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
};
