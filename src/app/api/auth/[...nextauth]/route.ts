//blogger-front/src/app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/libs/prisma";
import bcrypt from "bcrypt";

// Definir el tipo para las credenciales de autenticación
interface Credentials {
  email: string;
  password: string;
}

// Definir el tipo para la respuesta del usuario después de la autenticación
/*interface AuthUser {
  id: string;
  name: string;
  email: string;
}*/

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials: Credentials | undefined) {
        // Verificamos que las credenciales no sean `undefined`
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Se requieren correo electrónico y contraseña");
        }

        // Buscar si ya existe un usuario con el mismo correo electrónico
        const userFound = await db.user.findUnique({
          where: {
            mail: credentials.email,
          },
        });

        // Si no se encuentra el usuario, lanzamos un error
        if (!userFound) throw new Error("Ningún usuario encontrado");

        // Verificamos si la contraseña es `null`, ya que bcrypt no puede manejar `null`
        if (!userFound.password) {
          throw new Error("Falta la contraseña en la base de datos");
        }

        // Comprobamos si la contraseña coincide
        const matchPassword = await bcrypt.compare(credentials.password, userFound.password);

        if (!matchPassword) throw new Error("Wrong password");

        // Retornamos la información del usuario si la autenticación fue exitosa
        return {
          id: userFound.id,
          name: `${userFound.name} ${userFound.lastName}`,
          email: userFound.mail,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login", // Página personalizada de inicio de sesión
  },
  session: {
    // Duración de la sesión en segundos
    maxAge: 24 * 60 * 60, // 24 horas
    // Actualizar la sesión cada vez que hay actividad
    updateAge: 60 * 60, // 1 hora
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };