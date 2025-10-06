'use client';

interface PartCardProps {
  part: {
    id: string;
    title: string;
    price: number;
    currency: string;
    images: string[];
    location: string;
    condition: string;
    make: string;
    model: string;
    year: number;
    category: string;
  };
}

export default function PartCard({ part }: PartCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="font-medium text-gray-900">{part.title}</h3>
      <p className="text-lg font-bold text-gray-900">{part.price} {part.currency}</p>
      <p className="text-sm text-gray-600">{part.location}</p>
    </div>
  );
}
