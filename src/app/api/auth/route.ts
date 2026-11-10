import { NextRequest, NextResponse } from 'next/server';
import { verifySharedPassword } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const password = body.password;

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Password wajib dimasukkan' },
        { status: 400 }
      );
    }

    const isValid = verifySharedPassword(password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Password akses petugas tidak sesuai' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: 'Autentikasi petugas berhasil',
      user: {
        role: 'OFFICER',
        label: 'Petugas Posko Terpadu',
      },
    });

    // Set simple emergency auth cookie
    response.cookies.set('si_karhutla_officer', 'authenticated', {
      httpOnly: false, // Accessible to client-side session checker
      path: '/',
      maxAge: 60 * 60 * 12, // 12 hours
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Proses autentikasi gagal' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: 'Logout berhasil',
  });

  response.cookies.delete('si_karhutla_officer');
  return response;
}
