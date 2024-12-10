import { getUserIdFromToken } from '@/app/api/user/auth';

export async function PUT(req: Request) {
  try {
    // Get user ID from token
    const userId = await getUserIdFromToken(req);

    // Parse the request body
    const requestBody = await req.json();

    // Validate request body (you can add more specific validation if needed)
    if (!requestBody) {
      return new Response(JSON.stringify({
        error: "Datos de actualización requeridos"
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Make the API call to update user
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "user-id": userId || ''
      },
      body: JSON.stringify({
        name: requestBody.name,
        lastName: requestBody.lastName,
        bio: requestBody.bio,
        degreeId: requestBody.degreeId
      })
    });

    // Check if the response is not OK
    if (!response.ok) {
      // Try to parse error response
      try {
        const errorData = await response.json();
        return new Response(JSON.stringify({
          error: errorData.detail || "Error al actualizar el usuario"
        }), { 
          status: response.status,
          headers: { 'Content-Type': 'application/json' }
        });
      } catch {
        // If parsing fails, return the raw error text
        const errorText = await response.text();
        return new Response(JSON.stringify({
          error: errorText || "Error desconocido al actualizar el usuario"
        }), { 
          status: response.status,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Parse the successful response
    const responseData = await response.json();

    // Successful response
    return new Response(JSON.stringify({
      message: "Usuario actualizado exitosamente",
      data: responseData
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : "Error de servidor"
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}