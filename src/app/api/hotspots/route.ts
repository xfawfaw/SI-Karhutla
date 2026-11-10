import { NextRequest, NextResponse } from 'next/server';
import { getHotspots } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const satellite = searchParams.get('satellite') || undefined;
    const province = searchParams.get('province') || undefined;
    const minConfidence = searchParams.get('minConfidence') ? parseInt(searchParams.get('minConfidence')!, 10) : undefined;

    const data = getHotspots({
      satellite,
      province,
      minConfidence,
    });

    return NextResponse.json({
      success: true,
      total: data.length,
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch hotspots' },
      { status: 500 }
    );
  }
}
