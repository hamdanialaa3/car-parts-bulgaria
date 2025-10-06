/**
 * Stats Cards Component for Seller Dashboard
 * 🇧🇬 Bulgaria Car Parts Platform
 * 💰 Currency: EUR
 * 🌐 Languages: Bulgarian/English
 * 📏 Max 300 lines per file
 */

'use client';

import { DollarSign, ShoppingCart, Package, Star } from 'lucide-react';
import { SellerStats } from './types';
import { formatCurrency, formatNumber, calculatePercentageChange } from './utils';

interface StatsCardsProps {
  stats: SellerStats;
  previousStats?: SellerStats;
}

/**
 * Individual Stat Card Component
 */
interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  iconBgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon, 
  iconBgColor 
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {typeof value === 'number' ? formatNumber(value) : value}
          </p>
        </div>
        <div className={`${iconBgColor} p-2 rounded-lg`}>
          {icon}
        </div>
      </div>
      {change && (
        <div className={`mt-2 text-sm ${getChangeColor()}`}>
          {change} from last month
        </div>
      )}
    </div>
  );
};

/**
 * Main Stats Cards Component
 * Displays key seller metrics in a responsive grid
 */
export const StatsCards: React.FC<StatsCardsProps> = ({ stats, previousStats }) => {
  // Calculate changes if previous stats are provided
  const salesChange = previousStats 
    ? calculatePercentageChange(stats.totalSales, previousStats.totalSales)
    : '+12.5%';
  
  const ordersChange = previousStats
    ? calculatePercentageChange(stats.totalOrders, previousStats.totalOrders) 
    : '+8.2%';

  const statsData = [
    {
      title: 'Total Sales',
      value: formatCurrency(stats.totalSales),
      change: salesChange,
      changeType: 'positive' as const,
      icon: <DollarSign className="h-6 w-6 text-green-600" />,
      iconBgColor: 'bg-green-100'
    },
    {
      title: 'Total Orders', 
      value: stats.totalOrders,
      change: ordersChange,
      changeType: 'positive' as const,
      icon: <ShoppingCart className="h-6 w-6 text-blue-600" />,
      iconBgColor: 'bg-blue-100'
    },
    {
      title: 'Active Listings',
      value: stats.activeListings,
      change: `${stats.soldThisMonth} sold this month`,
      changeType: 'neutral' as const,
      icon: <Package className="h-6 w-6 text-purple-600" />,
      iconBgColor: 'bg-purple-100'
    },
    {
      title: 'Average Rating',
      value: stats.averageRating.toFixed(1),
      change: `From 2,847 reviews`,
      changeType: 'positive' as const,
      icon: <Star className="h-6 w-6 text-yellow-600" />,
      iconBgColor: 'bg-yellow-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          changeType={stat.changeType}
          icon={stat.icon}
          iconBgColor={stat.iconBgColor}
        />
      ))}
    </div>
  );
};

/**
 * Performance Metrics Component
 * Shows detailed analytics in a compact format
 */
interface PerformanceMetricsProps {
  stats: SellerStats;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ stats }) => {
  const metrics = [
    {
      label: 'Total Views',
      value: formatNumber(stats.totalViews)
    },
    {
      label: 'Watchers', 
      value: formatNumber(stats.watchersCount)
    },
    {
      label: 'Conversion Rate',
      value: '7.2%',
      highlight: true
    },
    {
      label: 'Avg. Selling Price',
      value: '€65.16'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Performance Metrics</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{metric.label}</span>
              <span className={`font-semibold ${
                metric.highlight ? 'text-green-600' : 'text-gray-900'
              }`}>
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Quick Actions Component
 * Provides shortcuts for common seller tasks
 */
interface QuickActionsProps {
  onCreateListing?: () => void;
  onBulkImport?: () => void;
  onViewAnalytics?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onCreateListing,
  onBulkImport, 
  onViewAnalytics
}) => {
  const actions = [
    {
      label: 'Create new listing',
      icon: '+',
      onClick: onCreateListing,
      hoverColor: 'hover:border-blue-500 hover:bg-blue-50'
    },
    {
      label: 'Bulk import items',
      icon: '📥',
      onClick: onBulkImport,
      hoverColor: 'hover:border-green-500 hover:bg-green-50'
    },
    {
      label: 'View analytics',
      icon: '📈',
      onClick: onViewAnalytics,
      hoverColor: 'hover:border-purple-500 hover:bg-purple-50'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg transition-colors ${action.hoverColor}`}
          >
            <span className="text-2xl mr-2">{action.icon}</span>
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};