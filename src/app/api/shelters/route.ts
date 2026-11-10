import { NextResponse } from 'next/server';
import { getAllShelters } from '@/lib/db';

export async function GET() {
  try {
    const shelters = getAllShelters();
    return NextResponse.json({
      success: true,
      total: shelters.length,
      data: shelters,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch shelters' },
      { status: 500 }
    );
  }
}
