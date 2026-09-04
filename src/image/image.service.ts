import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto.js';
import { UpdateImageDto } from './dto/update-image.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity.js';
import { User } from '../user/entities/user.entity.js';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>
  ) {}

  async create(createImageDto: CreateImageDto) {
    return await this.imagesRepository.save(createImageDto);
  }

  async findImagesByUser(user_id: string, start: Date, end: Date) {
    return await this.imagesRepository
              .createQueryBuilder('images')
              .where('userUserId = :id', { id: user_id })
              .andWhere('timestamp BETWEEN :start AND :end', { start: start, end: end })
              .addOrderBy("timestamp", "DESC")
              .getMany();
  }
}
