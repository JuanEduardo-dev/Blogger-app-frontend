// src/app/api/publications/me/delete/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromToken } from '@/app/api/user/auth';

export async function DELETE(request: NextRequest) {
  try {
    // Extraer el ID de usuario del token
    const userId = await getUserIdFromToken(request);
    
    // Extraer el ID de la publicación de los parámetros de búsqueda
    const { searchParams } = new URL(request.url);
    const publicationId = searchParams.get('post');

    if (!publicationId) {
      return NextResponse.json(
        { error: 'No se proporcionó el ID de la publicación' },
        { status: 400 }
      );
    }

    // Construir la URL para el endpoint de reacciones
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/publications/${publicationId}/${userId}`;

    // Realizar la llamada a la API del backend
    const response = await fetch(apiUrl, { method: 'DELETE' });

    // Manejar la respuesta del backend
    const responseData = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({
        error: responseData.detail || "Error al eliminar publicación"
      }), { 
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Si la eliminación es exitosa, devolver una respuesta de éxito
    return NextResponse.json({ success: true });

  } catch (error) {

    // Manejar diferentes tipos de errores
    if (error instanceof Error) {
      if (error.message.includes('token')) {
        return NextResponse.json(
          { error: 'No autorizado', details: 'Token inválido o expirado' },
          { status: 401 }
        );
      }
    }

    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
