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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { IdParams } from './dto/id-param.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  async delete(@Param() params: IdParams) {
    return this.artistsService.delete(params.id);
  }

  @Put('/:id')
  async update(@Param() params: IdParams, @Body() dto: UpdateArtistDto) {
    return this.artistsService.update(params.id, dto);
  }

  @Get('/:id')
  async findOne(@Param() params: IdParams) {
    return this.artistsService.findOne(params.id);
  }

  @Get()
  async findAll() {
    return this.artistsService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateArtistDto) {
    return this.artistsService.create(dto);
  }
}
