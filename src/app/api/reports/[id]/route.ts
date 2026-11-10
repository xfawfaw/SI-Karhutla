import { NextRequest, NextResponse } from 'next/server';
import { updateReportStatus } from '@/lib/db';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const reportId = parseInt(id, 10);
    const body = await req.json();

    if (!reportId || !body.status) {
      return NextResponse.json(
        { success: false, error: 'ID laporan dan status baru diperlukan' },
        { status: 400 }
      );
    }

    const updated = updateReportStatus(reportId, body.status, {
      matched_shelter_id: body.matched_shelter_id ? Number(body.matched_shelter_id) : undefined,
      officer_notes: body.officer_notes,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Laporan tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Status laporan berhasil diperbarui menjadi ${body.status}`,
      data: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Gagal memperbarui status laporan' },
      { status: 500 }
    );
  }
}
