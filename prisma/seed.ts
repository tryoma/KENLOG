const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.create({
    data: {
      email: 'tryoma0326@gmail.com',
      name: '管理者',
      image:
        'https://lh3.googleusercontent.com/a/AAcHTtd5cGS8lMfxGtHeY_JSeH6c564_F4HED91TAMrg5hRzjvI=s96-c',
      teacherFlag: true,
      isAdmin: true,
    },
  });
  console.log('Created new user: ', newUser);

  const newRecord = await prisma.record.create({
    data: {
      userId: newUser.id, // User ID of the newly created user
      title: 'Sample Record',
      description: 'This is a sample record.',
      place: 'Sample Place',
      youtubeURL: 'cal6Uuyb8vI&t',
    },
  });
  console.log('Created new record: ', newRecord);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
