// app/api/auth/reset-password/route.ts
import { NextResponse } from 'next/server';
import db from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { token, newPassword } = await request.json();

    // Find user with valid reset token
    const user = await db.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          // Usa isAfter para verificar la expiración de manera precisa
          gt: new Date() 
        }
      }
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Token de reinicio no válido o vencido' }, 
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password and clear reset token
    await db.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null
      }
    });

    return NextResponse.json({ 
      message: 'Restablecimiento de contraseña exitoso' 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Algo salió mal' }, 
      { status: 500 }
    );
  }
}