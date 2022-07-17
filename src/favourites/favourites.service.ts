import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { FavouritesRepository } from './favourites.repository';
import { CollectionType } from './types/collection.type';

@Injectable()
export class FavouritesService {
  constructor(
    private readonly favsRepository: FavouritesRepository,
    private readonly trackService: TracksService,
    private readonly albumService: AlbumsService,
    private readonly artistService: ArtistsService,
  ) {}

  async findAll() {
    return await this.favsRepository.findAll();
  }

  async removeEntity(id: string, entityType: CollectionType) {
    const entity = await this.favsRepository.removeEntity(id, entityType);

    if (entity) {
      return entity;
    }

    throw new HttpException(
      `${entityType} not favourite`,
      HttpStatus.NOT_FOUND,
    );
  }

  async addEntity(id: string, entityType: CollectionType) {
    const entity = await this.favsRepository.addEntity(id, entityType);

    if (entity) {
      return entity;
    }

    throw new HttpException(
      `${entityType} not favourite`,
      HttpStatus.NOT_FOUND,
    );
  }
}
