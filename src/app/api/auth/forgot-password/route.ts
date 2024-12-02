// app/api/auth/forgot-password/route.ts
import { NextResponse } from 'next/server';
import db from '@/libs/prisma';
import { randomBytes } from 'crypto';
import { sendPasswordResetEmail } from '@/utils/emailService';
import { addHours } from 'date-fns'; // Importa addHours de date-fns

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    // Find user by email
    const user = await db.user.findUnique({
      where: { mail: email }
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Ningún usuario encontrado con este correo' },
        { status: 404 }
      );
    }

    // Generate reset token
    const resetToken = randomBytes(32).toString('hex');
    
    // Use date-fns to handle timezone-independent expiration
    const resetTokenExpiry = addHours(new Date(), 1); // 1 hour from now, in user's local time

    // Update user with reset token
    await db.user.update({
      where: { mail: email },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetTokenExpiry
      }
    });

    // Send reset email
    await sendPasswordResetEmail(email, resetToken);

    return NextResponse.json({ message: 'Enlace de restablecimiento de contraseña enviado' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Algo salió mal' },
      { status: 500 }
    );
  }
}