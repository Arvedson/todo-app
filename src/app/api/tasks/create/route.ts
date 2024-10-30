import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

export async function POST(request: Request) {
  try {
    // Extraemos el título desde el cuerpo de la solicitud
    const { title } = await request.json();

    // Verifica que title esté definido
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    // Crea la nueva tarea en la base de datos con `completed` por defecto en `false`
    const task = await prisma.task.create({
      data: {
        title,
        completed: false, // Valor predeterminado
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
