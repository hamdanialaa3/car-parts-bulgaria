import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const userId = request.headers.get('x-user-id');
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const [sales, products, orders, reviews] = await Promise.all([
      prisma.order.aggregate({
        where: { vendorId: userId, status: 'DELIVERED' },
        _sum: { total: true },
      }),
      prisma.part.count({ where: { vendorId: userId } }),
      prisma.order.count({ where: { vendorId: userId } }),
      prisma.review.count({ where: { vendorId: userId } }),
    ]);

    return NextResponse.json({
      sales: sales._sum.total || 0,
      products,
      orders,
      reviews,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}