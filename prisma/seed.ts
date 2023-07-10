const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

async function main() {
  const newUser = await prisma.user.create({
    data: {
      email: 'tryoma0326@gmail.com',
      defaultName: '管理者',
      teacherFlag: true,
      isAdmin: true,
    },
  })
  console.log('Created new user: ', newUser)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })