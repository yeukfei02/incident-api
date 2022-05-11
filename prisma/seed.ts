import { PrismaClient, Status } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

(async () => {
  await createUsers();
  await raiseIncidents();
})();

async function createUsers() {
  const usersDataList = [];

  for (let index = 0; index < 5; index++) {
    const usersData = {
      email: faker.internet.email(),
      is_admin: index % 2 === 0 ? true : false,
    };
    usersDataList.push(usersData);
  }

  if (usersDataList) {
    await prisma.users.createMany({
      data: usersDataList,
    });
  }
}

async function raiseIncidents() {
  const incidentsDataList = [];

  const users = await prisma.users.findMany({
    take: 5,
    orderBy: {
      created_at: 'desc',
    },
  });

  for (let index = 0; index < 5; index++) {
    const usersData = {
      name: faker.name.findName(),
      type: faker.lorem.word(),
      creator_id: users[index].id,
      assignee_id: users[index].id,
      status: index % 2 === 0 ? Status.ACKNOWLEDGE : Status.NOT_STARTED,
    };
    incidentsDataList.push(usersData);
  }

  if (incidentsDataList) {
    await prisma.incident.createMany({
      data: incidentsDataList,
    });
  }
}
