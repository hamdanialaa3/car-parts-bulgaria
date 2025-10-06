'use client';

import { useState } from 'react';
import { 
  Heart, Share2, MessageCircle, Star, MapPin,
  Truck, Shield, CheckCircle, Scale, Check
} from 'lucide-react';
import { useComparisonStore } from '../../store/comparison';
import Image from 'next/image';

interface VehicleCompat {
  brand?: { name: string };
  model?: { name: string };
  year?: { year: number };
}

interface PartDetailsProps {
  part: {
    id: string;
    title: string;
    description: string;
    price: number;
    currency: string;
    category: string;
    make: string;
    model: string;
    year?: number;
    condition: string;
    location: string;
    partNumber?: string;
    compatibility?: string[];
    compatibilities?: VehicleCompat[];
    createdAt: string;
    images: Array<{
      id: string;
      url: string;
      isPrimary: boolean;
    }>;
    vendor: {
      id: string;
      businessName: string;
      rating: number;
      reviewCount: number;
      location: string;
      phone?: string;
      isVerified: boolean;
      logoUrl?: string;
    };
  };
}

export default function PartDetails({ part }: PartDetailsProps) {
  // const t = useTranslations(); // reserved for future localization usage
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const { items: compareItems, add: addCompare, remove: removeCompare } = useComparisonStore();
  const inCompare = compareItems.some(i => i.id === part.id);
  const [quantity, setQuantity] = useState(1);

  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite);
    // TODO: API call to add/remove from favorites
  };

  const handleContactVendor = () => {
    // TODO: Open contact modal or redirect to vendor page
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: part.title,
        text: `Check out this ${part.make} ${part.model} part`,
        url: window.location.href,
      });
    }
  };

  const toggleCompare = () => {
    if (inCompare) removeCompare(part.id); else addCompare({ id: part.id, title: part.title, price: part.price, vendor: part.vendor.businessName, image: part.images[0]?.url });
  };

  // Helper: format compatibility
  function formatCompat(c: VehicleCompat): string {
    if (!c) return '';
    const parts: string[] = [];
    if (c.brand?.name) parts.push(c.brand.name);
    if (c.model?.name) parts.push(c.model.name);
    if (c.year?.year) parts.push(String(c.year.year));
    return parts.join(' ');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images Section */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
            <Image
              src={part.images[selectedImageIndex]?.url || '/placeholder-car-part.jpg'}
              alt={part.title}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Thumbnail Images */}
          {part.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {part.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => handleImageSelect(index)}
                  className={`flex-shrink-0 w-20 h-20 bg-gray-50 rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index 
                      ? 'border-blue-500' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={`${part.title} - Image ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          {/* Title and Price */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {part.title}
            </h1>
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl font-bold text-green-600">
                {part.price} {part.currency}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleAddToFavorites}
                  className={`p-2 rounded-full border ${
                    isFavorite 
                      ? 'bg-red-50 border-red-200 text-red-600' 
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100"
                >
                  <Share2 className="h-5 w-5" />
                </button>
                <button
                  onClick={toggleCompare}
                  className={`p-2 rounded-full border ${inCompare ? 'bg-green-50 border-green-200 text-green-600' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'}`}
                  title="Add to compare"
                >
                  {inCompare ? <Check className="h-5 w-5" /> : <Scale className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Part Information */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Category</span>
                <p className="font-medium">{part.category}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Condition</span>
                <p className="font-medium">{part.condition}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Make</span>
                <p className="font-medium">{part.make}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Model</span>
                <p className="font-medium">{part.model}</p>
              </div>
              {part.year && (
                <div>
                  <span className="text-sm text-gray-500">Year</span>
                  <p className="font-medium">{part.year}</p>
                </div>
              )}
              {part.partNumber && (
                <div>
                  <span className="text-sm text-gray-500">Part Number</span>
                  <p className="font-medium">{part.partNumber}</p>
                </div>
              )}
            </div>
            {/* Compatibility Section (detailed) */}
            {Array.isArray(part.compatibilities) && part.compatibilities.length > 0 && (
              <div className="pt-3 border-t">
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2"><Shield className="h-4 w-4 text-blue-600" /> Compatibility</h4>
                <ul className="text-xs text-gray-600 space-y-1 max-h-32 overflow-y-auto">
                  {part.compatibilities.map((c, i) => (
                    <li key={i} className="truncate">{formatCompat(c)}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Vendor Information */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              {part.vendor.logoUrl ? (
                <Image
                  src={part.vendor.logoUrl}
                  alt={part.vendor.businessName}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-lg">
                    {part.vendor.businessName.charAt(0)}
                  </span>
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900">
                    {part.vendor.businessName}
                  </h3>
                  {part.vendor.isVerified && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">
                    {part.vendor.rating} ({part.vendor.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <MapPin className="h-4 w-4 mr-1" />
              {part.vendor.location}
            </div>

            <button
              onClick={handleContactVendor}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Contact Vendor</span>
            </button>
          </div>

          {/* Purchase Options */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                Quantity:
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                Buy Now
              </button>
              <button className="border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                Add to Cart
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="flex space-x-4 text-sm">
            <div className="flex items-center space-x-1 text-green-600">
              <Truck className="h-4 w-4" />
              <span>Fast Shipping</span>
            </div>
            <div className="flex items-center space-x-1 text-blue-600">
              <Shield className="h-4 w-4" />
              <span>Returns Accepted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      {part.description && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">{part.description}</p>
          </div>
        </div>
      )}

      {/* Compatibility */}
      {part.compatibility && part.compatibility.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Compatibility</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex flex-wrap gap-2">
              {part.compatibility.map((item, index) => (
                <span
                  key={index}
                  className="bg-white px-3 py-1 rounded-full text-sm border border-gray-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}