import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { IdParams } from './dto/id-param.dto';
import { UpdateAlbumDto } from './dto/update-artist.dto';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumService: AlbumsService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async delete(@Param() params: IdParams) {
    return this.albumService.delete(params.id);
  }

  @Put('/:id')
  async update(@Param() params: IdParams, @Body() dto: UpdateAlbumDto) {
    return this.albumService.update(params.id, dto);
  }

  @Get('/:id')
  async findOne(@Param() params: IdParams) {
    return this.albumService.findOne(params.id);
  }

  @Get()
  async findAll() {
    return this.albumService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateAlbumDto) {
    return this.albumService.create(dto);
  }
}
