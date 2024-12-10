// src/app/api/publications/me/put/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromToken } from '@/app/api/user/auth';

export async function PUT(request: NextRequest) {
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

    // Parsear el cuerpo de la solicitud
    const body = await request.json();

    // Validar campos requeridos
    const { title, content, page_id, tags } = body;

    if (!title || !content || !page_id || !tags || tags.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "Faltan campos obligatorios" }), 
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    const publicationData = {
      title,
      content,
      page_id,
      tags
    };
    console.log(JSON.stringify(publicationData) )
    // Construir la URL para el endpoint de reacciones
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/publications/${publicationId}/${userId}`;

    // Realizar la llamada a la API del backend
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(publicationData) 
    });

    // Manejar la respuesta del backend
    const responseData = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({
        error: responseData.detail || "Error al actualizar publicación"
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
