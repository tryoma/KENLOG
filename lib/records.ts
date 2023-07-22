import { PrismaClient } from '@prisma/client';
import { FrontendRecord } from '../types/frontendRecord';

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

    const frontendRecords: FrontendRecord[] = user.records.map(
      (prismaRecord) => ({
        id: prismaRecord.id,
        userId: prismaRecord.userId,
        title: prismaRecord.title,
        postDate: prismaRecord.postDate.toISOString(),
        description: prismaRecord.description,
        place: prismaRecord.place,
        youtubeURL: prismaRecord.youtubeURL,
        userName: user.name,
        userImage: user.image,
      }),
    );

    return frontendRecords;
  } catch (error) {
    console.error('Error retrieving user records:', error);
    throw new Error('Failed to retrieve user records');
  }
}

export async function getOthersRecords(userEmail: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const records = await prisma.record.findMany({
      where: {
        userId: {
          not: user.id,
        },
      },
      include: {
        user: true,
      },
    });

    const frontendRecords: FrontendRecord[] = records.map((prismaRecord) => ({
      id: prismaRecord.id,
      userId: prismaRecord.userId,
      title: prismaRecord.title,
      postDate: prismaRecord.postDate.toISOString(),
      description: prismaRecord.description,
      place: prismaRecord.place,
      youtubeURL: prismaRecord.youtubeURL,
      userName: prismaRecord.user.name,
      userImage: prismaRecord.user.image,
    }));

    return frontendRecords;
  } catch (error) {
    console.error('Error retrieving others records:', error);
    throw new Error('Failed to retrieve others records');
  }
}
