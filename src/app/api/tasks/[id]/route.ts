import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

// Función para manejar la eliminación de una tarea
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const taskId = Number(resolvedParams.id);
  if (isNaN(taskId)) {
    return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
  }

  try {
    await prisma.task.delete({ where: { id: taskId } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    return NextResponse.json(
      { error: 'Error deleting task', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// Función para manejar la actualización de una tarea
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const taskId = Number(resolvedParams.id);
  if (isNaN(taskId)) {
    console.error("ID de tarea no válido:", resolvedParams.id);
    return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
  }

  try {
    const { title, completed } = await request.json();

    // Validación simple para asegurar que los datos necesarios están presentes
    if (title === undefined || completed === undefined) {
      return NextResponse.json({ error: "Title and completed status are required" }, { status: 400 });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: { title, completed },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    return NextResponse.json(
      { error: 'Error updating task', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

