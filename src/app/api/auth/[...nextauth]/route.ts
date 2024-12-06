//blogger-front/src/app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import db from "@/lib/prisma";
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

        if (!matchPassword) throw new Error("Contraseña incorrecta");
        //console.log(userFound)
        // Retornamos la información del usuario si la autenticación fue exitosa
        return {
          id: userFound.id,
          name: `${userFound.name} ${userFound.lastName}`,
          email: userFound.mail,
        };
      },
    }),
    // Agrega el proveedor de Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // Configura los scopes que necesitas
      authorization: {
        params: {
          scope: "openid email profile"
        }
      }
    })
  ],
  callbacks: {
    // Callback para manejar el inicio de sesión con Google
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // Busca si el usuario ya existe en tu base de datos
          let existingUser = await db.user.findUnique({
            where: { mail: user.email! }
          });

          // Si no existe, crea un nuevo usuario
          if (!existingUser) {
            existingUser = await db.user.create({
              data: {
                mail: user.email!,
                name: user.name?.split(' ')[0] || '',
                lastName: user.name?.split(' ')[1] || '',
                // Agrega un degreeId por defecto si es necesario
                degreeId: 1, // Ajusta esto según tu lógica
                // No incluyas password para usuarios de Google
              }
            });
          }

          return true;
        } catch (error) {
          console.error("Error en el inicio de sesión de Google:", error);
          return false;
        }
      }
      return true;
    },

    // Personaliza la sesión para incluir información del usuario
    async session({ session, token }) {
      if (token.sub) {
        // Busca el usuario en la base de datos
        const user = await db.user.findUnique({
          where: { mail: token.email! }
        });

        if (user) {
          session.user.id = user.id;
          session.user.name = `${user.name} ${user.lastName}`;
        }
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/login", // Página personalizada de inicio de sesión
  },
  session: {
    // Duración de la sesión en segundos
    maxAge: 24 * 60 * 60, // 24 horas
    // Actualizar la sesión cada vez que hay actividad
    updateAge: 60 * 60, // 1 hora
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };