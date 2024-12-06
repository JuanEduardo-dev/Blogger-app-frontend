// DELETE.ts
import { getUserIdFromToken } from '@/app/api/user/auth';

export async function DELETE(req: Request) {
  try {
    // Obtener el userId del token
    const userId = await getUserIdFromToken(req);

    // Hacer la solicitud DELETE al backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        "user-id": userId || '' // Asegurar que userId es un string
      })
    });

    // Manejar la respuesta del backend
    const responseData = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({
        error: responseData.detail || "Error al eliminar el usuario"
      }), { 
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Eliminación exitosa
    return new Response(JSON.stringify({
      message: "Usuario eliminado exitosamente"
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    // Server-side error handling
    console.error("Error en la eliminación de usuario:", error);
    
    return new Response(JSON.stringify({
      error: "Error de servidor"
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
