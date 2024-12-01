import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bucassan.clinica.dental@gmail.com',
    pass: 'xaxd begf yvfn niei'  // App Password de Google
  }
});

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password/${token}`;

  try {
    await transporter.sendMail({
      from: 'bucassan.clinica.dental@gmail.com',
      to: email,
      subject: 'Recuperación de Contraseña',
      html: `
        <h1>Recuperación de Contraseña</h1>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetUrl}">Restablecer Contraseña</a>
        <p>Este enlace expirará en 1 hora.</p>
        <small>Si no solicitaste este cambio, ignora este correo.</small>
      `
    });
    
    console.log('Correo de recuperación enviado exitosamente');
  } catch (error) {
    console.error('Error enviando correo de recuperación:', error);
    throw new Error('No se pudo enviar el correo de recuperación');
  }
}