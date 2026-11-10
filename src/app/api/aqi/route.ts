import { NextResponse } from 'next/server';
import { getAirQualityStations } from '@/lib/db';

export async function GET() {
  try {
    const data = getAirQualityStations();
    return NextResponse.json({
      success: true,
      total: data.length,
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch AQI stations' },
      { status: 500 }
    );
  }
}
