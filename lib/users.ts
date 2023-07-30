import { PrismaClient } from '@prisma/client';
import { FrontendUser } from '../types/frontendUser';

const prisma = new PrismaClient();

export async function checkUserIsTeacher(userEmail: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      return false;
    }

    return user.teacherFlag;
  } catch (error) {
    console.error('Error retrieving user records:', error);
    throw new Error('Failed to retrieve user records');
  }
}
