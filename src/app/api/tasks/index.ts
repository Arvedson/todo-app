import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
