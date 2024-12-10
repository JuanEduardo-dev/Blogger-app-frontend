// app/api/publications.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromToken } from '@/app/api/user/auth';

export async function GET(request: NextRequest) {
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
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/reactions/reaction-get/${userId}/${publicationId}`;

    // Realizar la llamada a la API del backend
    const response = await fetch(apiUrl, { method: 'GET' });

    // Verificar si la respuesta está vacía o no es correcta
    if (!response.ok) {
      return NextResponse.json(
        { 
          error: 'Error en la solicitud',
          details: await response.text()
        },
        { status: response.status }
      );
    }

    // Intentar parsear la respuesta de la API
    let responseData;
    try {
      responseData = await response.json();
    } catch (parseError) {
      console.error('Error al parsear la respuesta:', parseError);
      return NextResponse.json(
        { error: 'Error al procesar la respuesta de la API' },
        { status: 500 }
      );
    }

    // Si "exists" es false, devolvemos que no hay reacción
    if (!responseData.exists) {
      return NextResponse.json(
        { message: 'El usuario no ha reaccionado a esta publicación', reaction_type: null },
        { status: 200 }
      );
    }

    // Si existe una reacción, devolvemos el tipo de reacción
    return NextResponse.json(
      {
        message: 'Reacción obtenida correctamente',
        reaction_type: responseData.reaction_type
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
