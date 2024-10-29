import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }

  if (req.method === 'PUT') {
    // Lógica para actualizar una tarea
    const { title, completed } = req.body;
    try {
      const task = await prisma.task.update({
        where: { id: Number(id) },
        data: { title, completed },
      });
      res.status(200).json(task);
    } catch (error) {
        console.error(error); // Opcional: registrar el error en la consola para depuración
        res.status(500).json({ error: 'Error updating task', details: error });
      }
  } else if (req.method === 'DELETE') {
    // Lógica para eliminar una tarea
    try {
      await prisma.task.delete({
        where: { id: Number(id) },
      });
      res.status(204).end(); // 204 No Content
    } catch {
        res.status(500).json({ error: 'Error updating task' });
      }
      
  } else {
    // Método no permitido
    res.status(405).json({ message: 'Method not allowed' });
  }
}
