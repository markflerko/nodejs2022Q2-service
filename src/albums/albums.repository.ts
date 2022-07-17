import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-artist.dto';
import { Album } from './schemas/album.schema';

@Injectable()
export class AlbumsRepository {
  private readonly albums: Album[];

  constructor() {
    this.albums = [
      //TODO: remove
      {
        id: 'aeff88d3-33a6-4df3-9094-892290806f64',
        name: 'morgenshtern',
        artistId: 'acfdf874-7fee-4de3-899b-a6ab98a14214',
        year: 2017,
      },
    ];
  }

  delete(id: string) {
    const albumIndex = this.albums.findIndex((album) => album.id === id);

    let result: Album | null;

    if (albumIndex > -1) {
      return this.albums.splice(albumIndex, 1);
    } else {
      result = null;
    }

    return new Promise((res) => res(result));
  }

  update(id: string, album: UpdateAlbumDto) {
    const albumIndex = this.albums.findIndex((album) => album.id === id);

    let result: Album | null;

    if (albumIndex > -1) {
      this.albums[albumIndex] = { ...this.albums[albumIndex], ...album };
      result = this.albums[albumIndex];
    } else {
      result = null;
    }

    return new Promise((res) => res(result));
  }

  findOne(id: string) {
    const album = this.albums.find((item) => item.id === id);

    let result: Album | null;

    if (album) {
      result = album;
    } else {
      result = null;
    }

    return new Promise((res) => res(result));
  }

  findAll() {
    return new Promise((res) => res(this.albums));
  }

  create(dto: CreateAlbumDto) {
    const id = uuidv4();

    const album = {
      id,
      ...dto,
    };
    this.albums.push(album);

    return new Promise((res) => res(album));
  }
}
