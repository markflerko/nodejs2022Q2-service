import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './schemas/artist.schema';

@Injectable()
export class ArtistsRepository {
  private readonly artists: Artist[];

  constructor() {
    this.artists = [
      //TODO: remove
      {
        id: 'acfdf874-7fee-4de3-899b-a6ab98a14214',
        name: 'morgenshtern',
        grammy: false,
      },
    ];
  }

  delete(id: string) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);

    let result: Artist | null;

    if (artistIndex > -1) {
      return this.artists.splice(artistIndex, 1);
    } else {
      result = null;
    }

    return new Promise((res) => res(result));
  }

  update(id: string, artist: UpdateArtistDto) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);

    let result: Artist | null;

    if (artistIndex > -1) {
      this.artists[artistIndex] = { ...this.artists[artistIndex], ...artist };
      result = this.artists[artistIndex];
    } else {
      result = null;
    }

    return new Promise((res) => res(result));
  }

  findOne(id: string) {
    const artist = this.artists.find((item) => item.id === id);

    let result: Artist | null;

    if (artist) {
      result = artist;
    } else {
      result = null;
    }

    return new Promise((res) => res(result));
  }

  findAll() {
    return new Promise((res) => res(this.artists));
  }

  create(dto: CreateArtistDto) {
    const id = uuidv4();

    const artist = {
      id,
      ...dto,
    };
    this.artists.push(artist);

    return new Promise((res) => res(artist));
  }
}
