import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';
import { faker } from '@faker-js/faker';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const prismaService = new PrismaService();
    service = new UsersService(prismaService);
  });

  describe('service should be defined', () => {
    it('return success', () => {
      expect(service).toBeDefined();
    });
  });

  describe('createUsers', () => {
    let users: any = {};

    beforeEach(async () => {
      const createUserDto = {
        email: faker.internet.email(),
        is_admin: true,
      };
      users = await service.createUser(createUserDto);
    });

    it('return success', async () => {
      console.log('users = ', users);
      expect(users).toBeDefined();
      expect(users.id).toBeDefined();
      expect(users.email).toBeDefined();
      expect(users.is_admin).toBeDefined();
      expect(users.created_at).toBeDefined();
      expect(users.updated_at).toBeDefined();
    });
  });

  describe('getUsers', () => {
    let users: any = {};

    beforeEach(async () => {
      users = await service.getUsers(1, 20);
    });

    it('return success', async () => {
      console.log('users = ', users);
      expect(users).toBeDefined();

      for (let index = 0; index < users.length; index++) {
        const item = users[index];

        expect(item.id).toBeDefined();
        expect(item.email).toBeDefined();
        expect(item.is_admin).toBeDefined();
        expect(item.created_at).toBeDefined();
        expect(item.updated_at).toBeDefined();
      }
    });
  });

  describe('getUserById', () => {
    let users: any = {};

    beforeEach(async () => {
      const usersList = await service.getUsers(1, 20);
      if (usersList) {
        const id = usersList[0].id;
        users = await service.getUserById(id);
      }
    });

    it('return success', async () => {
      console.log('users = ', users);
      expect(users).toBeDefined();
      expect(users.id).toBeDefined();
      expect(users.email).toBeDefined();
      expect(users.is_admin).toBeDefined();
      expect(users.created_at).toBeDefined();
      expect(users.updated_at).toBeDefined();
    });
  });
});
