import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const revalidate = 3600; // 1 hour cache

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'car-data.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'car-data.json not found. Run npm run extract:cars' }, { status: 404 });
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(raw);
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}