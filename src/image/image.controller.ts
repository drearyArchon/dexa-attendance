import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Request, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ImageService } from './image.service.js';
import { CreateImageDto } from './dto/create-image.dto.js';
import { UpdateImageDto } from './dto/update-image.dto.js';
import { UserAccess } from '../auth/auth.constants.js';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @UserAccess()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createImageDto: CreateImageDto) {
    return this.imageService.create(createImageDto);
  }

  @UserAccess()
  @HttpCode(HttpStatus.OK)
  @Get()
  findUserImages(@Request() req: any, @Query('start') start: Date, @Query('end') end: Date) {
    return this.imageService.findImagesByUser(req.user.user_id, start, end);
  }

  // @HttpCode(HttpStatus.OK)
  // @Get('/all')
  // findAll() {
  //   return this.imageService.findAll();
  // }

  // @UserAccess()
  // @HttpCode(HttpStatus.OK)
  // @Get(':image_id')
  // findOne(@Param('image_id') image_id: string) {
  //   return this.imageService.findOne(image_id);
  // }

  // @UserAccess()
  // @HttpCode(HttpStatus.OK)
  // @Put(':image_id')
  // update(@Param('image_id') image_id: string, @Body() updateImageDto: UpdateImageDto) {
  //   return this.imageService.update(image_id, updateImageDto);
  // }

  // @UserAccess()
  // @HttpCode(HttpStatus.OK)
  // @Delete(':image_id')
  // remove(@Param('image_id') image_id: string) {
  //   return this.imageService.remove(image_id);
  // }
}
