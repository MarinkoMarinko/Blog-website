const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

async function main() {
  // const user = await prisma.user.create({
  //   data: {
  //     username: 'testuser',
  //     password: 'password123', 
  //   },
  // });

  // console.log('Created user:', user);

  // const post1 = await prisma.post.create({
  //   data: {
  //     title: 'First Post',
  //     content: 'This is the content of the first post.',
  //     likeCount: 0,
  //     authorId: user.id, 
  //   },
  // });
  const post2 = await prisma.post.create({
    data: {
      title: 'Second Post',
      content: 'This is the content of the first post.',
      likeCount: 0,
      authorId: '6fbd5d2f-b446-449a-a5fe-d4b5b588314f', 
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
