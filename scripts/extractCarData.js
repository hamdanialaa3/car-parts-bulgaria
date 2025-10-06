/**
 * Car Data Extraction Script
 * Scans brand directories and builds a normalized JSON structure.
 * Usage: node scripts/extractCarData.js
 */

const fs = require('fs');
const path = require('path');

// Configure external absolute sources provided by user
const CAR_LOGOS_DIR = path.resolve('C:/Users/hamda/Desktop/CAR PARTS/car_logos');
const CAR_INFO_DIR = path.resolve('C:/Users/hamda/Desktop/CAR PARTS/info_cars');
const OUTPUT_DIR = path.resolve(process.cwd(), 'public/data');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'car-data.json');

function safeReadDir(dir) {
  try { return fs.readdirSync(dir, { withFileTypes: true }); } catch { return []; }
}

function detectLogo(brandName) {
  if (!fs.existsSync(CAR_LOGOS_DIR)) return null;
  const base = brandName.toLowerCase();
  const candidates = [ `${base}.png`, `${base}.jpg`, `${base}.jpeg`, `${base}.svg`, `${base}.webp` ];
  for (const file of candidates) {
    const full = path.join(CAR_LOGOS_DIR, file);
    if (fs.existsSync(full)) {
      // We'll serve logos via /logos/<file> if copied later; here we just return metadata.
      return { fileName: file, originalPath: full };
    }
  }
  return null;
}

function parseInfoFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  // Try JSON first
  try {
    const json = JSON.parse(raw);
    return normalizeParsed(json);
  } catch (_) { /* not JSON */ }

  // Try simple key:value or section parsing (fallback heuristic)
  const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const bucket = { models: [] };
  let currentModel = null;

  for (const line of lines) {
    // Example patterns:
    // Model: E90
    // Years: 2005-2011
    // Engines: 2.0L, 3.0L
    // Trim: Sport | Size: Sedan
    const modelMatch = line.match(/^Model\s*[:|-]\s*(.+)$/i);
    if (modelMatch) {
      currentModel = { name: modelMatch[1].trim(), years: [], engines: [], trims: [] };
      bucket.models.push(currentModel);
      continue;
    }
    if (!currentModel) continue;

    const yearsMatch = line.match(/^Years?\s*[:|-]\s*(.+)$/i);
    if (yearsMatch) {
      const val = yearsMatch[1].trim();
      if (val.match(/\d{4}\s*-\s*\d{4}/)) {
        const [start, end] = val.split(/\s*-\s*/).map(v => parseInt(v, 10));
        for (let y = start; y <= end; y++) currentModel.years.push(String(y));
      } else {
        currentModel.years.push(...val.split(/[,;]+/).map(v => v.trim()).filter(Boolean));
      }
      continue;
    }

    const enginesMatch = line.match(/^Engines?\s*[:|-]\s*(.+)$/i);
    if (enginesMatch) {
      currentModel.engines.push(...enginesMatch[1].split(/[,;]+/).map(v => v.trim()).filter(Boolean));
      continue;
    }

    const trimsMatch = line.match(/^(Trims?|Variants?|Body|Sizes?)\s*[:|-]\s*(.+)$/i);
    if (trimsMatch) {
      currentModel.trims.push(...trimsMatch[2].split(/[,;]+/).map(v => v.trim()).filter(Boolean));
      continue;
    }
  }
  return bucket;
}

function normalizeParsed(data) {
  // Expect possible shapes and map to unified { models: [ { name, years[], engines[], trims[] } ] }
  if (!data) return { models: [] };
  if (Array.isArray(data)) {
    return { models: data.map(entry => normalizeModel(entry)) };
  }
  if (data.models) {
    return { models: data.models.map(entry => normalizeModel(entry)) };
  }
  // Single model fallback
  return { models: [ normalizeModel(data) ] };
}

function normalizeModel(entry) {
  if (!entry) return { name: 'UNKNOWN', years: [], engines: [], trims: [] };
  const name = entry.name || entry.model || 'UNKNOWN';
  const yearsRaw = entry.years || entry.yearRange || [];
  let years = [];
  if (typeof yearsRaw === 'string') {
    if (yearsRaw.match(/\d{4}\s*-\s*\d{4}/)) {
      const [s, e] = yearsRaw.split(/\s*-\s*/).map(n => parseInt(n, 10));
      for (let y = s; y <= e; y++) years.push(String(y));
    } else {
      years = yearsRaw.split(/[,;]+/).map(v => v.trim());
    }
  } else if (Array.isArray(yearsRaw)) {
    years = yearsRaw.map(String);
  }

  const engines = (entry.engines || entry.engine || []).map ? (entry.engines || entry.engine || []).map(String) : [];
  const trims = (entry.trims || entry.variants || entry.body || []).map ? (entry.trims || entry.variants || entry.body || []).map(String) : [];

  return { name, years, engines, trims };
}

function buildData() {
  if (!fs.existsSync(CAR_INFO_DIR)) {
    console.error('CAR_INFO_DIR not found:', CAR_INFO_DIR);
    process.exit(1);
  }

  const brandDirs = safeReadDir(CAR_INFO_DIR).filter(d => d.isDirectory());
  const output = { generatedAt: new Date().toISOString(), brands: [] };

  for (const dirent of brandDirs) {
    const brandName = dirent.name;
    const brandPath = path.join(CAR_INFO_DIR, brandName);
    const files = safeReadDir(brandPath).filter(f => f.isFile());

    const brandData = { name: brandName, logo: detectLogo(brandName), models: [] };

    for (const file of files) {
      const filePath = path.join(brandPath, file.name);
      try {
        const parsed = parseInfoFile(filePath);
        brandData.models.push(...parsed.models);
      } catch (err) {
        console.warn('Failed to parse file', filePath, err.message);
      }
    }

    // De-duplicate models by name
    const modelMap = new Map();
    for (const m of brandData.models) {
      if (!modelMap.has(m.name)) {
        modelMap.set(m.name, { ...m });
      } else {
        const existing = modelMap.get(m.name);
        existing.years = Array.from(new Set([...existing.years, ...m.years])).sort();
        existing.engines = Array.from(new Set([...existing.engines, ...m.engines]));
        existing.trims = Array.from(new Set([...existing.trims, ...m.trims]));
      }
    }
    brandData.models = Array.from(modelMap.values()).sort((a, b) => a.name.localeCompare(b.name));
    output.brands.push(brandData);
  }

  output.brands.sort((a, b) => a.name.localeCompare(b.name));
  return output;
}

function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function main() {
  console.log('Extracting car data...');
  const data = buildData();
  ensureOutputDir();
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2), 'utf8');
  console.log('Car data written to:', OUTPUT_FILE);
  console.log('Brands processed:', data.brands.length);
}

if (require.main === module) {
  main();
}

module.exports = { buildData };