//blogger-front/src/middleware.js

// middleware.ts (en la raíz del proyecto)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  // Obtener el token de la sesión
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  })

  // Rutas que no requieren autenticación
  const publicPaths = ['/auth/login', '/auth/register', '/public']

  // Verificar si la ruta actual es pública
  const isPublicPath = publicPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  // Lógica de redirección
  if (isPublicPath && token) {
    // Si está logueado e intenta acceder a una ruta pública, redirigir al home
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Rutas protegidas (añade las rutas que requieren autenticación)
  const protectedPaths = [
    '/dashboard', 
    '/profile', 
    '/settings', 
    '/admin'
  ]

  // Verificar si la ruta actual requiere autenticación
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  // Si la ruta está protegida y no hay token, redirigir al login
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Continuar con la solicitud si no se cumple ninguna condición
  return NextResponse.next()
}

// Configurar las rutas que debe manejar el middleware
export const config = {
  matcher: [
    // Rutas públicas
    '/auth/login',
    '/auth/register',
    
    // Rutas protegidas
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/admin/:path*'
  ]
}