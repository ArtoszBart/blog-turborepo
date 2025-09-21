import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

async function main() {
  console.log('Seeding The Database');

  const users = Array.from({ length: 10 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.lorem.sentence(),
    avatar: faker.image.avatar(),
  }));
  await prisma.user.createMany({
    data: users,
  });

  const posts = Array.from({ length: 40 }).map(() => {
    const title = faker.lorem.sentence();

    return {
      title,
      slug: generateSlug(title),
      content: faker.lorem.paragraphs(3),
      thumbnail: faker.image.urlLoremFlickr(),
      authorId: faker.number.int({ min: 1, max: 10 }),
      published: true,
    };
  });
  await Promise.all(
    posts.map(async (post) => {
      const commentsNumber = Math.floor(Math.random() * 21);

      return await prisma.post.create({
        data: {
          ...post,
          comments: {
            createMany: {
              data: Array.from({ length: commentsNumber }).map(() => ({
                content: faker.lorem.sentence(),
                authorId: faker.number.int({ min: 1, max: 10 }),
              })),
            },
          },
        },
      });
    }),
  );
}

void main()
  .then(async () => {
    console.log('Seeding Completed');
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    console.error(e);
    process.exit(1);
  });
