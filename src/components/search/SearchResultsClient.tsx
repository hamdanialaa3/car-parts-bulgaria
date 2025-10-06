"use client";
import React from 'react';
import { FiltersSidebar } from './FiltersSidebar';
import { ProductCard } from './ProductCard';

// Loading skeleton for product card
function ProductCardSkeleton() {
  return (
    <div className="border rounded-lg p-3 bg-white flex flex-col animate-pulse">
      <div className="aspect-square bg-gray-100 rounded mb-2 flex items-center justify-center overflow-hidden" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-1" />
      <div className="h-3 bg-gray-100 rounded w-1/2 mb-1" />
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
      <div className="flex items-center justify-between mt-auto pt-1">
        <div className="h-6 w-6 bg-gray-100 rounded-full" />
        <div className="h-6 w-16 bg-gray-100 rounded" />
      </div>
    </div>
  );
}
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ComparisonBar } from '../comparison/ComparisonBar';

interface SearchResultsClientProps {
  initialItems: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  initialPagination: { page: number; limit: number; total: number; totalPages: number };
}

export const SearchResultsClient: React.FC<SearchResultsClientProps> = ({ initialItems, initialPagination }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [items, setItems] = React.useState(initialItems);
  const [pagination, setPagination] = React.useState(initialPagination);
  const [loading, setLoading] = React.useState(false);
  const [filters, setFilters] = React.useState<Record<string, string>>(() => {
    const obj: Record<string,string> = {};
    ['q','brand','model','year','min','max','category'].forEach(k => {
      const v = searchParams.get(k); if (v) obj[k] = v;
    });
    return obj;
  });

  function buildQuery(next: Record<string,string>) {
    const q = new URLSearchParams();
    Object.entries(next).forEach(([k,v]) => { if (v) q.set(k, v); });
    q.set('page', '1');
    return q;
  }

  async function fetchData(nextFilters: Record<string,string>, page = 1) {
    setLoading(true);
    try {
      const q = new URLSearchParams();
      Object.entries(nextFilters).forEach(([k,v]) => v && q.set(k, v));
      q.set('page', page.toString());
      const res = await fetch(`/api/search?${q.toString()}`);
      if (res.ok) {
        const json = await res.json();
        setItems(json.items);
        setPagination(json.pagination);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleFiltersChange(next: Record<string,string>) {
    setFilters(next);
    const q = buildQuery(next);
    router.replace(`${pathname}?${q.toString()}`);
    fetchData(next, 1);
  }

  function goToPage(page: number) {
    const next = { ...filters };
    const q = new URLSearchParams();
    Object.entries(next).forEach(([k,v]) => v && q.set(k,v));
    q.set('page', page.toString());
    router.replace(`${pathname}?${q.toString()}`);
    fetchData(next, page);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
      <div className="lg:col-span-1">
        <FiltersSidebar value={filters} onChange={handleFiltersChange} />
      </div>
      <div className="lg:col-span-3 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Search Results ({pagination.total})</h1>
          {loading && <span className="text-xs text-gray-500">Loading...</span>}
        </div>
        {items.length === 0 && !loading && (
          <div className="p-8 border rounded-lg bg-white text-center text-sm text-gray-500">No results found.</div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : items.map(p => (
                <ProductCard key={p.id} product={{ id: p.id, title: p.title, price: p.price, images: (p.images && Array.isArray(p.images) ? p.images : null), vendor: p.vendor }} />
              ))}
        </div>
        {pagination.totalPages > 1 && (
          <div className="flex flex-wrap gap-2 pt-4">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).slice(0, 15).map(pageNum => (
              <button key={pageNum} onClick={() => goToPage(pageNum)} className={`px-3 py-1 text-xs rounded border ${pageNum === pagination.page ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-gray-50'}`}>{pageNum}</button>
            ))}
          </div>
        )}
      </div>
      <ComparisonBar />
    </div>
  );
};
