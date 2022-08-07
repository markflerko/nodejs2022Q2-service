import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './schemas/tracks.schema';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,
  ) {}

  async delete(id: string) {
    const deleteResponse = await this.tracksRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, dto: UpdateTrackDto) {
    await this.tracksRepository.update(id, dto);

    const updatedTrack = await this.tracksRepository.findOne({
      where: { id },
    });

    if (updatedTrack) {
      return updatedTrack;
    }

    throw new HttpException('Track not updated', HttpStatus.NOT_FOUND);
  }

  async findOne(id: string) {
    const track = await this.tracksRepository.findOne({ where: { id } });
    if (track) {
      return track;
    }
    throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
  }

  async findAll() {
    const tracks = await this.tracksRepository.find();

    return tracks;
  }

  async create(dto: CreateTrackDto) {
    const track = await this.tracksRepository.create(dto);
    await this.tracksRepository.save(track);
    return track;
  }
}
