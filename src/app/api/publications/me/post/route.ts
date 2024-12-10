import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromToken } from '@/app/api/user/auth';

export async function POST(req: NextRequest) {
  try {
    // Obtener el ID del usuario desde el token
    const userId = await getUserIdFromToken(req);

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "No se encontró el ID de usuario" }), 
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parsear el cuerpo de la solicitud
    const body = await req.json();

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

    // Preparar datos para enviar al backend
    const publicationData = {
      title,
      content,
      page_id,
      user_id: userId,
      tags
    };

    // Enviar datos al backend de FastAPI
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/publications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(publicationData)
    });

    if (!response.ok) {
      throw new Error('Error al crear la publicación en el backend');
    }

    const result = await response.json();

    return NextResponse.json({ 
      message: 'Publicación creada exitosamente', 
      publication: result 
    }, { status: 201 });

  } catch (error) {
    console.error('Error en la creación de publicación:', error);
    return new NextResponse(
      JSON.stringify({ error: "Error interno del servidor" }), 
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}