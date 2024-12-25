import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const generateRandomReviews = () => {
  const reviews: Prisma.ReviewCreateManyInput[] = [];

  for (let i = 0; i < 20; i++) {
    reviews.push({
      title: `Review ${i}`,
      content: `This is a sample review ${i}.`,
      rating: Math.floor(Math.random() * 5) + 1,
      author: `Author ${i}`,
    });
  }
  return reviews;
};

async function main() {
  await prisma.review.createMany({
    data: generateRandomReviews(),
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
