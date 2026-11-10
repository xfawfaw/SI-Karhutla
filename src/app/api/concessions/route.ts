import { NextResponse } from 'next/server';
import { getCorporateConcessions } from '@/lib/db';

export async function GET() {
  try {
    const data = getCorporateConcessions();
    return NextResponse.json({
      success: true,
      total: data.length,
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch corporate concessions' },
      { status: 500 }
    );
  }
}
