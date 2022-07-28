import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumsService } from 'src/albums/albums.service';
import { Album } from 'src/albums/schemas/album.schema';
import { ArtistsService } from 'src/artists/artists.service';
import Artist from 'src/artists/schemas/artist.schema';
import { Track } from 'src/tracks/schemas/tracks.schema';
import { TracksService } from 'src/tracks/tracks.service';
import { Repository } from 'typeorm';
import { Favourites } from './schemas/favs.schema';
import {
  ALBUM,
  ARTIST,
  CollectionType,
  getMappedService,
  TRACK,
} from './types/collection.type';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(Favourites)
    private favsRepository: Repository<Favourites>,
    @Inject(forwardRef(() => TracksService))
    private readonly trackService: TracksService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumService: AlbumsService,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistService: ArtistsService,
  ) {}

  async findAll() {
    const { albums, tracks, artists } = await this.findEntity();

    const result = {};

    result[ALBUM] = await Promise.all(
      albums.map(({ id }) => {
        return this.albumService.findOne(id);
      }),
    );

    result[TRACK] = await Promise.all(
      tracks.map(({ id }) => {
        return this.trackService.findOne(id);
      }),
    );

    result[ARTIST] = await Promise.all(
      artists.map(({ id }) => {
        return this.artistService.findOne(id);
      }),
    );

    return result;
  }

  async removeEntity(
    id: string,
    entityType: CollectionType,
    isService = false,
  ) {
    const serviceName = getMappedService(entityType);

    await this[serviceName].findOne(id);
    const fav = await this.findEntity();

    const index = fav[entityType].findIndex((item) => item.id === id);

    delete fav[entityType][index];

    if (fav) {
      return fav;
    }

    if (isService === true) {
      return fav;
    } else {
      throw new HttpException(
        `${entityType} not favourite`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  private async findEntity(): Promise<Favourites> {
    const favs = await this.favsRepository.findOne({
      where: {},
      relations: [ARTIST, TRACK, ALBUM],
    });
    if (favs) {
      return favs;
    }
    return { [ARTIST]: [], [TRACK]: [], [ALBUM]: [] };
  }

  async addEntity(id: string, entityType: CollectionType) {
    try {
      const serviceName = getMappedService(entityType);

      const entity: Album | Artist | Track = await this[serviceName].findOne(
        id,
      );
      const fav = await this.findEntity();

      fav[entityType].push(entity as Album & Artist & Track);
      await this.favsRepository.save(fav);

      if (fav === null) {
        throw new Error();
      }

      return fav;
    } catch (error) {
      throw new HttpException(
        `artist with id === ${id} doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
