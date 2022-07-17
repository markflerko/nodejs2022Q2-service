import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { FavouritesRepository } from './favourites.repository';
import { CollectionType, getMappedService } from './types/collection.type';

@Injectable()
export class FavouritesService {
  constructor(
    private readonly favsRepository: FavouritesRepository,
    @Inject(forwardRef(() => TracksService))
    private readonly trackService: TracksService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumService: AlbumsService,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistService: ArtistsService,
  ) {}

  async findAll() {
    return await this.favsRepository.findAll();
  }

  async removeEntity(id: string, entityType: CollectionType) {
    const serviceName = getMappedService(entityType);

    await this[serviceName].findOne(id);

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
    try {
      const serviceName = getMappedService(entityType);

      await this[serviceName].findOne(id);

      const entity = await this.favsRepository.addEntity(id, entityType);

      if (entity === null) {
        throw new Error();
      }

      return entity;
    } catch (error) {
      throw new HttpException(
        `artist with id === ${id} doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
