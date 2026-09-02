import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':user_id')
  findOne(@Param('user_id') user_id: string) {
    return this.userService.findOne(user_id);
  }

  @Put(':user_id')
  update(@Param('user_id') user_id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user_id, updateUserDto);
  }

  @Delete(':user_id')
  remove(@Param('user_id') user_id: string) {
    return this.userService.remove(user_id);
  }
}
