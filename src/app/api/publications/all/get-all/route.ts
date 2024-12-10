export async function GET() {
  try {
    // Construir la URL con el ID del usuario
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/publications/all-items`;

    const response = await fetch(apiUrl, {
      method: "GET"
    });

    const responseData = await response.json();

    // Si la respuesta es vacía, asegúrate de que la lista esté vacía, pero sigue respondiendo con 200 OK.
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: responseData.detail || "Error al obtener las publicaciones" }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Si no hay publicaciones, devolver una lista vacía en lugar de un error.
    if (responseData.detail === "No publications found") {
      return new Response(
        JSON.stringify({
          message: "No hay publicaciones disponibles.",
          data: [],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Si hay publicaciones, devuelve las publicaciones.
    return new Response(
      JSON.stringify({
        message: "Publicaciones obtenidas exitosamente",
        data: responseData,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error al obtener publicaciones:", error);

    return new Response(
      JSON.stringify({ error: "Error de servidor" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
