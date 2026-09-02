import { Module } from '@nestjs/common';
import { ImageService } from './image.service.js';
import { ImageController } from './image.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
