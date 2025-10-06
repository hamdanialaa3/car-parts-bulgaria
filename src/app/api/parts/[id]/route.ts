import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/parts/[id] - Get part details with compatibilities
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  if (!id) return NextResponse.json({ error: 'Missing part id' }, { status: 400 });
  try {
    const part = await prisma.part.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        images: true,
        vendor: { select: { id: true, companyName: true, rating: true, reviewCount: true, address: true, isVerified: true, logo: true } },
        category: { select: { id: true, name: true, slug: true } },
        compatibilities: { include: { brand: true, model: true, year: true } },
      },
    });
    if (!part) return NextResponse.json({ error: 'Part not found' }, { status: 404 });
    return NextResponse.json(part);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch part details' }, { status: 500 });
  }
}
