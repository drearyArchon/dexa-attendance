import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Request } from '@nestjs/common';
import { ImageService } from './image.service.js';
import { CreateImageDto } from './dto/create-image.dto.js';
import { UpdateImageDto } from './dto/update-image.dto.js';
import { UserAccess } from '../auth/auth.constants.js';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @UserAccess()
  @Post()
  create(@Body() createImageDto: CreateImageDto) {
    return this.imageService.create(createImageDto);
  }

  @Get()
  findAll(@Request() req: any) {
    console.log(req.user.user_id);
    return this.imageService.findAll();
  }

  @UserAccess()
  @Get(':image_id')
  findOne(@Param('image_id') image_id: string) {
    return this.imageService.findOne(image_id);
  }

  @UserAccess()
  @Put(':image_id')
  update(@Param('image_id') image_id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(image_id, updateImageDto);
  }

  @UserAccess()
  @Delete(':image_id')
  remove(@Param('image_id') image_id: string) {
    return this.imageService.remove(image_id);
  }
}
