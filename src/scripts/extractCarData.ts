/**
 * Car Data Extraction Script (TypeScript)
 * Scans provided car info directories and produces normalized JSON.
 */
import fs from 'fs';
import path from 'path';

const CAR_LOGOS_DIR = path.resolve('C:/Users/hamda/Desktop/CAR PARTS/car_logos');
const CAR_INFO_DIR = path.resolve('C:/Users/hamda/Desktop/CAR PARTS/info_cars');
const OUTPUT_DIR = path.resolve(process.cwd(), 'public/data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'car-data.json');

interface ParsedModel {
  name: string;
  years: string[];
  engines: string[];
  trims: string[];
}

interface BrandData {
  name: string;
  logo: { fileName: string; originalPath: string } | null;
  models: ParsedModel[];
}

interface OutputShape {
  generatedAt: string;
  brands: BrandData[];
}

const log = (msg: string, ...rest: unknown[]) => {
  if (process.env.LOG !== 'silent') {
    // eslint-disable-next-line no-console
    console.log(msg, ...rest);
  }
};

function safeReadDir(dir: string): fs.Dirent[] {
  try { return fs.readdirSync(dir, { withFileTypes: true }); } catch { return []; }
}

function detectLogo(brandName: string) {
  if (!fs.existsSync(CAR_LOGOS_DIR)) return null;
  const base = brandName.toLowerCase();
  const candidates = ['png','jpg','jpeg','svg','webp'].map(ext => `${base}.${ext}`);
  for (const file of candidates) {
    const full = path.join(CAR_LOGOS_DIR, file);
    if (fs.existsSync(full)) return { fileName: file, originalPath: full };
  }
  return null;
}

function parseInfoFile(filePath: string): { models: ParsedModel[] } {
  const raw = fs.readFileSync(filePath, 'utf8');
  // Try JSON
  try {
    const json = JSON.parse(raw);
    return normalizeParsed(json);
  } catch { /* not JSON */ }

  const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const models: ParsedModel[] = [];
  let current: ParsedModel | null = null;
  for (const line of lines) {
    const modelMatch = line.match(/^Model\s*[:|-]\s*(.+)$/i);
    if (modelMatch) {
      current = { name: modelMatch[1].trim(), years: [], engines: [], trims: [] };
      models.push(current);
      continue;
    }
    if (!current) continue;

    const yearsMatch = line.match(/^Years?\s*[:|-]\s*(.+)$/i);
    if (yearsMatch) {
      const val = yearsMatch[1].trim();
      if (val.match(/\d{4}\s*-\s*\d{4}/)) {
        const [start, end] = val.split(/\s*-\s*/).map(v => parseInt(v, 10));
        for (let y = start; y <= end; y++) current.years.push(String(y));
      } else {
        current.years.push(...val.split(/[,;]+/).map(v => v.trim()).filter(Boolean));
      }
      continue;
    }
    const enginesMatch = line.match(/^Engines?\s*[:|-]\s*(.+)$/i);
    if (enginesMatch) {
      current.engines.push(...enginesMatch[1].split(/[,;]+/).map(v => v.trim()).filter(Boolean));
      continue;
    }
    const trimsMatch = line.match(/^(Trims?|Variants?|Body|Sizes?)\s*[:|-]\s*(.+)$/i);
    if (trimsMatch) {
      current.trims.push(...trimsMatch[2].split(/[,;]+/).map(v => v.trim()).filter(Boolean));
      continue;
    }
  }
  return { models };
}

function normalizeParsed(data: any): { models: ParsedModel[] } { // eslint-disable-line @typescript-eslint/no-explicit-any
  if (!data) return { models: [] };
  if (Array.isArray(data)) return { models: data.map(normalizeModel) };
  if (data.models) return { models: data.models.map(normalizeModel) };
  return { models: [normalizeModel(data)] };
}

function normalizeModel(entry: any): ParsedModel { // eslint-disable-line @typescript-eslint/no-explicit-any
  if (!entry) return { name: 'UNKNOWN', years: [], engines: [], trims: [] };
  const name = entry.name || entry.model || 'UNKNOWN';
  const yearsRaw = entry.years || entry.yearRange || [];
  let years: string[] = [];
  if (typeof yearsRaw === 'string') {
    if (yearsRaw.match(/\d{4}\s*-\s*\d{4}/)) {
      const [s, e] = yearsRaw.split(/\s*-\s*/).map((n: string) => parseInt(n, 10));
      for (let y = s; y <= e; y++) years.push(String(y));
    } else {
      years = yearsRaw.split(/[,;]+/).map((v: string) => v.trim());
    }
  } else if (Array.isArray(yearsRaw)) {
    years = yearsRaw.map(String);
  }
  const engines = (entry.engines || entry.engine || []).map ? (entry.engines || entry.engine || []).map(String) : [];
  const trims = (entry.trims || entry.variants || entry.body || []).map ? (entry.trims || entry.variants || entry.body || []).map(String) : [];
  return { name, years, engines, trims };
}

function buildData(): OutputShape {
  if (!fs.existsSync(CAR_INFO_DIR)) {
    throw new Error(`CAR_INFO_DIR not found: ${CAR_INFO_DIR}`);
  }
  const brandDirs = safeReadDir(CAR_INFO_DIR).filter(d => d.isDirectory());
  const output: OutputShape = { generatedAt: new Date().toISOString(), brands: [] };
  for (const dirent of brandDirs) {
    const brandName = dirent.name;
    const brandPath = path.join(CAR_INFO_DIR, brandName);
    const files = safeReadDir(brandPath).filter(f => f.isFile());
    const brandData: BrandData = { name: brandName, logo: detectLogo(brandName), models: [] };
    for (const file of files) {
      const filePath = path.join(brandPath, file.name);
      try {
        const parsed = parseInfoFile(filePath);
        brandData.models.push(...parsed.models);
      } catch (err) {
        log(`Warning: failed to parse ${filePath}: ${(err as Error).message}`);
      }
    }
    // Deduplicate
    const map = new Map<string, ParsedModel>();
    for (const m of brandData.models) {
      if (!map.has(m.name)) map.set(m.name, { ...m });
      else {
        const ex = map.get(m.name)!;
        ex.years = Array.from(new Set([...ex.years, ...m.years])).sort();
        ex.engines = Array.from(new Set([...ex.engines, ...m.engines]));
        ex.trims = Array.from(new Set([...ex.trims, ...m.trims]));
      }
    }
    brandData.models = Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
    output.brands.push(brandData);
  }
  output.brands.sort((a, b) => a.name.localeCompare(b.name));
  return output;
}

function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

export function extractCarData() {
  const data = buildData();
  ensureOutputDir();
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2), 'utf8');
  return { file: OUTPUT_FILE, brands: data.brands.length };
}
// Execute immediately when run via ts-node
;(async () => {
  try {
    const res = extractCarData();
    // eslint-disable-next-line no-console
    console.log(`Car data extracted: ${res.file} (brands: ${res.brands})`);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Extraction failed:', (err as Error).message);
    process.exit(1);
  }
})();
