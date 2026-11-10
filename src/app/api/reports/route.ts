import { NextRequest, NextResponse } from 'next/server';
import { getAllReports, getReportByTicket, createMissingReport } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || undefined;
    const ticket = searchParams.get('ticket') || undefined;

    if (ticket) {
      const report = getReportByTicket(ticket);
      if (!report) {
        return NextResponse.json(
          { success: false, error: 'Tiket pelaporan tidak ditemukan' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: report });
    }

    const reports = getAllReports(status);
    return NextResponse.json({
      success: true,
      total: reports.length,
      data: reports,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Gagal mengambil data laporan' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.reporter_name || !body.reporter_phone || !body.victim_name || !body.last_seen_location) {
      return NextResponse.json(
        { success: false, error: 'Semua kolom bertanda bintang wajib diisi' },
        { status: 400 }
      );
    }

    const report = createMissingReport({
      reporter_name: body.reporter_name,
      reporter_phone: body.reporter_phone,
      victim_name: body.victim_name,
      victim_age: Number(body.victim_age) || 0,
      last_seen_location: body.last_seen_location,
      description: body.description || '',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Laporan berhasil dibuat dengan status PENDING_VERIFICATION',
        ticket_code: report.ticket_code,
        data: report,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Gagal mengirimkan laporan' },
      { status: 500 }
    );
  }
}
