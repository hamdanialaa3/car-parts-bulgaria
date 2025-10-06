import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

// Enhanced search with vehicle compatibility join
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || '';
    const brand = searchParams.get('brand');
    const model = searchParams.get('model');
    const year = searchParams.get('year');
    const category = searchParams.get('category');
    const min = searchParams.get('min');
    const max = searchParams.get('max');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = Math.min(parseInt(searchParams.get('limit') || '20', 10), 100);
    const skip = (page - 1) * limit;

    const where: any = { // eslint-disable-line @typescript-eslint/no-explicit-any
      isActive: true,
      OR: q ? [
        { title: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { partNumber: { contains: q, mode: 'insensitive' } },
      ] : undefined,
    };

    if (category) where.categoryId = category;
    if (min || max) {
      where.price = {};
      if (min) where.price.gte = parseFloat(min);
      if (max) where.price.lte = parseFloat(max);
    }

    // Vehicle compatibility filter via relation conditions
    const compatibilityFilter: any = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
    if (brand) compatibilityFilter.brand = { name: { equals: brand } };
    if (model) compatibilityFilter.model = { name: { equals: model } };
    if (year) compatibilityFilter.year = { year: parseInt(year, 10) };

    const includeCompat = brand || model || year;

    const [items, total] = await Promise.all([
      prisma.part.findMany({
        where: {
          ...where,
          ...(includeCompat ? {
            compatibilities: {
              some: compatibilityFilter
            }
          } : {})
        },
        include: {
          vendor: { select: { id: true, companyName: true, rating: true, reviewCount: true } },
          category: { select: { id: true, name: true, slug: true } },
          compatibilities: includeCompat ? {
            include: { brand: true, model: true, year: true }
          } : false
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.part.count({
        where: {
          ...where,
          ...(includeCompat ? { compatibilities: { some: compatibilityFilter } } : {})
        }
      })
    ]);

    return NextResponse.json({
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error('Search error', err); // eslint-disable-line no-console
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
