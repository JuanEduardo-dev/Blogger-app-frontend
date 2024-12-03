// src/app/api/degrees/route.ts
import { NextResponse } from "next/server";
import db from "@/lib/prisma";

export async function GET() {
  try {
    const degrees = await db.degree.findMany();
    return NextResponse.json(degrees);
  } catch {
    return NextResponse.json(
      { message: "No se pudieron obtener los títulos" },
      { status: 500 }
    );
  }
}