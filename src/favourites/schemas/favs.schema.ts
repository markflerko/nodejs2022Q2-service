import { Album } from 'src/albums/schemas/album.schema';
import Artist from 'src/artists/schemas/artist.schema';
import { ALBUM, ARTIST, TRACK } from 'src/favourites/types/collection.type';
import { Track } from 'src/tracks/schemas/tracks.schema';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favourites {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @JoinTable()
  @ManyToMany(() => Artist, {
    eager: true, //related entity always be include. Only one side of relationship could be eager
    cascade: true, //saving addresses while saving users
  })
  [ARTIST]: Artist[]; // favorite artists ids

  @JoinTable()
  @ManyToMany(() => Album, {
    eager: true, //related entity always be include. Only one side of relationship could be eager
    cascade: true, //saving addresses while saving users
  })
  [ALBUM]: Album[]; // favorite artists ids

  @JoinTable()
  @ManyToMany(() => Track, {
    eager: true, //related entity always be include. Only one side of relationship could be eager
    cascade: true, //saving addresses while saving users
  })
  [TRACK]: Track[]; // favorite artists ids
}
