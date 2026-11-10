import { NextRequest, NextResponse } from 'next/server';
import { searchEvacuees, addEvacuee } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || '';
    const shelterId = searchParams.get('shelterId') ? parseInt(searchParams.get('shelterId')!, 10) : undefined;

    const evacuees = searchEvacuees(q, shelterId);
    return NextResponse.json({
      success: true,
      total: evacuees.length,
      data: evacuees,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to query evacuees' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.full_name || !body.shelter_id || !body.origin_village) {
      return NextResponse.json(
        { success: false, error: 'Nama, ID Posko, dan Desa Asal wajib diisi' },
        { status: 400 }
      );
    }

    const newEvacuee = addEvacuee({
      shelter_id: Number(body.shelter_id),
      full_name: body.full_name,
      age: Number(body.age) || 0,
      gender: body.gender || 'Laki-laki',
      origin_village: body.origin_village,
      health_condition: body.health_condition || 'Sehat',
      notes: body.notes || '',
    });

    return NextResponse.json(
      { success: true, message: 'Data pengungsi berhasil dicatat', data: newEvacuee },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Gagal menambahkan pengungsi' },
      { status: 500 }
    );
  }
}
