import { create } from 'zustand';

export interface ComparisonItem {
  id: string;
  title: string;
  price: number;
  image?: string | null;
  vendor?: string;
}

interface ComparisonState {
  items: ComparisonItem[];
  add: (item: ComparisonItem) => void;
  remove: (id: string) => void;
  clear: () => void;
}

export const useComparisonStore = create<ComparisonState>((set) => ({
  items: [],
  add: (item) => set((state) => {
    if (state.items.find(i => i.id === item.id)) return state; // no duplicate
    if (state.items.length >= 4) return state; // max 4
    return { items: [...state.items, item] };
  }),
  remove: (id) => set((state) => ({ items: state.items.filter(i => i.id !== id) })),
  clear: () => set({ items: [] })
}));
