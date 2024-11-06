import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';
import { getServerSession } from 'next-auth';
import  authOptions  from '../../auth/authOptions';

export async function POST(request: Request) {
  try {
    // Obtener la sesión del usuario
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { title } = await request.json();
    if (!title) {
      return NextResponse.json({ error: 'El título es obligatorio' }, { status: 400 });
    }

    // Crear la tarea asociada al usuario autenticado
    const task = await prisma.task.create({
      data: {
        title,
        completed: false,
        user: {
          connect: { id: session.user.id },
        },
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    return NextResponse.json(
      { error: 'Error al crear la tarea', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
