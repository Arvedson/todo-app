import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { getServerSession } from "next-auth";
import  authOptions  from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    // Obtener la sesión del usuario
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // Filtrar las tareas por el `userId` de la sesión
    const tasks = await prisma.task.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    return NextResponse.json(
      { error: 'Error al obtener las tareas', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
