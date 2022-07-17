import { Injectable } from '@nestjs/common';
import { Favourites } from './schemas/favs.schema';
import { CollectionType } from './types/collection.type';

@Injectable()
export class FavouritesRepository {
  private readonly favs: Favourites;

  constructor() {
    this.favs = {
      artists: [],
      albums: [],
      tracks: [],
    };
  }

  findAll(): Promise<Favourites> {
    return new Promise((res) => res(this.favs));
  }

  async removeEntity(id: string, entityType: CollectionType) {
    const entityIndex = this.favs[entityType].findIndex(
      (entityId: string) => entityId === id,
    );

    let result: string | null;

    if (entityIndex > -1) {
      const removedItem = this.favs[entityType].splice(entityIndex, 1)[0];
      return removedItem;
    } else {
      result = null;
    }

    return new Promise((res) => res(result));
  }

  async addEntity(id: string, entityType: CollectionType) {
    this.favs[entityType].push(id);

    this.favs[entityType] = Array.from(new Set(this.favs[entityType]));

    return new Promise((res) => res(this.favs[entityType]));
  }
}
