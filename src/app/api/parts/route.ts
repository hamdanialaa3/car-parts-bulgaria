// POST /api/parts - Add new part (product)
export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id');
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const data = await req.json();
    const part = await prisma.part.create({
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        categoryId: data.category,
        vendorId: userId,
        slug: data.title.toLowerCase().replace(/\s+/g, '-'),
        isActive: true,
      },
    });
    return NextResponse.json(part, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to add part' }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/parts - Get all parts with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const make = searchParams.get('make');
    const model = searchParams.get('model');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const condition = searchParams.get('condition');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where: any = { // eslint-disable-line @typescript-eslint/no-explicit-any
      isActive: true,
    };

    if (category) {
      where.category = category;
    }

    if (make) {
      where.make = {
        contains: make,
        mode: 'insensitive',
      };
    }

    if (model) {
      where.model = {
        contains: model,
        mode: 'insensitive',
      };
    }

    if (condition) {
      where.condition = condition;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    const skip = (page - 1) * limit;

    const [parts, totalCount] = await Promise.all([
      prisma.part.findMany({
        where,
        include: {
          vendor: {
            select: {
              id: true,
              companyName: true,
              rating: true,
              reviewCount: true,
              city: true,
            },
          },
          category: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.part.count({ where }),
    ]);

    return NextResponse.json({
      parts,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch parts' },
      { status: 500 }
    );
  }
}