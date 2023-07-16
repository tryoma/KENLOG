import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '../../../lib/prisma';

export default async function createOrder(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || '',
    },
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { recordId, teacherId, comment } = req.body;

  try {
    const newOrder = await prisma.order.create({
      data: {
        recordId,
        teacherId,
        comment,
        status: 'pending',
      },
    });

    res.json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create order' });
  }
}
