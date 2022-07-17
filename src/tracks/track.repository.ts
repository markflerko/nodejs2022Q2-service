import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './schemas/tracks.schema';

@Injectable()
export class TracksRepository {
  private readonly tracks: Track[];

  constructor() {
    this.tracks = [
      {
        id: '206049d0-f6a5-4ef1-aef3-069d9dff6aa5',
        name: 'morgenshtern',
        artistId: 'acfdf874-7fee-4de3-899b-a6ab98a14214',
        albumId: 'aeff88d3-33a6-4df3-9094-892290806f64',
        duration: 300000,
      },
    ];
  }

  delete(id: string) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);

    let result: Track | null;

    if (trackIndex > -1) {
      return this.tracks.splice(trackIndex, 1);
    } else {
      result = null;
    }

    return new Promise((res) => res(result));
  }

  update(id: string, track: UpdateTrackDto) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);

    let result: Track | null;

    if (trackIndex > -1) {
      this.tracks[trackIndex] = { ...this.tracks[trackIndex], ...track };
      result = this.tracks[trackIndex];
    } else {
      result = null;
    }

    return new Promise((res) => res(result));
  }

  findOne(id: string) {
    const track = this.tracks.find((item) => item.id === id);

    let result: Track | null;

    if (track) {
      result = track;
    } else {
      result = null;
    }

    return new Promise((res) => res(result));
  }

  findAll() {
    return new Promise((res) => res(this.tracks));
  }

  create(dto: CreateTrackDto) {
    const id = uuidv4();

    const track = {
      id,
      ...dto,
    };
    this.tracks.push(track);

    return new Promise((res) => res(track));
  }
}
