import { Controller, Post, Get, Body, Query, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    const users = await this.usersService.createUser(createUserDto);

    const response = { message: 'createUser', users: users };
    return response;
  }

  @Get()
  async getUsers(
    @Query('page') page: string,
    @Query('per_page') perPage: string,
  ): Promise<any> {
    const pageInt = page ? parseInt(page, 10) : 1;
    const perPageInt = page ? parseInt(perPage, 10) : 20;

    const users = await this.usersService.getUsers(pageInt, perPageInt);

    const response = {
      message: 'getUsers',
      data: users,
      total: users.length,
      page: pageInt,
      limit: perPageInt,
    };
    return response;
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<any> {
    const user = await this.usersService.getUserById(id);

    const response = { message: 'getUserById', user: user };
    return response;
  }
}
