// app/api/publications/all/get-by-id/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Ahora estamos asegurándonos de que los parámetros sean esperados correctamente.
export async function GET(
  request: NextRequest,
  { params }: { params: { publicationId: string } }
) {
  // No debes acceder a `params` directamente sino esperar que se resuelvan
  try {
    // La propiedad `params` es asincrónica, debemos esperar su resolución
    const { publicationId } = await params;

    if (!publicationId) {
      return NextResponse.json(
        { error: 'No se proporcionó el ID de la publicación' },
        { status: 400 }
      );
    }

    // Construir la URL con el ID de la publicación
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/publications/${publicationId}`;

    const response = await fetch(apiUrl);

    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: responseData.detail || 'Error al obtener la publicación' },
        { status: response.status }
      );
    }

    // Si la publicación no existe, devuelve un mensaje adecuado
    if (responseData.detail === 'Publication not found') {
      return NextResponse.json(
        {
          message: 'Publicación no encontrada.',
          data: {},
        },
        { status: 404 }
      );
    }

    // Si la publicación se encuentra, devolverla.
    return NextResponse.json(
      {
        message: 'Publicación obtenida exitosamente',
        data: responseData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error al obtener la publicación:', error);

    return NextResponse.json(
      { error: 'Error de servidor' },
      { status: 500 }
    );
  }
}
