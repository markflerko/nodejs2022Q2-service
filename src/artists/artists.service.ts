import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ArtistsRepository } from './artists.repository';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private readonly artistsRepository: ArtistsRepository) {}

  async delete(id: string) {
    const artist = await this.artistsRepository.delete(id);
    if (artist) {
      return null;
    }
    throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
  }

  async update(id: string, dto: UpdateArtistDto) {
    const artist = await this.artistsRepository.update(id, dto);
    if (artist) {
      return artist;
    }
    throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
  }

  async findOne(id: string) {
    const artist = await this.artistsRepository.findOne(id);
    if (artist) {
      return artist;
    }
    throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
  }

  async findAll() {
    const artists = await this.artistsRepository.findAll();
    return artists;
  }

  async create(dto: CreateArtistDto) {
    const artist = await this.artistsRepository.create(dto);
    return artist;
  }
}
