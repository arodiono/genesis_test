import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(createUserDto)
  }

  @Get(':id([0-9]+)')
  public async get(@Param('id') id: number): Promise<User> {
    return await this.usersService.getUserById(id)
  }

  @Put(':id([0-9]+)')
  public async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateUser(id, updateUserDto)
  }

  @Delete(':id([0-9]+)')
  public async remove(@Param('id') id: number) {
    await this.usersService.removeUser(id)
  }
}
