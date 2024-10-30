import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';



export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const taskId = Number(params.id);
  if (isNaN(taskId)) return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });

  try {
    await prisma.task.delete({ where: { id: taskId } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    return NextResponse.json(
      { error: 'Error updating task', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  } 
    return NextResponse.json({ error: 'Error deleting task' }, { status: 500 });
  }


export async function PUT(request: Request, context: { params: { id: string } }) {
  try {
    const taskId = Number(context.params.id);
    if (isNaN(taskId)) {
      console.error("ID de tarea no válido:", context.params.id);
      return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
    }

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