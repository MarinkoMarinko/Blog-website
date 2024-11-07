const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      username: 'testuser',
      password: 'password123', 
    },
  });

  console.log('Created user:', user);

  const post = await prisma.post.create({
    data: {
      title: 'First Post',
      content: 'This is the content of the first post.',
      likeCount: 0,
      authorId: user.id, 
    },
  });

  console.log('Created post:', post);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
