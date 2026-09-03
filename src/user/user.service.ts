import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { User, UserRole } from './entities/user.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findByUserId(user_id: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ user_id });
  }

  async findByUserName(username: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ username });
  }

  async update(user_id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return await this.usersRepository.update({ user_id }, updateUserDto);
  }

  async remove(user_id: string): Promise<DeleteResult> {
    return await this.usersRepository.delete(user_id);
  }

  async checkAdminCredentials(username: string): Promise<boolean> {
    return await this.usersRepository.findOneBy({ username }).then((user) => user?.role === UserRole.ADMIN);
  }
}
