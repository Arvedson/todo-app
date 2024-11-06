
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import  authOptions  from '../auth/authOptions';
import prisma from '../../../../lib/prisma';

export async function GET() {
  try {
    
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse(JSON.stringify({ error: 'No autorizado' }), { status: 401 });
    }

    // Filtrar las tareas por el `userId` de la sesión
    const tasks = await prisma.task.findMany({
      where: {
        userId: session.user.id,
      },
    });

    // Devolver las tareas como respuesta JSON
    return new NextResponse(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    return new NextResponse(JSON.stringify({
      error: 'Error al obtener las tareas',
      details: error instanceof Error ? error.message : String(error),
    }), { status: 500 });
  }
}
