import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/vendors - Get all vendors
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const location = searchParams.get('location');
    const minRating = searchParams.get('minRating');

    const where: Record<string, unknown> = {
      isActive: true,
    };

    if (location) {
      where.location = {
        contains: location,
        mode: 'insensitive',
      };
    }

    if (minRating) {
      where.rating = {
        gte: parseFloat(minRating),
      };
    }

    const skip = (page - 1) * limit;

    const [vendors, totalCount] = await Promise.all([
      prisma.vendor.findMany({
        where,
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
            },
          },
          parts: {
            select: {
              id: true,
              title: true,
              price: true,
              category: true,
              images: true,
            },
            where: { isActive: true },
            take: 5,
            orderBy: { createdAt: 'desc' },
          },
          _count: {
            select: {
              parts: {
                where: { isActive: true },
              },
              reviews: true,
            },
          },
        },
        orderBy: {
          rating: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.vendor.count({ where }),
    ]);

    return NextResponse.json({
      vendors,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch vendors' },
      { status: 500 }
    );
  }
}

// POST /api/vendors - Create new vendor registration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      businessName,
      businessType,
      location,
      phone,
      description,
      website,
      logoUrl,
    } = body;

    // Validate required fields
    if (!userId || !businessName || !businessType || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already has a vendor profile
    const existingVendor = await prisma.vendor.findUnique({
      where: { userId },
    });

    if (existingVendor) {
      return NextResponse.json(
        { error: 'User already has a vendor profile' },
        { status: 400 }
      );
    }

    // Create vendor profile
    const vendor = await prisma.vendor.create({
      data: {
        userId,
        companyName: businessName,
        address: location || 'Sofia, Bulgaria',
        city: 'Sofia', // Default city
        businessPhone: phone,
        description,
        website,
        logo: logoUrl,
        isActive: true,
        isVerified: false, // Requires admin approval
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    // Update user role to VENDOR
    await prisma.user.update({
      where: { id: userId },
      data: { role: 'VENDOR' },
    });

    return NextResponse.json(vendor, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create vendor profile' },
      { status: 500 }
    );
  }
}