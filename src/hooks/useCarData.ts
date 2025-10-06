import { useEffect, useState, useMemo } from 'react';

interface ParsedModel {
  name: string;
  years: string[];
  engines: string[];
  trims: string[];
}

interface BrandData {
  name: string;
  logo?: { fileName: string; originalPath: string } | null;
  models: ParsedModel[];
}

interface CarDataShape {
  generatedAt: string;
  brands: BrandData[];
}

export function useCarData() {
  const [data, setData] = useState<CarDataShape | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        // Prefer static file directly (faster) then fallback to API
        const staticRes = await fetch('/data/car-data.json', { cache: 'no-cache' });
        let json: CarDataShape | null = null;
        if (staticRes.ok) {
          json = await staticRes.json();
        } else {
          const apiRes = await fetch('/api/car-data');
          if (apiRes.ok) json = await apiRes.json();
        }
        if (active) {
          if (!json) throw new Error('Unable to load car data');
          setData(json);
        }
      } catch (err) {
        if (active) setError((err as Error).message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const brands = useMemo(() => data?.brands.map(b => b.name) || [], [data]);

  function getModelsByBrand(brand?: string) {
    if (!brand || !data) return [];
    return data.brands.find(b => b.name === brand)?.models.map(m => m.name) || [];
  }

  function getYears(brand?: string, model?: string) {
    if (!brand || !model || !data) return [];
    const m = data.brands.find(b => b.name === brand)?.models.find(mo => mo.name === model);
    return m?.years || [];
  }

  function getTrims(brand?: string, model?: string) {
    if (!brand || !model || !data) return [];
    const m = data.brands.find(b => b.name === brand)?.models.find(mo => mo.name === model);
    return m?.trims || [];
  }

  function getEngines(brand?: string, model?: string) {
    if (!brand || !model || !data) return [];
    const m = data.brands.find(b => b.name === brand)?.models.find(mo => mo.name === model);
    return m?.engines || [];
  }

  return {
    data, loading, error,
    brands,
    getModelsByBrand,
    getYears,
    getTrims,
    getEngines
  };
}

export type { CarDataShape, BrandData, ParsedModel };