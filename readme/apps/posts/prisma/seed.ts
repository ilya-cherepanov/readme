import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function fillDb() {
  await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      creatorId: '10',
      authorId: '10',
      postCategory: 'text',
      postStatus: 'published',
      publishedAt: new Date().toISOString(),
      isRePost: false,
      tags: ['Hello'],
      title: 'Hello Hello',
      text: 'Hello, World!',
      previewText: 'Hello',
    },
  });
  await prisma.post.upsert({
    where: { id: 2 },
    update: {},
    create: {
      creatorId: '10',
      authorId: '10',
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
      creatorId: '10',
      authorId: '10',
      postCategory: 'video',
      postStatus: 'published',
      publishedAt: new Date().toISOString(),
      isRePost: false,
      tags: ['Holidays', 'Fun'],
      title: 'Holidays!!!',
      video: '/posts/videos/ac623311-9728-4974-946e-0fb886e97fc5',
    },
  });
  await prisma.post.upsert({
    where: { id: 4 },
    update: {},
    create: {
      creatorId: '10',
      authorId: '10',
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
      creatorId: '10',
      authorId: '10',
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
