import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-artist.dto';
import { Album } from './schemas/album.schema';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  async delete(id: string) {
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
