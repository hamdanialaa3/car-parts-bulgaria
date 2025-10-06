'use client';

import { useState, useEffect } from 'react';
import { Clock, Gavel, Eye, Heart, TrendingUp } from 'lucide-react';

interface AuctionCardProps {
  auction: {
    id: string;
    title: string;
    currentBid: number;
    buyNowPrice?: number;
    endTime: string;
    bidsCount: number;
    watchersCount: number;
    images: string[];
    seller: {
      name: string;
      rating: number;
      feedbackCount: number;
    };
    shippingCost: number;
    isHot?: boolean;
  };
}

export default function AuctionCard({ auction }: AuctionCardProps) {
  const [timeLeft, setTimeLeft] = useState('');
  const [isWatching, setIsWatching] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const endTime = new Date(auction.endTime).getTime();
      const difference = endTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        } else if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeLeft(`${minutes}m ${seconds}s`);
        }
      } else {
        setTimeLeft('ENDED');
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [auction.endTime]);

  const getTimeLeftColor = () => {
    if (timeLeft === 'ENDED') return 'text-red-600';
    if (timeLeft.includes('h') && !timeLeft.includes('d')) return 'text-orange-600';
    if (timeLeft.includes('m') && !timeLeft.includes('h')) return 'text-red-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow group relative">
      {/* Hot Badge */}
      {auction.isHot && (
        <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center">
          🔥 HOT
        </div>
      )}

      {/* Watch Button */}
      <button
        onClick={() => setIsWatching(!isWatching)}
        className={`absolute top-2 right-2 z-10 p-2 bg-white/90 rounded-full hover:bg-white transition-colors ${
          isWatching ? 'text-red-500' : 'text-gray-600'
        }`}
      >
        <Heart className={`h-4 w-4 ${isWatching ? 'fill-current' : ''}`} />
      </button>

      {/* Main Image */}
      <div className="relative h-48 bg-gray-100 rounded-t-lg overflow-hidden">
        <img
          src={auction.images[0]}
          alt={auction.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Time Left Overlay */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          <span className={getTimeLeftColor()}>{timeLeft}</span>
        </div>
      </div>

      <div className="p-4">
        {/* Title */}
        <h3 className="font-medium text-gray-900 line-clamp-2 mb-2 hover:text-blue-600 cursor-pointer">
          {auction.title}
        </h3>

        {/* Current Bid */}
        <div className="mb-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Current bid</p>
              <p className="text-lg font-bold text-green-600">
                €{auction.currentBid.toFixed(2)}
              </p>
            </div>
            {auction.buyNowPrice && (
              <div className="text-right">
                <p className="text-xs text-gray-500">Buy Now</p>
                <p className="text-sm font-semibold text-blue-600">
                  €{auction.buyNowPrice.toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bid Info */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <Gavel className="h-4 w-4 mr-1" />
              {auction.bidsCount} bids
            </span>
            <span className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {auction.watchersCount} watching
            </span>
          </div>
        </div>

        {/* Seller Info */}
        <div className="flex items-center justify-between mb-3 text-sm">
          <div>
            <p className="text-gray-600">Seller: 
              <span className="text-blue-600 hover:underline cursor-pointer ml-1">
                {auction.seller.name}
              </span>
            </p>
            <div className="flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-xs ${
                    i < Math.floor(auction.seller.rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}>
                    ⭐
                  </span>
                ))}
              </div>
              <span className="text-gray-500 ml-1">({auction.seller.feedbackCount})</span>
            </div>
          </div>
        </div>

        {/* Shipping */}
        <div className="text-sm text-gray-600 mb-4">
          {auction.shippingCost === 0 ? (
            <span className="text-green-600 font-medium">🚚 Free shipping</span>
          ) : (
            <span>🚚 Shipping: €{auction.shippingCost.toFixed(2)}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center">
            <Gavel className="h-4 w-4 mr-2" />
            Place Bid
          </button>
          
          {auction.buyNowPrice && (
            <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium">
              Buy It Now
            </button>
          )}
          
          <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
            Add to Watch List
          </button>
        </div>

        {/* Hot Trending Indicator */}
        {auction.bidsCount > 10 && (
          <div className="mt-2 flex items-center text-red-600 text-xs">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>Hot item - {auction.bidsCount} bids!</span>
          </div>
        )}
      </div>
    </div>
  );
}