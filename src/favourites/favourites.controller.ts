import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  SerializeOptions,
} from '@nestjs/common';
import { IdParams } from './dto/id-param.dto';
import { FavouritesService } from './favourites.service';
import { ALBUM, ARTIST, TRACK } from './types/collection.type';

@Controller('favs')
@SerializeOptions({
  strategy: 'exposeAll',
  excludePrefixes: ['id'],
})
export class FavouritesController {
  constructor(private readonly favsService: FavouritesService) {}

  @Get()
  async findAll() {
    return this.favsService.findAll();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  async removeArtist(@Param() params: IdParams) {
    return await this.favsService.removeEntity(params.id, ARTIST);
  }

  @Post('artist/:id')
  async addArtist(@Param() params: IdParams) {
    return await this.favsService.addEntity(params.id, ARTIST);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  async removeAlbum(@Param() params: IdParams) {
    return await this.favsService.removeEntity(params.id, ALBUM);
  }

  @Post('album/:id')
  async addAlbum(@Param() params: IdParams) {
    return await this.favsService.addEntity(params.id, ALBUM);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  async removeTrack(@Param() params: IdParams) {
    return await this.favsService.removeEntity(params.id, TRACK);
  }

  @Post('track/:id')
  async addTrack(@Param() params: IdParams) {
    return await this.favsService.addEntity(params.id, TRACK);
  }
}
