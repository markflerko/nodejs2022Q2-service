import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { IdParams } from './dto/id-param.dto';
import { FavouritesService } from './favourites.service';
import { ALBUM, ARTIST, TRACK } from './types/collection.type';

@Controller('favs')
export class FavouritesController {
  constructor(private readonly favsService: FavouritesService) {}

  @Post('track/:id')
  async addTrack(@Param() params: IdParams) {
    const result = await this.favsService.addEntity(params.id, TRACK);
    result.id = undefined;
    return result;
  }

  @Get()
  async findAll() {
    const result = await this.favsService.findAll();
    result.id = undefined;
    return result;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  async removeArtist(@Param() params: IdParams) {
    const result = await this.favsService.removeEntity(params.id, ARTIST);
    result.id = undefined;
    return result;
  }

  @Post('artist/:id')
  async addArtist(@Param() params: IdParams) {
    const result = await this.favsService.addEntity(params.id, ARTIST);
    result.id = undefined;
    return result;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  async removeAlbum(@Param() params: IdParams) {
    const result = await this.favsService.removeEntity(params.id, ALBUM);
    result.id = undefined;
    return result;
  }

  @Post('album/:id')
  async addAlbum(@Param() params: IdParams) {
    const result = await this.favsService.addEntity(params.id, ALBUM);
    result.id = undefined;
    return result;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  async removeTrack(@Param() params: IdParams) {
    const result = await this.favsService.removeEntity(params.id, TRACK);
    result.id = undefined;
    return result;
  }
}
