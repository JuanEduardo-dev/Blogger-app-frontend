import { PrismaClient } from "@prisma/client";

// Función para crear una nueva instancia de PrismaClient
const prismaClientSingleton = (): PrismaClient => {
  return new PrismaClient();
};

// Se asigna el objeto global para acceder a la instancia de Prisma
const globalForPrisma = globalThis as { prisma?: PrismaClient };

// Usamos la instancia global si ya existe, o creamos una nueva
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// Exportamos la instancia de Prisma
export default prisma;

// En entornos de desarrollo, guardamos la instancia de Prisma en la variable global
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}