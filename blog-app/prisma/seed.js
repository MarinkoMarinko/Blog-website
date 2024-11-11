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
  // const post2 = await prisma.post.create({
  //   data: {
  //     title: 'Second Post',
  //     content: 'This is the content of the second post.',
  //     likeCount: 0,
  //     authorId: 'e8ad769c-c511-4454-a182-a202a2e33610', 
  //   },
  // });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
