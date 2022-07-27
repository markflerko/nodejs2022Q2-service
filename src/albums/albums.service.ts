import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FavouritesService } from 'src/favourites/favourites.service';
import { ALBUM } from 'src/favourites/types/collection.type';
import { TracksService } from 'src/tracks/tracks.service';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-artist.dto';
import { Album } from './schemas/album.schema';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
    @Inject(forwardRef(() => FavouritesService))
    private readonly favService: FavouritesService,
    @Inject(forwardRef(() => TracksService))
    private readonly trackService: TracksService,
  ) {}

  async delete(id: string) {
    await this.favService.removeEntity(id, ALBUM, true);

    await this.trackService.findAll().then((tracks) => {
      tracks.forEach((item) => {
        if (item.albumId === id) {
          item.albumId = null;
        }
      });
    });

    const deleteResponse = await this.albumsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, dto: UpdateAlbumDto) {
    await this.albumsRepository.update(id, dto);

    const updatedAlbum = await this.albumsRepository.findOne({
      where: { id },
    });

    if (updatedAlbum) {
      return updatedAlbum;
    }

    throw new HttpException('Album not updated', HttpStatus.NOT_FOUND);
  }

  async findOne(id: string) {
    const album = await this.albumsRepository.findOne({ where: { id } });
    if (album) {
      return album;
    }
    throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
  }

  async findAll() {
    const artists = await this.albumsRepository.find();
    return artists;
  }

  async create(dto: CreateAlbumDto) {
    const album = await this.albumsRepository.create(dto);
    await this.albumsRepository.save(album);
    return album;
  }
}
