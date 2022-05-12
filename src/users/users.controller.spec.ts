import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma.service';
import { faker } from '@faker-js/faker';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const prismaService = new PrismaService();
    service = new UsersService(prismaService);
    controller = new UsersController(service);
  });

  describe('controller should be defined', () => {
    it('return success', () => {
      expect(controller).toBeDefined();
    });
  });

  describe('createUsers', () => {
    let users: any = {};

    beforeEach(async () => {
      const createUserDto = {
        email: faker.internet.email(),
        is_admin: true,
      };
      users = await controller.createUser(createUserDto);

      const createUserDto2 = {
        email: faker.internet.email(),
        is_admin: false,
      };
      await controller.createUser(createUserDto2);
    });

    it('return success', async () => {
      console.log('users = ', users);
      expect(users).toBeDefined();
      expect(users.message).toBeDefined();
      expect(users.user).toBeDefined();
    });
  });

  describe('getUsers', () => {
    let users: any = {};

    beforeEach(async () => {
      users = await controller.getUsers('1', '20');
    });

    it('return success', async () => {
      console.log('users = ', users);
      expect(users).toBeDefined();
      expect(users.message).toBeDefined();
      expect(users.data).toBeDefined();
    });
  });

  describe('getUserById', () => {
    let users: any = {};

    beforeEach(async () => {
      const usersList = await controller.getUsers('1', '20');
      if (usersList) {
        const id = usersList.data[0].id;
        users = await controller.getUserById(id);
      }
    });

    it('return success', async () => {
      console.log('users = ', users);
      expect(users).toBeDefined();
      expect(users.message).toBeDefined();
      expect(users.user).toBeDefined();
    });
  });
});
