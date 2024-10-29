import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, userId } = req.body;
    const task = await prisma.task.create({
      data: {
        title,
        userId,
      },
    });
    res.status(200).json(task);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
