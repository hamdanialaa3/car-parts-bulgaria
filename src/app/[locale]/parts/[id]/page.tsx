import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import PartDetails from '@/components/parts/PartDetails';

interface PartPageProps {
  params: {
    locale: 'bg' | 'en';
    id: string;
  };
}

// Mock data - replace with actual API call
const mockPart = {
  id: '1',
  title: 'BMW E90 3 Series Front Brake Pads',
  description: 'High-quality brake pads for BMW E90 3 Series. These brake pads provide excellent stopping power and are manufactured to OEM specifications. Perfect fit and finish guaranteed.',
  price: 89.99,
  currency: 'EUR',
  category: 'brakes',
  make: 'BMW',
  model: 'E90 3 Series',
  year: 2008,
  condition: 'New',
  location: 'Sofia, Bulgaria',
  partNumber: 'BP-BMW-E90-001',
  compatibility: ['BMW E90 320i', 'BMW E90 325i', 'BMW E90 330i'],
  createdAt: '2024-10-01T10:00:00Z',
  images: [
    {
      id: '1',
      url: '/images/brake-pads-1.jpg',
      isPrimary: true,
    },
    {
      id: '2',
      url: '/images/brake-pads-2.jpg',
      isPrimary: false,
    },
    {
      id: '3',
      url: '/images/brake-pads-3.jpg',
      isPrimary: false,
    },
  ],
  vendor: {
    id: 'vendor-1',
    businessName: 'AutoParts Sofia',
    rating: 4.8,
    reviewCount: 127,
    location: 'Sofia, Bulgaria',
    phone: '+359 2 123 4567',
    isVerified: true,
    logoUrl: '/images/vendor-logo.jpg',
  },
};

async function getPartById(id: string) {
  // TODO: Replace with actual API call
  // const response = await fetch(`${process.env.API_BASE_URL}/api/parts/${id}`);
  // if (!response.ok) return null;
  // return response.json();
  
  if (id === '1') {
    return mockPart;
  }
  return null;
}

export async function generateMetadata({ params }: PartPageProps): Promise<Metadata> {
  const part = await getPartById(params.id);
  
  if (!part) {
    return {
      title: 'Part Not Found',
    };
  }

  return {
    title: `${part.title} | Car Parts Bulgaria`,
    description: part.description,
    openGraph: {
      title: part.title,
      description: part.description,
      images: part.images.filter(img => img.isPrimary).map(img => img.url),
    },
  };
}

export default async function PartPage({ params }: PartPageProps) {
  const part = await getPartById(params.id);

  if (!part) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header locale={params.locale} />
      
      <main>
        <PartDetails part={part} />
      </main>
    </div>
  );
}