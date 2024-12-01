// blogger-front/src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/libs/prisma";

interface UserData {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

interface ErrorResponse {
  message: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Definir los datos que recibimos en el body como un objeto con la interfaz UserData
    const data: UserData = await request.json();

    // Buscar si ya existe un usuario con el mismo email
    const userFound = await db.user.findUnique({
      where: {
        mail: data.email,
      },
    });

    // Si el usuario ya existe, retornar un error
    if (userFound) {
      return NextResponse.json<ErrorResponse>(
        {
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    // Hashear la contraseña del usuario
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Crear el nuevo usuario en la base de datos
    const newUser = await db.user.create({
      data: {
        name: data.name,
        lastName: data.lastName,
        mail: data.email,
        password: hashedPassword,
        degreeId: 1, // Default degree ID as per your schema
      },
    });

    // Usar desestructuración para excluir la contraseña
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = newUser;


    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    // Manejo de errores, retornamos el mensaje de error
    return NextResponse.json<ErrorResponse>(
      {
        message: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}
