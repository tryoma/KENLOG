import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Information } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { title, description }: Information = req.body;

  try {
    const newInformation = await prisma.information.create({
      data: {
        title,
        description,
        postDate: new Date(),
      },
    });

    res.status(200).json(newInformation);
  } catch (err) {
    res.status(500).json({ error: 'Unable to create new information' });
  }
}
