'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Search, Menu, Heart, ShoppingCart, User, Globe } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  locale: 'bg' | 'en';
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLanguageChange = (newLocale: 'bg' | 'en') => {
    router.push(newLocale === 'bg' ? '/bg' : '/en');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href={'/'} className="text-2xl font-bold text-blue-600">
              CarParts.bg
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder={t('search.placeholder')}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleLanguageChange(locale === 'bg' ? 'en' : 'bg')}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900"
            >
              <Globe className="h-4 w-4" />
              <span>{locale === 'bg' ? 'EN' : 'BG'}</span>
            </button>

            <Link href="/favorites" className="text-gray-600 hover:text-gray-900">
              <Heart className="h-5 w-5" />
            </Link>

            <Link href="/cart" className="text-gray-600 hover:text-gray-900">
              <ShoppingCart className="h-5 w-5" />
            </Link>

            <Link href="/account" className="text-gray-600 hover:text-gray-900">
              <User className="h-5 w-5" />
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
