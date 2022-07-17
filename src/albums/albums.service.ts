import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { FavouritesService } from 'src/favourites/favourites.service';
import { ALBUM } from 'src/favourites/types/collection.type';
import { AlbumsRepository } from './albums.repository';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-artist.dto';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly albumsRepository: AlbumsRepository,
    @Inject(forwardRef(() => FavouritesService))
    private readonly favService: FavouritesService,
  ) {}

  async delete(id: string) {
    try {
      this.favService.removeEntity(id, ALBUM);
    } catch (error) {
      Logger.log(error);
    }

    const album = await this.albumsRepository.delete(id);
    if (album) {
      return null;
    }
    throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
  }

  async update(id: string, dto: UpdateAlbumDto) {
    const album = await this.albumsRepository.update(id, dto);
    if (album) {
      return album;
    }
    throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
  }

  async findOne(id: string) {
    const album = await this.albumsRepository.findOne(id);
    if (album) {
      return album;
    }
    throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
  }

  async findAll() {
    const artists = await this.albumsRepository.findAll();
    return artists;
  }

  async create(dto: CreateAlbumDto) {
    const album = await this.albumsRepository.create(dto);
    return album;
  }
}
