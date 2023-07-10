import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '../../../lib/prisma';

export default async function createRecord(
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

  const { title, description, place, youtubeURL } = req.body;

  try {
    const newRecord = await prisma.record.create({
      data: {
        userId: user.id,
        title,
        description,
        place,
        youtubeURL,
      },
    });

    res.json(newRecord);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create record' });
  }
}
