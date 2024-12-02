// blogger-front/src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/libs/prisma";

interface UserData {
  name: string;
  lastName: string;
  email: string;
  password: string;
  bio?: string;
  degreeId: number;
}

interface ErrorResponse {
  message: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const data: UserData = await request.json();

    // Check if user exists
    const userFound = await db.user.findUnique({
      where: {
        mail: data.email,
      },
    });

    // If user exists, return error
    if (userFound) {
      return NextResponse.json<ErrorResponse>(
        {
          message: "Ya existe una cuenta asociada a este correo",
        },
        {
          status: 400,
        }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create new user
    const newUser = await db.user.create({
      data: {
        name: data.name,
        lastName: data.lastName,
        mail: data.email,
        password: hashedPassword,
        bio: data.bio || "", // Optional bio
        degreeId: data.degreeId, // Dynamic degree selection
      },
    });

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = newUser;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
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