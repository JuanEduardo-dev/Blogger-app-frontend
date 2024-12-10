// GET.ts
import { getUserIdFromToken } from '@/app/api/user/auth';

export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromToken(req);
    console.log(userId)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        "user-id": userId || '' 
      })
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.log("User ID extraído de GET:", userId);
      return new Response(JSON.stringify({
        error: responseData.detail || "Error al obtener el usuario"
      }), { 
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      message: "Usuario obtenido exitosamente",
      data: responseData
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    
    return new Response(JSON.stringify({
      error: "Error de servidor"
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
