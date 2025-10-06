/**
 * Orders Table Component for Seller Dashboard
 * 🇧🇬 Bulgaria Car Parts Platform  
 * 💰 Currency: EUR
 * 🌐 Languages: Bulgarian/English
 * 📏 Max 300 lines per file
 */

'use client';

import { Eye, Package, Check, X } from 'lucide-react';
import { Order } from './types';
import { formatCurrency, formatDate, getStatusColor } from './utils';

interface OrdersTableProps {
  orders: Order[];
  onViewOrder?: (id: string) => void;
  onUpdateOrder?: (id: string, status: string) => void;
}

/**
 * Orders Table Component
 * Displays recent orders with status management
 */
export const OrdersTable: React.FC<OrdersTableProps> = ({ 
  orders, 
  onViewOrder,
  onUpdateOrder 
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
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
                Order #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.itemTitle}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(order.total)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(order.orderDate)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <OrderActions 
                    orderId={order.id}
                    status={order.status}
                    onView={onViewOrder}
                    onUpdate={onUpdateOrder}
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
 * Status Badge Component
 */
interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const colorClass = getStatusColor(status);
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
      {status}
    </span>
  );
};

/**
 * Order Actions Component
 */
interface OrderActionsProps {
  orderId: string;
  status: string;
  onView?: (id: string) => void;
  onUpdate?: (id: string, status: string) => void;
}

export const OrderActions: React.FC<OrderActionsProps> = ({ 
  orderId, 
  status, 
  onView, 
  onUpdate 
}) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onView?.(orderId)}
        className="text-gray-600 hover:text-blue-600"
        title="View order"
      >
        <Eye className="h-4 w-4" />
      </button>
      
      {status === 'pending' && (
        <>
          <button
            onClick={() => onUpdate?.(orderId, 'confirmed')}
            className="text-gray-600 hover:text-green-600"
            title="Confirm order"
          >
            <Check className="h-4 w-4" />
          </button>
          <button
            onClick={() => onUpdate?.(orderId, 'cancelled')}
            className="text-gray-600 hover:text-red-600"
            title="Cancel order"
          >
            <X className="h-4 w-4" />
          </button>
        </>
      )}
      
      {status === 'confirmed' && (
        <button
          onClick={() => onUpdate?.(orderId, 'shipped')}
          className="text-gray-600 hover:text-blue-600"
          title="Mark as shipped"
        >
          <Package className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

/**
 * Orders Filter Component
 */
interface OrdersFilterProps {
  onFilterChange?: (filters: { status?: string; period?: string }) => void;
}

export const OrdersFilter: React.FC<OrdersFilterProps> = ({ onFilterChange }) => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <select 
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        onChange={(e) => onFilterChange?.({ status: e.target.value })}
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
      </select>
      
      <select 
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        onChange={(e) => onFilterChange?.({ period: e.target.value })}
      >
        <option value="">All Time</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </select>
    </div>
  );
};

/**
 * Orders Summary Component
 */
interface OrdersSummaryProps {
  totalOrders: number;
  pendingOrders: number;
  shippedOrders: number;
  completedOrders: number;
}

export const OrdersSummary: React.FC<OrdersSummaryProps> = ({
  totalOrders,
  pendingOrders,
  shippedOrders,
  completedOrders
}) => {
  const summaryItems = [
    { label: 'Total Orders', value: totalOrders, color: 'text-blue-600' },
    { label: 'Pending', value: pendingOrders, color: 'text-yellow-600' },
    { label: 'Shipped', value: shippedOrders, color: 'text-green-600' },
    { label: 'Completed', value: completedOrders, color: 'text-gray-600' }
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