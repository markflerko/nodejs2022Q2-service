import { Injectable } from '@nestjs/common';
import { Favourites } from './schemas/favs.schema';

@Injectable()
export class FavouritesRepository {
  private readonly favs: Favourites;

  constructor() {
    this.favs = {
      artists: ['acfdf874-7fee-4de3-899b-a6ab98a14214'],
      albums: ['aeff88d3-33a6-4df3-9094-892290806f64'],
      tracks: ['206049d0-f6a5-4ef1-aef3-069d9dff6aa5'],
    };
  }

  findAll() {
    return new Promise((res) => res(this.favs));
  }

  async removeTrack(id: string) {
    const trackIndex = this.favs.tracks.findIndex((trackId) => trackId === id);

    let result: string | null;

    if (trackIndex > -1) {
      return this.favs.tracks.splice(trackIndex, 1)[0];
    } else {
      result = null;
    }

    return new Promise((res) => res(result));
  }

  async addTrack(id: string) {
    this.favs.tracks.push(id);

    this.favs.tracks = Array.from(new Set(this.favs.tracks));

    return new Promise((res) => res(this.favs.tracks));
  }
}
