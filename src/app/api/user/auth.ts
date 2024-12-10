// auth.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/AuthOption";
import { getToken } from "next-auth/jwt";
import { NextApiRequest } from "next";

export async function getUserIdFromToken(req: Request) {
  // Get server-side session
  const session = await getServerSession(authOptions);
  
  // Get token from request
  const token = await getToken({
    req: req as unknown as NextApiRequest,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Check if user is authenticated
  if (!session || !token) {
    throw new Error("Usuario no autenticado");
  }

  // Return user ID from token
  return token.sub;
}
