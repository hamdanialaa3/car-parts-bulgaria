import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import VendorDashboard from '@/components/vendor/VendorDashboard';

interface VendorDashboardPageProps {
  params: {
    locale: 'bg' | 'en';
  };
}

export const metadata: Metadata = {
  title: 'Vendor Dashboard | Car Parts Bulgaria',
  description: 'Manage your car parts inventory and orders',
};

export default function VendorDashboardPage({ params }: VendorDashboardPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header locale={params.locale} />
      
      <main>
        <VendorDashboard />
      </main>
    </div>
  );
}