import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUserRecords(userEmail: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      include: {
        records: true,
      },
    });

    if (!user) {
      return [];
    }

    return user.records;
  } catch (error) {
    console.error('Error retrieving user records:', error);
    throw new Error('Failed to retrieve user records');
  }
}
