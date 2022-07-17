import { Injectable } from '@nestjs/common';
import { TracksService } from 'src/tracks/tracks.service';
import { FavouritesRepository } from './favourites.repository';

@Injectable()
export class FavouritesService {
  constructor(
    private readonly favsRepository: FavouritesRepository,
    private readonly trackService: TracksService,
  ) {}

  async findAll() {
    return await this.favsRepository.findAll();
  }

  async removeTrack(id: string) {
    const track = await this.trackService.findOne(id);

    await this.favsRepository.removeTrack(id);

    return track;
  }

  async addTrack(id: string) {
    const track = await this.trackService.findOne(id);

    await this.favsRepository.addTrack(id);

    return track;
  }
}
