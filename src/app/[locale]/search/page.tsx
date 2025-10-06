import React from 'react';
import { AdvancedSearchBar } from '../../../components/homepage/AdvancedSearchBar';
import { SearchResultsClient } from '../../../components/search/SearchResultsClient';

interface SearchPageProps {
  params: { locale: string };
  searchParams: Record<string, string | string[] | undefined>;
}

async function fetchResults(query: URLSearchParams) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/search?${query.toString()}`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return { items: [], pagination: { page:1, total:0, totalPages:0, limit:20 } };
    return res.json();
  } catch {
    return { items: [], pagination: { page:1, total:0, totalPages:0, limit:20 } };
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = new URLSearchParams();
  ['q','brand','model','year','min','max','category','page'].forEach(k => {
    const v = searchParams[k];
    if (typeof v === 'string' && v) query.set(k, v);
  });
  const data = await fetchResults(query);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <AdvancedSearchBar onSearch={() => {}} />
      <SearchResultsClient initialItems={data.items} initialPagination={data.pagination} />
    </div>
  );
}
