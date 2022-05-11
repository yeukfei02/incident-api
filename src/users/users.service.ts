import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const users = await this.prisma.users.create({
      data: {
        email: createUserDto.email,
        is_admin: createUserDto.is_admin,
      },
    });
    return users;
  }

  async getUsers(page: number, perPage: number): Promise<any> {
    const users = await this.prisma.users.findMany({
      skip: perPage * (page - 1),
      take: perPage,
      orderBy: {
        created_at: 'desc',
      },
      include: {
        incidents: true,
      },
    });
    return users;
  }

  async getUserById(id: string): Promise<any> {
    const users = await this.prisma.users.findUnique({
      where: {
        id: id,
      },
      include: {
        incidents: true,
      },
    });
    return users;
  }
}
