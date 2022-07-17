import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { FavouritesService } from 'src/favourites/favourites.service';
import { TRACK } from 'src/favourites/types/collection.type';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksRepository } from './track.repository';

@Injectable()
export class TracksService {
  constructor(
    private readonly tracksRepository: TracksRepository,
    @Inject(forwardRef(() => FavouritesService))
    private readonly favService: FavouritesService,
  ) {}

  async delete(id: string) {
    await this.favService.removeEntity(id, TRACK, true);

    const track = await this.tracksRepository.delete(id);
    if (track) {
      return null;
    }
    throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
  }

  async update(id: string, dto: UpdateTrackDto) {
    const track = await this.tracksRepository.update(id, dto);
    if (track) {
      return track;
    }
    throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
  }

  async findOne(id: string) {
    const track = await this.tracksRepository.findOne(id);
    if (track) {
      return track;
    }
    throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
  }

  async findAll() {
    const tracks = await this.tracksRepository.findAll();
    return tracks;
  }

  async create(dto: CreateTrackDto) {
    const track = await this.tracksRepository.create(dto);
    return track;
  }
}
