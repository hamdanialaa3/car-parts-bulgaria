import { useTranslations } from 'next-intl';
import Header from '@/components/layout/Header';
import AdvancedSearch from '@/components/search/AdvancedSearch';
import Link from 'next/link';

interface HomePageProps {
  params: {
    locale: 'bg' | 'en';
  };
}

export default function HomePage({ params: { locale } }: HomePageProps) {
  const t = useTranslations();

  // Featured categories - Mobile.de style
  const categories = [
    {
      id: 'engine',
      name: t('parts.categories.engine'),
      icon: '🔧',
      count: '1,234',
      image: '/images/categories/engine.jpg'
    },
    {
      id: 'brakes',
      name: t('parts.categories.brakes'),
      icon: '🛞',
      count: '856',
      image: '/images/categories/brakes.jpg'
    },
    {
      id: 'electrical',
      name: t('parts.categories.electrical'),
      icon: '⚡',
      count: '642',
      image: '/images/categories/electrical.jpg'
    },
    {
      id: 'body',
      name: t('parts.categories.body'),
      icon: '🚗',
      count: '923',
      image: '/images/categories/body.jpg'
    },
    {
      id: 'suspension',
      name: t('parts.categories.suspension'),
      icon: '🔩',
      count: '567',
      image: '/images/categories/suspension.jpg'
    },
    {
      id: 'transmission',
      name: t('parts.categories.transmission'),
      icon: '⚙️',
      count: '432',
      image: '/images/categories/transmission.jpg'
    }
  ];

  // Featured stats - Mobile.de inspired
  const stats = [
    { label: 'Резервни части', value: '50,000+', icon: '🔧' },
    { label: 'Доставчици', value: '2,500+', icon: '🏪' },
    { label: 'Продажби', value: '100,000+', icon: '📦' },
    { label: 'Клиенти', value: '25,000+', icon: '👥' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header locale={locale} />
      
      {/* Hero section - Mobile.de inspired */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 lg:py-24">
        <div className="container-mobile">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              {locale === 'bg' ? 'Намерете резервни части' : 'Find Car Parts'}
              <br />
              <span className="text-orange-400">
                {locale === 'bg' ? 'бързо и лесно' : 'Fast & Easy'}
              </span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-primary-100">
              {locale === 'bg' 
                ? 'Над 50,000 качествени резервни части от проверени доставчици в България' 
                : 'Over 50,000 quality car parts from verified suppliers in Bulgaria'
              }
            </p>
            
            {/* Main search box */}
            <div className="max-w-4xl mx-auto">
              <AdvancedSearch />
            </div>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-12 bg-white">
        <div className="container-mobile">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories section - Mobile.de grid style */}
      <section className="py-16 bg-gray-50">
        <div className="container-mobile">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {locale === 'bg' ? 'Категории резервни части' : 'Car Parts Categories'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {locale === 'bg' 
                ? 'Разгледайте нашите категории и намерете точно това, което търсите'
                : 'Browse our categories and find exactly what you\'re looking for'
              }
            </p>
          </div>

          <div className="grid-mobile">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/${locale}/parts?category=${category.id}`}
                className="card card-hover group"
              >
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-4xl">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {category.count} {locale === 'bg' ? 'части' : 'parts'}
                </p>
                <span className="text-primary-600 text-sm font-medium group-hover:text-primary-700">
                  {locale === 'bg' ? 'Разгледай →' : 'Browse →'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-16 bg-white">
        <div className="container-mobile">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {locale === 'bg' ? 'Как работи?' : 'How It Works?'}
            </h2>
          </div>

          <div className="grid-mobile-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {locale === 'bg' ? '1. Търсете' : '1. Search'}
              </h3>
              <p className="text-gray-600">
                {locale === 'bg' 
                  ? 'Въведете марката, модела и годината на вашата кола'
                  : 'Enter your car make, model and year'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {locale === 'bg' ? '2. Сравнете' : '2. Compare'}
              </h3>
              <p className="text-gray-600">
                {locale === 'bg' 
                  ? 'Сравнете цени и качество от различни доставчици'
                  : 'Compare prices and quality from different suppliers'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {locale === 'bg' ? '3. Купете' : '3. Buy'}
              </h3>
              <p className="text-gray-600">
                {locale === 'bg' 
                  ? 'Поръчайте безопасно и получете частите у дома'
                  : 'Order safely and get parts delivered to your home'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section - Mobile.de inspired */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-mobile text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {locale === 'bg' ? 'Станете доставчик' : 'Become a Vendor'}
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            {locale === 'bg'
              ? 'Продавайте вашите резервни части на хиляди клиенти в България'
              : 'Sell your car parts to thousands of customers in Bulgaria'
            }
          </p>
          <Link 
            href={`/${locale}/vendor/register`}
            className="btn-orange text-lg px-8 py-4 font-semibold"
          >
            {locale === 'bg' ? 'Започнете сега' : 'Start Now'}
          </Link>
        </div>
      </section>

      {/* Footer placeholder */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container-mobile text-center">
          <p className="text-gray-400">
            © 2025 {t('common.appName')}. {t('footer.copyright')}
          </p>
        </div>
      </footer>
    </div>
  );
}