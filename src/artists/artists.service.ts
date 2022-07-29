import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import Artist from './schemas/artist.schema';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(dto: CreateArtistDto) {
    const artist = await this.artistsRepository.create(dto);
    await this.artistsRepository.save(artist);
    return artist;
  }

  async findOne(id: string) {
    const artist = await this.artistsRepository.findOne({
      where: { id },
    });

    if (artist) {
      return artist;
    }
    throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
  }

  async findAll() {
    const artists = await this.artistsRepository.find();
    return artists;
  }

  async update(id: string, dto: UpdateArtistDto) {
    await this.artistsRepository.update(id, dto);

    const updatedArtist = await this.artistsRepository.findOne({
      where: { id },
    });

    if (updatedArtist) {
      return updatedArtist;
    }

    throw new HttpException('Artist not updated', HttpStatus.NOT_FOUND);
  }

  async delete(id: string) {
    const deleteResponse = await this.artistsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
  }
}
