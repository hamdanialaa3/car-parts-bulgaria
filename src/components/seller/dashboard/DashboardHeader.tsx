/**
 * Dashboard Header Component
 * 🇧🇬 Bulgaria Car Parts Platform
 * 💰 Currency: EUR
 * 🌐 Languages: Bulgarian/English
 * 📏 Max 300 lines per file
 */

'use client';

import { Bell, MessageSquare, Settings, Search, HelpCircle, User, Car } from 'lucide-react';

interface DashboardHeaderProps {
  userName: string;
  unreadMessages?: number;
  notifications?: number;
}

/**
 * Main Dashboard Header
 * Provides navigation and user controls
 */
export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userName,
  unreadMessages = 7,
  notifications = 3
}) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h2 className="text-xl font-bold text-blue-600 flex items-center">
                <Car className="w-6 h-6 mr-2" />
                CAR PARTS BG
              </h2>
            </div>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <NavLink href="/seller/dashboard" active>Dashboard</NavLink>
              <NavLink href="/seller/listings">Listings</NavLink>
              <NavLink href="/seller/orders">Orders</NavLink>
              <NavLink href="/seller/analytics">Analytics</NavLink>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search orders, listings..."
              />
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            <NotificationButton 
              icon={<MessageSquare className="h-5 w-5" />}
              count={unreadMessages}
              title="Messages"
            />
            
            <NotificationButton 
              icon={<Bell className="h-5 w-5" />}
              count={notifications}
              title="Notifications"
            />

            <button className="text-gray-500 hover:text-gray-700">
              <HelpCircle className="h-5 w-5" />
            </button>

            <button className="text-gray-500 hover:text-gray-700">
              <Settings className="h-5 w-5" />
            </button>

            {/* User Menu */}
            <UserMenu userName={userName} />
          </div>
        </div>
      </div>
    </header>
  );
};

/**
 * Navigation Link Component
 */
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, active = false }) => {
  return (
    <a
      href={href}
      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        active
          ? 'text-blue-600 bg-blue-50'
          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
      }`}
    >
      {children}
    </a>
  );
};

/**
 * Notification Button Component
 */
interface NotificationButtonProps {
  icon: React.ReactNode;
  count: number;
  title: string;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({ 
  icon, 
  count, 
  title 
}) => {
  return (
    <button 
      className="relative text-gray-500 hover:text-gray-700"
      title={title}
    >
      {icon}
      {count > 0 && (
        <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );
};

/**
 * User Menu Component
 */
interface UserMenuProps {
  userName: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ userName }) => {
  return (
    <div className="relative">
      <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
        <span className="hidden md:block text-sm font-medium">
          {userName.length > 20 ? `${userName.substring(0, 20)}...` : userName}
        </span>
      </button>
    </div>
  );
};

/**
 * Mobile Navigation Component
 */
export const MobileNav: React.FC = () => {
  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <NavLink href="/seller/dashboard" active>Dashboard</NavLink>
        <NavLink href="/seller/listings">Listings</NavLink>
        <NavLink href="/seller/orders">Orders</NavLink>
        <NavLink href="/seller/analytics">Analytics</NavLink>
      </div>
    </div>
  );
};

/**
 * Breadcrumb Component
 */
interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
  }>;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
            {item.href ? (
              <a
                href={item.href}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-gray-500 text-sm">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

/**
 * Page Title Component
 */
interface PageTitleProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const PageTitle: React.FC<PageTitleProps> = ({ 
  title, 
  subtitle, 
  actions 
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-gray-600">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center space-x-3">
          {actions}
        </div>
      )}
    </div>
  );
};