/**
 * Prisma seed script to import vehicle fitment data from generated car-data.json
 * Run: npm run db:seed  (after docker db is up & migrations applied)
 */
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

interface CarDataShape {
  brands: Array<{
    name: string;
    logo?: { fileName: string } | null;
    models: Array<{
      name: string;
      years: string[];
      engines: string[];
      trims: string[];
    }>
  }>;
}

async function main() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'car-data.json');
  if (!fs.existsSync(filePath)) {
    console.log('car-data.json not found. Run: npm run extract:cars');
    return;
  }
  const raw = fs.readFileSync(filePath, 'utf8');
  const data: CarDataShape = JSON.parse(raw);
  console.log(`Seeding brands: ${data.brands.length}`);

  for (const brand of data.brands) {
    const brandSlug = brand.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const dbBrand = await prisma.vehicleBrand.upsert({
      where: { name: brand.name },
      create: {
        name: brand.name,
        slug: brandSlug,
        logo: brand.logo?.fileName || null,
      },
      update: {
        slug: brandSlug,
        logo: brand.logo?.fileName || null,
      },
    });

    for (const model of brand.models) {
      const modelSlug = model.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const dbModel = await prisma.vehicleModel.upsert({
        where: { brandId_name: { brandId: dbBrand.id, name: model.name } },
        create: {
          name: model.name,
            slug: modelSlug,
            brandId: dbBrand.id,
        },
        update: {
          slug: modelSlug,
        }
      });

      // Years
      for (const year of model.years) {
        const y = parseInt(year, 10);
        if (isNaN(y)) continue;
        await prisma.vehicleYear.upsert({
          where: { modelId_year: { modelId: dbModel.id, year: y } },
          create: { modelId: dbModel.id, year: y },
          update: {}
        });
      }

      // Trims
      for (const trim of model.trims) {
        await prisma.vehicleTrim.upsert({
          where: { modelId_name: { modelId: dbModel.id, name: trim } },
          create: { modelId: dbModel.id, name: trim },
          update: {}
        });
      }

      // Engines
      for (const engine of model.engines) {
        const code = engine.trim();
        if (!code) continue;
        await prisma.vehicleEngine.upsert({
          where: { modelId_code: { modelId: dbModel.id, code } },
          create: { modelId: dbModel.id, code },
          update: {}
        });
      }
    }
  }
  console.log('Seeding complete.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
