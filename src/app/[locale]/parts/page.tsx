import { useTranslations } from 'next-intl';
import Header from '@/components/layout/Header';
import AdvancedSearch from '@/components/search/AdvancedSearch';
import PartCard from '@/components/ui/PartCard'; 
import { ChevronDown, Grid3X3, List, SlidersHorizontal } from 'lucide-react';

interface PartsPageProps {
  params: {
    locale: 'bg' | 'en';
  };
  searchParams: {
    q?: string;
    category?: string;
    make?: string;
    model?: string;
    page?: string;
    sort?: string;
  };
}

export default function PartsPage({ params: { locale }, searchParams }: PartsPageProps) {
  const t = useTranslations();

  // Mock data for demonstration - Mobile.de style
  const mockParts = [
    {
      id: '1',
      title: 'BMW E90 320d Turbocharger - Original',
      price: 850,
      currency: 'EUR',
      images: ['/images/parts/turbo1.jpg', '/images/parts/turbo2.jpg'],
      location: 'София',
      condition: 'good' as const,
      make: 'BMW',
      model: '3 Series',
      year: 2008,
      category: 'Engine',
      vendor: {
        name: 'Auto Parts Sofia',
        rating: 4.8,
        isVerified: true
      },
      createdAt: new Date('2024-10-01')
    },
    {
      id: '2', 
      title: 'Mercedes W204 C220 CDI Brake Pads Set - Front',
      price: 120,
      currency: 'EUR',
      images: ['/images/parts/brakes1.jpg'],
      location: 'Пловдив',
      condition: 'new' as const,
      make: 'Mercedes-Benz',
      model: 'C-Class',
      year: 2012,
      category: 'Brakes',
      vendor: {
        name: 'MB Parts Center',
        rating: 4.9,
        isVerified: true
      },
      createdAt: new Date('2024-10-03')
    },
    {
      id: '3',
      title: 'Audi A4 B8 2.0 TDI Headlight Assembly - Right',
      price: 450,
      currency: 'EUR', 
      images: ['/images/parts/headlight1.jpg', '/images/parts/headlight2.jpg', '/images/parts/headlight3.jpg'],
      location: 'Варна',
      condition: 'like-new' as const,
      make: 'Audi',
      model: 'A4',
      year: 2010,
      category: 'Body',
      vendor: {
        name: 'Audi Specialist',
        rating: 4.7,
        isVerified: false
      },
      createdAt: new Date('2024-10-02')
    },
    {
      id: '4',
      title: 'VW Golf 6 1.6 TDI Suspension Spring - Front Left',
      price: 95,
      currency: 'EUR',
      images: ['/images/parts/spring1.jpg'],
      location: 'Бургас',
      condition: 'good' as const,
      make: 'Volkswagen',
      model: 'Golf',
      year: 2011,
      category: 'Suspension',
      vendor: {
        name: 'VW Parts Bulgaria',
        rating: 4.6,
        isVerified: true
      },
      createdAt: new Date('2024-09-28')
    }
  ];

  const sortOptions = [
    { value: 'newest', label: locale === 'bg' ? 'Най-нови' : 'Newest' },
    { value: 'price-low', label: locale === 'bg' ? 'Цена: Ниска към висока' : 'Price: Low to High' },
    { value: 'price-high', label: locale === 'bg' ? 'Цена: Висока към ниска' : 'Price: High to Low' },
    { value: 'distance', label: locale === 'bg' ? 'Разстояние' : 'Distance' },
  ];

  const resultsCount = mockParts.length;
  const totalResults = 1247; // Mock total

  return (
    <div className="min-h-screen bg-gray-50">
      <Header locale={locale} />
      
      {/* Search section */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="container-mobile">
          <AdvancedSearch />
        </div>
      </section>

      {/* Results section */}
      <section className="py-6">
        <div className="container-mobile">
          
          {/* Results header - Mobile.de style */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {t('parts.title')}
              </h1>
              <span className="text-gray-600">
                {totalResults.toLocaleString(locale === 'bg' ? 'bg-BG' : 'en-US')} {t('search.results')}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Sort dropdown */}
              <div className="relative">
                <select className="input-field pr-8 py-2 text-sm min-w-48">
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* View toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button className="p-2 bg-primary-500 text-white">
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white text-gray-600 hover:bg-gray-50">
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile filters button */}
              <button className="btn-secondary p-2 sm:hidden">
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active filters */}
          {(searchParams.q || searchParams.category || searchParams.make) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {searchParams.q && (
                <span className="badge bg-primary-100 text-primary-800 px-3 py-1">
                  &quot;{searchParams.q}&quot; ✕
                </span>
              )}
              {searchParams.category && (
                <span className="badge bg-gray-100 text-gray-800 px-3 py-1">
                  {searchParams.category} ✕
                </span>
              )}
              {searchParams.make && (
                <span className="badge bg-gray-100 text-gray-800 px-3 py-1">
                  {searchParams.make} ✕
                </span>
              )}
              <button className="text-sm text-primary-600 hover:text-primary-700 ml-2">
                {locale === 'bg' ? 'Изчисти всички' : 'Clear all'}
              </button>
            </div>
          )}

          {/* Main content area */}
          <div className="flex gap-8">
            
            {/* Sidebar filters - Mobile.de style */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="card sticky top-24">
                <h3 className="font-semibold text-gray-900 mb-4">
                  {locale === 'bg' ? 'Филтри' : 'Filters'}
                </h3>
                
                {/* Quick filters */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'bg' ? 'Състояние' : 'Condition'}
                    </label>
                    <div className="space-y-2">
                      {['new', 'like-new', 'good', 'fair'].map(condition => (
                        <label key={condition} className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm text-gray-600">
                            {condition === 'new' && (locale === 'bg' ? 'Ново' : 'New')}
                            {condition === 'like-new' && (locale === 'bg' ? 'Като ново' : 'Like New')}
                            {condition === 'good' && (locale === 'bg' ? 'Добро' : 'Good')}
                            {condition === 'fair' && (locale === 'bg' ? 'Задоволително' : 'Fair')}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'bg' ? 'Ценова граница' : 'Price Range'}
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="number" 
                        placeholder="€ от" 
                        className="input-field text-sm"
                      />
                      <input 
                        type="number" 
                        placeholder="€ до" 
                        className="input-field text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'bg' ? 'Местоположение' : 'Location'}
                    </label>
                    <input 
                      type="text" 
                      placeholder={locale === 'bg' ? 'Въведете град' : 'Enter city'} 
                      className="input-field text-sm w-full"
                    />
                  </div>
                </div>
              </div>
            </aside>

            {/* Results grid */}
            <main className="flex-1">
              <div className="grid-mobile">
                {mockParts.map((part) => (
                  <PartCard 
                    key={part.id} 
                    part={part}
                  />
                ))}
              </div>

              {/* Load more / Pagination */}
              <div className="text-center mt-12">
                <button className="btn-primary px-8 py-3">
                  {locale === 'bg' ? 'Зареди още' : 'Load More'}
                </button>
                <p className="text-gray-500 text-sm mt-3">
                  {locale === 'bg' 
                    ? `Показани ${resultsCount} от ${totalResults} резултата`
                    : `Showing ${resultsCount} of ${totalResults} results`
                  }
                </p>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}