// //blogger-front/src/app/api/auth/[...nextauth]/route.ts

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

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "" },
        password: { label: "Password", type: "password", placeholder: "" },
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

        // Retornamos la información del usuario si la autenticación fue exitosa
        return {
          id: userFound.id,
          name: `${userFound.name} ${userFound.lastName}`,
          email: userFound.mail
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
          // Find or create user using email
          let existingUser = await db.user.findUnique({
            where: { mail: user.email! }
          });
    
          // If user doesn't exist, create a new user
          if (!existingUser) {
            existingUser = await db.user.create({
              data: {
                mail: user.email!,
                name: user.name?.split(' ')[0] || '',
                lastName: user.name?.split(' ')[1] || '',
                degreeId: 1, // Default degree ID
              }
            });
          }
    
          // Modify the user object to use the database ID
          user.id = existingUser.id;
    
          return true;
        } catch (error) {
          console.error("Error in Google Sign-In:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, account }) {
      // If user is logging in for the first time
      if (user) {
        token.id = user.id;
      }
    
      // For Google Sign-In, explicitly find and set the database user ID
      if (account?.provider === "google") {
        const existingUser = await db.user.findUnique({
          where: { mail: token.email! }
        });
    
        if (existingUser) {
          // Always use the database user ID, not the Google-provided ID
          token.id = existingUser.id;
        }
      }
    
      return token;
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
  },
  // Configuración de JWT para mayor seguridad
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };