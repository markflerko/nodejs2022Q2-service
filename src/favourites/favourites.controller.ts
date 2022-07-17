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

@Controller('favs')
export class FavouritesController {
  constructor(private readonly favsService: FavouritesService) {}

  @Get()
  async findAll() {
    return this.favsService.findAll();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('tracks/:id')
  async removeTrack(@Param() params: IdParams) {
    return await this.favsService.removeTrack(params.id);
  }

  @Post('tracks/:id')
  async addTrack(@Param() params: IdParams) {
    return await this.favsService.addTrack(params.id);
  }
}
