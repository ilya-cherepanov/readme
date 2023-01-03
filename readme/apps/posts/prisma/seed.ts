import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function fillDb() {
  await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      creatorId: '63945562fd749e7b515950de',
      authorId: '63945562fd749e7b515950de',
      postCategory: 'text',
      postStatus: 'published',
      publishedAt: new Date().toISOString(),
      isRePost: false,
      tags: ['nestjs'],
      title: 'A progressive Node.js framework',
      text: 'A complete development kit for building scalable server-side apps. Contact us to find out more about expertise consulting, on-site enterprise support, trainings, and private sessions.',
      previewText: 'A complete development kit for building scalable server-side apps. Contact us...',
    },
  });
  await prisma.post.upsert({
    where: { id: 2 },
    update: {},
    create: {
      creatorId: '63945562fd749e7b515950de',
      authorId: '63945562fd749e7b515950de',
      postCategory: 'quote',
      postStatus: 'published',
      publishedAt: new Date().toISOString(),
      isRePost: false,
      tags: ['IT', 'OSF'],
      text: 'With software there are only two possibilities: either the users control the programme or the programme controls the users. If the programme controls the users, and the developer controls the programme, then the programme is an instrument of unjust power.',
      quoteAuthor: 'Richard Stallman',
    },
  });
  await prisma.post.upsert({
    where: { id: 3 },
    update: {},
    create: {
      creatorId: '63945562fd749e7b515950de',
      authorId: '63945562fd749e7b515950de',
      postCategory: 'video',
      postStatus: 'published',
      publishedAt: new Date().toISOString(),
      isRePost: false,
      tags: ['Holidays', 'Fun'],
      title: 'NestJs JWT - Access Tokens & Refresh Tokens',
      video: 'https://www.youtube.com/watch?v=uAKzFhE3rxU',
    },
  });
  await prisma.post.upsert({
    where: { id: 4 },
    update: {},
    create: {
      creatorId: '63945562fd749e7b515950de',
      authorId: '63945562fd749e7b515950de',
      postCategory: 'link',
      postStatus: 'published',
      publishedAt: new Date().toISOString(),
      isRePost: false,
      tags: ['Скидки', 'Халява'],
      link: 'http://site.com/content/some-content',
      description: 'Информация о скидках',
    },
  });
  await prisma.post.upsert({
    where: { id: 5 },
    update: {},
    create: {
      creatorId: '63945562fd749e7b515950de',
      authorId: '63945562fd749e7b515950de',
      postCategory: 'photo',
      postStatus: 'published',
      publishedAt: new Date().toISOString(),
      isRePost: false,
      tags: ['Берег', 'Закат'],
      photo: '/posts/photos/ac623311-9728-4974-946e-0fb886e97fcc',
    },
  });
}

(async () => {
  try {
    await fillDb();
  } catch (err) {
    console.error(err)
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})()
