import { getUserIdFromToken } from '@/app/api/user/auth';

export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromToken(req);

    // Verificar si se obtuvo el userId, si no, devolver un error
    if (!userId) {
      return new Response(JSON.stringify({
        error: "No se encontró el ID de usuario"
      }), { 
        status: 400, 
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Construir la URL con el userId en el lugar adecuado
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/publications/by-user/${userId}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json"
      })
    });

    const responseData = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({
        error: responseData.detail || "Error al obtener las publicaciones"
      }), { 
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      message: "Publicaciones obtenidas exitosamente",
      data: responseData
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Error al obtener publicaciones", error);
    
    return new Response(JSON.stringify({
      error: "Error de servidor"
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
