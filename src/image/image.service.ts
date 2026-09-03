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

  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  findAll() {
    return `This action returns all image`;
  }

  findImagesByUser(user_id: string) {
    return this.imagesRepository
              .createQueryBuilder('images')
              .where('userUserId = :id', { id: user_id })
              .getMany();
  }

  findOne(image_id: string) {
    return `This action returns a #${image_id} image`;
  }

  update(image_id: string, updateImageDto: UpdateImageDto) {
    return `This action updates a #${image_id} image`;
  }

  remove(image_id: string) {
    return `This action removes a #${image_id} image`;
  }
}
