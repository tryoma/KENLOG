import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { prisma } from '../../../lib/prisma';

// const prisma = new PrismaClient();

export default async function deleteRecord(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Record ID is required' });
  }

  try {
    const record = await prisma.record.findUnique({
      where: { id: Number(id) },
    });

    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    await prisma.record.delete({ where: { id: Number(id) } });

    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting record:', error);
    res.status(500).json({ error: 'Failed to delete record' });
  }
}
