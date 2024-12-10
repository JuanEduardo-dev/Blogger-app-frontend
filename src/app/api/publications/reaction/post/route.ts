// app/api/reactions/toggle/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromToken } from '@/app/api/user/auth';

export async function POST(request: NextRequest) {
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

    // Parsear el tipo de reacción del cuerpo de la solicitud
    const { type } = await request.json();

    if (!type) {
      return NextResponse.json(
        { error: 'Tipo de reacción no proporcionado' },
        { status: 400 }
      );
    }

    // Construir datos de reacción
    const reactionData = {
      id_user: userId,
      id_publication: publicationId,
      type: type
    };

    // Construir la URL para el endpoint de toggle de reacciones
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/reactions/toggle`;

    // Realizar la llamada a la API del backend
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reactionData)
    });

    // Parsear la respuesta
    const responseData = await response.json();

    // Manejar diferentes escenarios de respuesta
    if (!response.ok) {
      return NextResponse.json(
        { 
          error: responseData.detail || 'Error al alternar reacción',
          errorData: responseData
        },
        { status: response.status }
      );
    }

    // Respuesta exitosa de toggle de reacción
    return NextResponse.json(
      {
        message: 'Reacción actualizada exitosamente',
        data: responseData
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en toggle de reacción:', error);

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