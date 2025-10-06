/**
 * Listings Table Component for Seller Dashboard
 * 🇧🇬 Bulgaria Car Parts Platform  
 * 💰 Currency: EUR
 * 🌐 Languages: Bulgarian/English
 * 📏 Max 300 lines per file
 */

'use client';

import { Eye, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Listing } from './types';
import { formatCurrency } from './utils';

interface ListingsTableProps {
  listings: Listing[];
  onViewListing?: (id: string) => void;
  onEditListing?: (id: string) => void;
  onDeleteListing?: (id: string) => void;
}

/**
 * Listings Table Component
 * Displays active listings with management actions
 */
export const ListingsTable: React.FC<ListingsTableProps> = ({
  listings,
  onViewListing,
  onEditListing,
  onDeleteListing
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Active Listings</h3>
          <button className="text-blue-600 hover:text-blue-800 text-sm">
            View all
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Views
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Watchers
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {listings.map((listing) => (
              <tr key={listing.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {listing.imageUrl && (
                      <Image 
                        className="h-10 w-10 rounded-lg object-cover mr-3" 
                        src={listing.imageUrl} 
                        alt={listing.title}
                        width={40}
                        height={40}
                      />
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {listing.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {listing.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {listing.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(listing.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StockBadge quantity={listing.quantity} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {listing.views}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {listing.watchers}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <ListingActions 
                    listingId={listing.id}
                    onView={onViewListing}
                    onEdit={onEditListing}
                    onDelete={onDeleteListing}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/**
 * Stock Badge Component
 */
interface StockBadgeProps {
  quantity: number;
}

export const StockBadge: React.FC<StockBadgeProps> = ({ quantity }) => {
  const getStockColor = () => {
    if (quantity === 0) return 'bg-red-100 text-red-800';
    if (quantity < 10) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getStockText = () => {
    if (quantity === 0) return 'Out of stock';
    if (quantity < 10) return `Low (${quantity})`;
    return `${quantity} units`;
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStockColor()}`}>
      {getStockText()}
    </span>
  );
};

/**
 * Listing Actions Component  
 */
interface ListingActionsProps {
  listingId: string;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const ListingActions: React.FC<ListingActionsProps> = ({
  listingId,
  onView,
  onEdit,
  onDelete
}) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onView?.(listingId)}
        className="text-gray-600 hover:text-blue-600"
        title="View listing"
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        onClick={() => onEdit?.(listingId)}
        className="text-gray-600 hover:text-green-600"
        title="Edit listing"
      >
        <Edit className="h-4 w-4" />
      </button>
      <button
        onClick={() => onDelete?.(listingId)}
        className="text-gray-600 hover:text-red-600"
        title="Delete listing"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

/**
 * Listings Filter Component
 */
interface ListingsFilterProps {
  onFilterChange?: (filters: { category?: string; status?: string; type?: string }) => void;
}

export const ListingsFilter: React.FC<ListingsFilterProps> = ({ onFilterChange }) => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <select 
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        onChange={(e) => onFilterChange?.({ category: e.target.value })}
      >
        <option value="">All Categories</option>
        <option value="Engine Parts">Engine Parts</option>
        <option value="Brake System">Brake System</option>
        <option value="Electrical">Electrical</option>
        <option value="Body Parts">Body Parts</option>
      </select>
      
      <select 
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        onChange={(e) => onFilterChange?.({ status: e.target.value })}
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="ending-soon">Ending Soon</option>
        <option value="sold">Sold</option>
      </select>
      
      <select 
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        onChange={(e) => onFilterChange?.({ type: e.target.value })}
      >
        <option value="">All Types</option>
        <option value="auction">Auction</option>
        <option value="fixed">Fixed Price</option>
      </select>
    </div>
  );
};

/**
 * Listings Summary Component
 */
interface ListingsSummaryProps {
  totalListings: number;
  activeListings: number;
  soldListings: number;
  endingSoonListings: number;
}

export const ListingsSummary: React.FC<ListingsSummaryProps> = ({
  totalListings,
  activeListings,
  soldListings,
  endingSoonListings
}) => {
  const summaryItems = [
    { label: 'Total Listings', value: totalListings, color: 'text-blue-600' },
    { label: 'Active', value: activeListings, color: 'text-green-600' },
    { label: 'Sold', value: soldListings, color: 'text-gray-600' },
    { label: 'Ending Soon', value: endingSoonListings, color: 'text-red-600' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {summaryItems.map((item, index) => (
        <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
          <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
          <div className="text-sm text-gray-600">{item.label}</div>
        </div>
      ))}
    </div>
  );
};